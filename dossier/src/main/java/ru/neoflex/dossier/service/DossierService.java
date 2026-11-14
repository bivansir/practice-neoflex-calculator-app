package ru.neoflex.dossier.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import ru.neoflex.dossier.dto.EmailMessage;
import ru.neoflex.dossier.enums.Theme;


@Slf4j
@Service
@RequiredArgsConstructor
public class DossierService {
    private final JavaMailSender mailSender;

    public void sendEmail(EmailMessage message) {

        SimpleMailMessage mail = buildEmail(message);
        log.debug("Сообщение создано: {}", mail);
        mailSender.send(mail);
    }

    private SimpleMailMessage buildEmail(EmailMessage message) {
        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setTo(message.getAddress());
        mail.setSubject(buildSubject(message.getTheme()));
        mail.setText(buildBody(message));

        return mail;
    }

    private String buildSubject(Theme theme) {
        return switch (theme) {
            case SEND_DOCUMENTS -> "Документы по кредитному договору";
        };
    }

    private String buildBody(EmailMessage message) {
        String defaultText = String.format("Здравствуйте!%n%n");

        return defaultText + switch (message.getTheme()) {
            case SEND_DOCUMENTS ->
                    String.format("По вашей заявке №%s сформированы документы по кредитному договору.%n" +
                                    "Для продолжения оформления перейдите по ссылке: %s%n%n" +
                                    "С уважением,%nКоманда банка",
                            message.getStatementId(),
                            "http://localhost:5173/loan/" + message.getStatementId() + "/documents");
        };
    }
}
