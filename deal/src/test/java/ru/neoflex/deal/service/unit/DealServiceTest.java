package ru.neoflex.deal.service.unit;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import ru.neoflex.deal.dto.CreditDto;
import ru.neoflex.deal.dto.LoanOfferDto;
import ru.neoflex.deal.dto.LoanStatementRequestDto;
import ru.neoflex.deal.dto.ScoringDataDto;
import ru.neoflex.deal.entity.Client;
import ru.neoflex.deal.entity.Credit;
import ru.neoflex.deal.entity.Passport;
import ru.neoflex.deal.entity.Statement;
import ru.neoflex.deal.service.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
public class DealServiceTest {

    @Mock
    private ClientService clientService;

    @Mock
    private StatementService statementService;

    @Mock
    private CalculatorService calculatorService;

    @Mock
    private CreditService creditService;

    @InjectMocks
    private DealService dealService;

    @Test
    void shouldReturnOffers() {
        // given
        LoanStatementRequestDto request = LoanStatementRequestDto.builder().build();
        List<LoanOfferDto> offers = new ArrayList<>(List.of(
                LoanOfferDto.builder()
                        .requestedAmount(BigDecimal.valueOf(5000))
                        .totalAmount(BigDecimal.valueOf(10000))
                        .rate(BigDecimal.valueOf(10.0)).build(),
                LoanOfferDto.builder()
                        .requestedAmount(BigDecimal.valueOf(2000))
                        .totalAmount(BigDecimal.valueOf(12000))
                        .rate(BigDecimal.valueOf(8.0)).build(),
                LoanOfferDto.builder()
                        .requestedAmount(BigDecimal.valueOf(3000))
                        .totalAmount(BigDecimal.valueOf(11000))
                        .rate(BigDecimal.valueOf(9.0)).build()
        ));

        when(clientService.createClient(any())).thenReturn(Client.builder().build());
        when(statementService.createStatement(any())).thenReturn(Statement.builder().build());
        when(calculatorService.offers(any())).thenReturn(offers);

        // when
        List<LoanOfferDto> result = dealService.deal(request);

        // then
        assertEquals(BigDecimal.valueOf(8.0), result.get(0).getRate());
        assertEquals(BigDecimal.valueOf(9.0), result.get(1).getRate());
        assertEquals(BigDecimal.valueOf(10.0), result.get(2).getRate());
    }

    @Test
    void shouldFormScoringDataDTO() {
        // given
        LoanOfferDto request = LoanOfferDto.builder()
                .totalAmount(BigDecimal.valueOf(500000))
                .term(24)
                .isInsuranceEnabled(true)
                .isSalaryClient(true)
                .build();

        Client client = Client.builder()
                .firstName("Илья")
                .lastName("Илья")
                .birthDate(LocalDate.now())
                .passportId(Passport.builder()
                        .series("1234")
                        .number("567890")
                        .build())
                .build();

        Statement statement = Statement.builder()
                .client(client)
                .build();

        when(statementService.approveStatement(request)).thenReturn(statement);
        when(creditService.createCredit(any())).thenReturn(Credit.builder().build());
        when(calculatorService.calc(any())).thenReturn(CreditDto.builder().build());
        when(statementService.ccApproveStatement(any(), any())).thenReturn(any());

        // when
        HttpStatus httpStatus = dealService.select(request);

        // then
        assertEquals(HttpStatus.OK, httpStatus);

        ArgumentCaptor<ScoringDataDto> captor = ArgumentCaptor.forClass(ScoringDataDto.class);
        verify(calculatorService).calc(captor.capture());

        ScoringDataDto created = captor.getValue();
        assertEquals(request.getTotalAmount(), created.getAmount());
        assertEquals(request.getTerm(), created.getTerm());
        assertEquals(client.getFirstName(), created.getFirstName());
        assertEquals(client.getLastName(), created.getLastName());
        assertNull(created.getMiddleName());
        assertEquals(client.getBirthDate(), created.getBirthdate());
        assertEquals(client.getPassportId().getNumber(), created.getPassportNumber());
        assertEquals(client.getPassportId().getSeries(), created.getPassportSeries());
        assertEquals(request.getIsInsuranceEnabled(), created.getIsInsuranceEnabled());
        assertEquals(request.getIsSalaryClient(), created.getIsSalaryClient());
    }
}
