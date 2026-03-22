package ru.neoflex.deal.service;

import org.springframework.stereotype.Service;
import ru.neoflex.deal.dto.LoanOfferDto;
import ru.neoflex.deal.dto.StatementStatusHistoryDto;
import ru.neoflex.deal.entity.Client;
import ru.neoflex.deal.entity.Credit;
import ru.neoflex.deal.entity.Statement;
import ru.neoflex.deal.entity.enums.ApplicationStatus;
import ru.neoflex.deal.entity.enums.ChangeType;
import ru.neoflex.deal.repository.StatementRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class StatementService {

    private final StatementRepository statementRepository;

    public StatementService(StatementRepository statementRepository) {
        this.statementRepository = statementRepository;
    }

    public Statement createStatement(Client client) {
        ApplicationStatus applicationStatus = ApplicationStatus.PREAPPROVAL;
        ChangeType changeType = ChangeType.AUTOMATIC;

        Statement statement = Statement.builder()
                .client(client)
                .applicationStatus(applicationStatus)
                .creationDate(LocalDateTime.now())
                .sesCode("PLACEHOLDER")
                .statusHistory(List.of(StatementStatusHistoryDto.builder()
                        .status(applicationStatus)
                        .time(LocalDateTime.now())
                        .changeType(changeType)
                        .build()))
                .build();

        return statementRepository.save(statement);
    }

    public Statement approveStatement(LoanOfferDto loanOfferDto) {
        Statement statement = statementRepository.getReferenceById(loanOfferDto.getStatementId());

        updateStatementStatus(statement, ApplicationStatus.APPROVED, ChangeType.MANUAL);
        statement.setAppliedOffer(loanOfferDto);

        return statementRepository.save(statement);
    }

    public Statement ccApproveStatement(UUID id, Credit credit) {
        Statement statement = statementRepository.getReferenceById(id);

        updateStatementStatus(statement, ApplicationStatus.CC_APPROVED, ChangeType.AUTOMATIC);
        statement.setCredit(credit);

        return statementRepository.save(statement);
    }

    private void updateStatementStatus(Statement statement, ApplicationStatus applicationStatus, ChangeType changeType) {
        statement.setApplicationStatus(applicationStatus);

        List<StatementStatusHistoryDto> updatedHistory = new ArrayList<>(statement.getStatusHistory());
        updatedHistory.add(StatementStatusHistoryDto.builder()
                .status(applicationStatus)
                .time(LocalDateTime.now())
                .changeType(changeType)
                .build());
        statement.setStatusHistory(updatedHistory);
    }
}
