package ru.neoflex.deal.service;

import org.springframework.stereotype.Service;
import ru.neoflex.deal.dto.LoanStatementRequestDto;
import ru.neoflex.deal.entity.Client;
import ru.neoflex.deal.entity.Passport;
import ru.neoflex.deal.repository.ClientRepository;

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

        return clientRepository.save(client);
    }
}
