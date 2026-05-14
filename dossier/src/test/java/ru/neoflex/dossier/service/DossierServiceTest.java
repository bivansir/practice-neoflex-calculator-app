package ru.neoflex.dossier.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import ru.neoflex.dossier.dto.EmailMessage;
import ru.neoflex.dossier.enums.Theme;

import java.util.UUID;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class DossierServiceTest {
    @Mock
    private JavaMailSender mailSender;

    @InjectMocks
    private DossierService dossierService;

    @Test
    void sendEmail_shouldFormCorrect() {
        // given
        UUID id = UUID.randomUUID();
        EmailMessage message = EmailMessage.builder()
                .address("test@test.com")
                .theme(Theme.SEND_DOCUMENTS)
                .statementId(id)
                .text("test")
                .build();

        // when
        dossierService.sendEmail(message);

        // then
        SimpleMailMessage sent = captureSentMessage();
        assertEquals(message.getAddress(), sent.getTo()[0]);
        assertEquals("Документы по кредитному договору", sent.getSubject());
        assertThat(sent.getText())
                .isNotNull()
                .contains(id.toString());
    }

    @Test
    void MailSenderException() {
        // given
        EmailMessage message = EmailMessage.builder()
                .address("test@test.com")
                .theme(Theme.SEND_DOCUMENTS)
                .statementId(UUID.randomUUID())
                .text("test")
                .build();

        doThrow(new RuntimeException("Error"))
                .when(mailSender).send(any(SimpleMailMessage.class));

        // when
        assertThatThrownBy(() -> dossierService.sendEmail(message))
                // then
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Error");
    }

    private SimpleMailMessage captureSentMessage() {
        ArgumentCaptor<SimpleMailMessage> captor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(mailSender).send(captor.capture());
        return captor.getValue();
    }
}
