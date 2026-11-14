package ru.neoflex.deal.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.neoflex.deal.dto.CreditDto;
import ru.neoflex.deal.entity.Credit;
import ru.neoflex.deal.repository.CreditRepository;

@Slf4j
@RequiredArgsConstructor
@Service
public class CreditService {
    private final CreditRepository creditRepository;

    public Credit createCredit(CreditDto request) {
        Credit credit = Credit.builder()
                .amount(request.getAmount())
                .term(request.getTerm())
                .monthlyPayment(request.getMonthlyPayment())
                .rate(request.getRate())
                .psk(request.getPsk())
                .paymentSchedule(request.getPaymentSchedule())
                .isInsuranceEnabled(request.getIsInsuranceEnabled())
                .isSalaryClient(request.getIsSalaryClient())
                .build();
        Credit saved = creditRepository.save(credit);
        log.debug("Credit создан в БД: {}",
                saved);
        return saved;
    }
}
