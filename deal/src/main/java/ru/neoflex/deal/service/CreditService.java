package ru.neoflex.deal.service;

import org.springframework.stereotype.Service;
import ru.neoflex.deal.dto.CreditDto;
import ru.neoflex.deal.entity.Credit;
import ru.neoflex.deal.repository.CreditRepository;

@Service
public class CreditService {
    private final CreditRepository creditRepository;

    public CreditService(CreditRepository creditRepository) {
        this.creditRepository = creditRepository;
    }

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
        return creditRepository.save(credit);
    }
}
