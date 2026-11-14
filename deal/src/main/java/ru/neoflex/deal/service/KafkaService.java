package ru.neoflex.deal.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import ru.neoflex.deal.dto.EmailMessage;
import ru.neoflex.deal.exception.KafkaSendException;

import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class KafkaService {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Value("${kafka.topic.send-documents}")
    private String sendDocumentsTopic;

    public void sendEmailMessage(EmailMessage message) {
        log.info("Отправка сообщения в topic '{}': {}", sendDocumentsTopic, message);
        try {
            kafkaTemplate.send(sendDocumentsTopic, message).get();
        } catch (Exception e) {
            Thread.currentThread().interrupt();
            throw new KafkaSendException(
                    "Ошибка передачи сообщения Kafka", e,
                    Map.of("statementId", message.getStatementId(), "topic", sendDocumentsTopic)
            );
        } finally {
            log.info("Сообщение отправлено для statementId={}", message.getStatementId());
        }
    }
}
