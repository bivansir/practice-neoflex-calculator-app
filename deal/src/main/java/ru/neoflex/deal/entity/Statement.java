package ru.neoflex.deal.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import ru.neoflex.deal.dto.LoanOfferDto;
import ru.neoflex.deal.dto.StatementStatusHistoryDto;
import ru.neoflex.deal.entity.enums.ApplicationStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "statement")
public class Statement {
    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "statement_id")
    private UUID statementId;

    @OneToOne
    @Getter
    @JoinColumn(name = "client_id", referencedColumnName = "client_id", unique = true)
    private Client client;

    @OneToOne
    @Setter
    @JoinColumn(name = "credit_id", referencedColumnName = "credit_id", unique = true)
    private Credit credit;

    @Enumerated(EnumType.STRING)
    @Setter
    @Column(name = "application_status", nullable = false)
    private ApplicationStatus applicationStatus;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;

    //TODO: возможно добавить отдельную entity для dto
    @Setter
    @Column(name = "applied_offer", columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private LoanOfferDto appliedOffer;

    //TODO: втф
    @Column(name = "ses_code", nullable = false)
    private String sesCode;

    @Setter
    @Getter
    @Column(name = "status_history", nullable = false, columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<StatementStatusHistoryDto> statusHistory;


}
