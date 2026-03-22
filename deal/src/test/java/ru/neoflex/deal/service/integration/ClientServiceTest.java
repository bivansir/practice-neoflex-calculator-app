package ru.neoflex.deal.service.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ru.neoflex.deal.dto.LoanStatementRequestDto;
import ru.neoflex.deal.entity.Client;
import ru.neoflex.deal.repository.ClientRepository;
import ru.neoflex.deal.service.ClientService;
import ru.neoflex.deal.util.IntegrationTestBase;
import java.math.BigDecimal;
import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;


public class ClientServiceTest extends IntegrationTestBase {

    @Autowired
    private ClientService clientService;

    @Autowired
    private ClientRepository clientRepository;

    @Test
    void shouldSaveClientToDatabase() {
        // given
        LoanStatementRequestDto request = LoanStatementRequestDto.builder()
                .amount(BigDecimal.valueOf(124))
                .term(12)
                .firstName("Илья")
                .lastName("Илья")
                .email("Илья@gmail.com")
                .birthdate(LocalDate.now())
                .passportSeries("1234")
                .passportNumber("123123")
                .build();

        // when
        Client saved = clientService.createClient(request);

        // then
        Client client = clientRepository.getReferenceById(saved.getClientId());
        assertEquals(request.getFirstName(), client.getFirstName());
        assertEquals(request.getLastName(), client.getLastName());
        assertNull(client.getMiddleName());
        assertEquals(request.getEmail(), client.getEmail());
        assertEquals(request.getBirthdate(), client.getBirthDate());
        assertEquals(request.getPassportSeries(), client.getPassportId().getSeries());
        assertEquals(request.getPassportNumber(), client.getPassportId().getNumber());
    }
}
