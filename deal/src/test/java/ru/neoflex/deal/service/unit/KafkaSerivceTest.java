package ru.neoflex.deal.service.unit;

import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.apache.kafka.common.TopicPartition;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.test.util.ReflectionTestUtils;
import ru.neoflex.deal.dto.EmailMessage;
import ru.neoflex.deal.enums.Theme;
import ru.neoflex.deal.exception.KafkaSendException;
import ru.neoflex.deal.service.KafkaService;

import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class KafkaServiceTest {

    @Mock
    private KafkaTemplate<String, Object> kafkaTemplate;

    @InjectMocks
    private KafkaService kafkaService;

    private EmailMessage message;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(kafkaService, "sendDocumentsTopic", "send-documents");
        message = EmailMessage.builder()
                .address("test@test.com")
                .theme(Theme.SEND_DOCUMENTS)
                .statementId(UUID.randomUUID())
                .text("test")
                .build();
    }

    private SendResult<String, Object> mockSendResult() {
        return new SendResult<>(
                new ProducerRecord<>("send-documents", null, message),
                new RecordMetadata(new TopicPartition("send-documents", 0), 0, 0, 0, 0, 0)
        );
    }

    @Test
    void sendEmailMessage_shouldSendToCorrectTopic() {
        //given
        SendResult<String, Object> result = mockSendResult();
        when(kafkaTemplate.send(eq("send-documents"), any(EmailMessage.class)))
                .thenReturn(CompletableFuture.completedFuture(result));

        // when
        kafkaService.sendEmailMessage(message);

        // then
        ArgumentCaptor<EmailMessage> captor = ArgumentCaptor.forClass(EmailMessage.class);
        verify(kafkaTemplate).send(eq("send-documents"), captor.capture());
        assertThat(captor.getValue()).isEqualTo(message);
    }

    @Test
    void sendEmailMessage_shouldThrowKafkaSendException_onExecutionFailure() {
        // given
        CompletableFuture<SendResult<String, Object>> failed = new CompletableFuture<>();
        failed.completeExceptionally(new ExecutionException(new RuntimeException("broker down")));
        when(kafkaTemplate.send(eq("send-documents"), any(EmailMessage.class))).thenReturn(failed);

        // when
        assertThatThrownBy(() -> kafkaService.sendEmailMessage(message))
                // then
                .isInstanceOf(KafkaSendException.class)
                .hasMessageContaining("Ошибка передачи сообщения Kafka");
    }
}
