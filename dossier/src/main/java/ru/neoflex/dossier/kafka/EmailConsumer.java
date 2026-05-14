package ru.neoflex.dossier.kafka;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import ru.neoflex.dossier.dto.EmailMessage;
import ru.neoflex.dossier.service.DossierService;

@Slf4j
@Component
@RequiredArgsConstructor
public class EmailConsumer {
    private final DossierService dossierService;

    @KafkaListener(
            topics = "${kafka.topic.send-documents}",
            groupId = "${spring.kafka.consumer.group-id}"
    )
    public void consumeSendDocuments(EmailMessage emailMessage) {
        log.info("Получено сообщение, topic:'send-documents': {}", emailMessage);
        try {
            dossierService.sendEmail(emailMessage);
        } catch (Exception e) {
            log.error("Ошибка для statementId={}: {}", emailMessage.getStatementId(), e.getMessage(), e);
            throw e;
        } finally {
            log.info("Сообщение для statementID={} обработано.", emailMessage.getStatementId());
        }
    }
}
