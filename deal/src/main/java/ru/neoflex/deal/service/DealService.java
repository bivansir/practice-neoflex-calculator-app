package ru.neoflex.deal.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.neoflex.deal.dto.CreditDto;
import ru.neoflex.deal.dto.LoanOfferDto;
import ru.neoflex.deal.dto.LoanStatementRequestDto;
import ru.neoflex.deal.dto.ScoringDataDto;
import ru.neoflex.deal.entity.Client;
import ru.neoflex.deal.entity.Credit;
import ru.neoflex.deal.entity.Statement;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DealService {

    private final ClientService clientService;
    private final StatementService statementService;
    private final CreditService creditService;
    private final CalculatorService calculatorService;

    @Transactional(rollbackFor = Exception.class)
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

    @Transactional(rollbackFor = Exception.class)
    public HttpStatus select(LoanOfferDto request) {
        Statement statement = statementService.approveStatement(request);
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
        statementService.ccApproveStatement(request.getStatementId(), credit);

        return HttpStatus.OK;
    }
}
