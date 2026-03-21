package ru.neoflex.deal.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ru.neoflex.deal.dto.CreditDto;
import ru.neoflex.deal.dto.LoanOfferDto;
import ru.neoflex.deal.dto.LoanStatementRequestDto;
import ru.neoflex.deal.dto.ScoringDataDto;
import ru.neoflex.deal.entity.Client;
import ru.neoflex.deal.entity.Credit;
import ru.neoflex.deal.entity.Passport;
import ru.neoflex.deal.entity.Statement;
import ru.neoflex.deal.entity.enums.ApplicationStatus;
import ru.neoflex.deal.repository.ClientRepository;
import ru.neoflex.deal.repository.StatementRepository;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DealService {

    private final ClientService clientService;
    private final StatementService statementService;
    private final CreditService creditService;
    private final CalculatorService calculatorService;

    public List<LoanOfferDto> deal(LoanStatementRequestDto request) {
        Client client = clientService.createClient(request);
        Statement statement = statementService.createStatement(client);

        List<LoanOfferDto> response = calculatorService.offers(request);
        response.forEach(offer -> offer.setStatementId(statement.getStatementId()));

        response.sort(Comparator
                .comparing(LoanOfferDto::getRate) // по ставке (меньше = лучше)
                .thenComparing(
                        offer -> offer.getTotalAmount().subtract(offer.getRequestedAmount()),
                        Comparator.reverseOrder() // по разнице (больше = хуже)
                )
        );

        return response;
    }

    public HttpStatus select(LoanOfferDto request, UUID offerId) {
        UUID statementId = request.getStatementId();

        Statement statement = statementService.approveStatement(request.getStatementId(), request);
        Client client = statement.getClient();

        ScoringDataDto scoringDataDto = ScoringDataDto.builder()
                .amount(request.getTotalAmount())
                .term(request.getTerm())
                .firstName(client.getFirstName())
                .lastName(client.getLastName())
                .middleName(client.getMiddleName())
                .birthdate(client.getBirthDate())
                .passportSeries(client.getPassportId().getSeries())
                .passportNumber(client.getPassportId().getNumber())
                .isInsuranceEnabled(request.getIsInsuranceEnabled())
                .isSalaryClient(request.getIsSalaryClient())
                .build();

        CreditDto response = calculatorService.calc(scoringDataDto);

        Credit credit = creditService.createCredit(response);
        statementService.ccApproveStatement(statementId, credit);

        return HttpStatus.OK;
    }
}
