package ru.neoflex.deal.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.neoflex.deal.dto.LoanStatementRequestDto;
import ru.neoflex.deal.entity.Client;
import ru.neoflex.deal.entity.Passport;
import ru.neoflex.deal.repository.ClientRepository;

@Slf4j
@Service
public class ClientService {
    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Client createClient(LoanStatementRequestDto request) {
        Client client = Client.builder()
                .lastName(request.getLastName())
                .firstName(request.getLastName())
                .middleName(request.getMiddleName())
                .birthDate(request.getBirthdate())
                .email(request.getEmail())
                .passportId(Passport.builder()
                        .series(request.getPassportSeries())
                        .number(request.getPassportNumber())
                        .build())
                .build();

        Client saved = clientRepository.save(client);
        log.debug("Credit создан в БД: {}",
                saved);
        return saved;
    }
}
