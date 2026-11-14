package ru.neoflex.deal.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import ru.neoflex.deal.dto.PaymentScheduleElementDto;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "credit")
public class Credit {
    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "credit_id")
    private UUID creditId;

    @Getter
    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @Getter
    @Column(name = "term", nullable = false)
    private Integer term;

    @Getter
    @Column(name = "monthly_payment", nullable = false)
    private BigDecimal monthlyPayment;

    @Getter
    @Column(name = "rate", nullable = false)
    private BigDecimal rate;

    @Getter
    @Column(name = "psk", nullable = false)
    private BigDecimal psk;

    @Getter
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "payment_schedule", nullable = false, columnDefinition = "jsonb")
    private List<PaymentScheduleElementDto> paymentSchedule;

    @Getter
    @Column(name = "insurance_enabled", nullable = false)
    private Boolean isInsuranceEnabled;

    @Getter
    @Column(name = "salary_client")
    private Boolean isSalaryClient;

    @OneToOne(mappedBy = "credit", cascade = CascadeType.ALL)
    private Statement statement;
}
