package ru.neoflex.calcservice.service;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
@ConfigurationProperties(prefix = "calculator")
@Data
public class CalcProperties {
    private BigDecimal insuranceCostMultiplier;
    private BigDecimal commissionRate;
    private BigDecimal minRate;
    private BigDecimal baseRate;
    private BigDecimal salaryClientDiscount;
    private BigDecimal insurancePercentDiscount;
    private BigDecimal insurancePacketCost;
    private BigDecimal smallCreditLimit;
}
