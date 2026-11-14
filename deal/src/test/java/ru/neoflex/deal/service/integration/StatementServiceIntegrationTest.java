package ru.neoflex.deal.service.integration;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.DirtiesContext;
import ru.neoflex.deal.dto.LoanOfferDto;
import ru.neoflex.deal.dto.PaymentScheduleElementDto;
import ru.neoflex.deal.dto.StatementStatusHistoryDto;
import ru.neoflex.deal.entity.Client;
import ru.neoflex.deal.entity.Credit;
import ru.neoflex.deal.entity.Passport;
import ru.neoflex.deal.entity.Statement;
import ru.neoflex.deal.entity.enums.ApplicationStatus;
import ru.neoflex.deal.entity.enums.ChangeType;
import ru.neoflex.deal.repository.ClientRepository;
import ru.neoflex.deal.repository.StatementRepository;
import ru.neoflex.deal.service.StatementService;
import ru.neoflex.deal.util.IntegrationTestBase;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@DirtiesContext(
        classMode = DirtiesContext.ClassMode.AFTER_CLASS
)
public class StatementServiceIntegrationTest extends IntegrationTestBase {

    @Autowired
    private StatementService statementService;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private StatementRepository statementRepository;

    @BeforeEach
    void cleanDatabase() {
        statementRepository.deleteAll();
        clientRepository.deleteAll();
    }

    private Client createClient() {
        Client client = Client.builder()
                .lastName("Илья").firstName("Илья")
                .middleName("Илья")
                .birthDate(LocalDate.now())
                .email("Илья@gmail.com")
                .passportId(Passport.builder()
                        .series("1231")
                        .number("123123").build())
                .build();
        clientRepository.save(client);
        return client;
    }

    @Test
    void shouldSaveStatementToDatabase() {
        // given
        Client client = createClient();

        // when
        Statement saved = statementService.createStatement(client);

        // then
        Statement statement = statementRepository.getReferenceById(saved.getStatementId());
        assertEquals(client, statement.getClient());
        assertEquals(ApplicationStatus.PREAPPROVAL, statement.getApplicationStatus());
        assertNotNull(statement.getCreationDate());
        assertNotNull(statement.getSesCode());
        assertNotNull(statement.getStatusHistory());

        StatementStatusHistoryDto statementStatusHistoryInitialChange = statement.getStatusHistory().get(0);
        assertEquals(ApplicationStatus.PREAPPROVAL,statementStatusHistoryInitialChange.getStatus());
        assertNotNull(statementStatusHistoryInitialChange.getTime());
        assertEquals(ChangeType.AUTOMATIC,statementStatusHistoryInitialChange.getChangeType());
    }

    @Test
    void shouldApproveStatement() {
        // given
        LoanOfferDto request = LoanOfferDto.builder()
                .statementId(
                        statementService.createStatement(createClient()).getStatementId()
                )
                .requestedAmount(BigDecimal.valueOf(213))
                .totalAmount(BigDecimal.valueOf(123))
                .term(12)
                .monthlyPayment(BigDecimal.valueOf(1444))
                .rate(BigDecimal.valueOf(12))
                .isInsuranceEnabled(true)
                .isSalaryClient(true)
                .build();

        // when
        Statement saved = statementService.approveStatement(request);

        // then
        Statement statement = statementRepository.getReferenceById(saved.getStatementId());
        assertEquals(ApplicationStatus.APPROVED, statement.getApplicationStatus());
        assertEquals(request, statement.getAppliedOffer());

        List<StatementStatusHistoryDto> statementStatusHistoryDto = statement.getStatusHistory();
        assertEquals(2, statementStatusHistoryDto.size());

        StatementStatusHistoryDto statementStatusHistoryNewChange = statementStatusHistoryDto.get(1);
        assertEquals(ApplicationStatus.APPROVED, statementStatusHistoryNewChange.getStatus());
        assertEquals(ChangeType.MANUAL, statementStatusHistoryNewChange.getChangeType());
        assertNotNull(statementStatusHistoryNewChange.getTime());
    }

    @Test
    void shouldCCApproveStatement() {
        // given
        Credit credit = Credit.builder()
                .amount(BigDecimal.valueOf(124))
                .term(12)
                .monthlyPayment(BigDecimal.valueOf(214))
                .rate(BigDecimal.valueOf(12))
                .psk(BigDecimal.valueOf(21241))
                .paymentSchedule(List.of(PaymentScheduleElementDto.builder().build()))
                .isInsuranceEnabled(true)
                .isSalaryClient(true)
                .build();

        Statement statement = statementRepository.save(Statement.builder()
                            .client(createClient())
                            .applicationStatus(ApplicationStatus.APPROVED)
                            .creationDate(LocalDateTime.now())
                            .sesCode("PLACEHOLDER")
                            .statusHistory(List.of(StatementStatusHistoryDto.builder().build()))
                            .build());

        // when
        Statement saved = statementService.ccApproveStatement(statement.getStatementId(), credit);

        //then
        assertEquals(ApplicationStatus.CC_APPROVED, saved.getApplicationStatus());
        assertEquals(credit, saved.getCredit());

        List<StatementStatusHistoryDto> statementStatusHistoryDto = statement.getStatusHistory();
        assertEquals(2, statementStatusHistoryDto.size());

        StatementStatusHistoryDto statementStatusHistoryNewChange = statementStatusHistoryDto.get(1);
        assertEquals(ApplicationStatus.CC_APPROVED, statementStatusHistoryNewChange.getStatus());
        assertEquals(ChangeType.AUTOMATIC, statementStatusHistoryNewChange.getChangeType());
        assertNotNull(statementStatusHistoryNewChange.getTime());
    }

    @Test
    void shouldDocumentsCreated() {
        // given
        Statement statement = statementRepository.save(Statement.builder()
                .client(createClient())
                .applicationStatus(ApplicationStatus.CC_APPROVED)
                .creationDate(LocalDateTime.now())
                .sesCode("PLACEHOLDER")
                .statusHistory(List.of(StatementStatusHistoryDto.builder().build()))
                .build());

        // when
        Statement saved = statementService.documentsCreatedStatement(statement.getStatementId());

        // then
        assertEquals(ApplicationStatus.DOCUMENTS_CREATED, saved.getApplicationStatus());

        List<StatementStatusHistoryDto> statementStatusHistoryDto = statement.getStatusHistory();
        assertEquals(2, statementStatusHistoryDto.size());

        StatementStatusHistoryDto statementStatusHistoryNewChange = statementStatusHistoryDto.get(1);
        assertEquals(ApplicationStatus.DOCUMENTS_CREATED, statementStatusHistoryNewChange.getStatus());
        assertEquals(ChangeType.MANUAL, statementStatusHistoryNewChange.getChangeType());
        assertNotNull(statementStatusHistoryNewChange.getTime());
    }
}
