package ru.neoflex.deal.entity;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "client")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Getter
    @Column(name = "client_id")
    private UUID clientId;

    @Getter
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Getter
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Getter
    @Column(name = "middle_name")
    private String middleName;

    @Getter
    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @Getter
    @Column(name = "email", nullable = false)
    private String email;

    @Getter
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "passport_id", nullable = false, columnDefinition = "jsonb")
    private Passport passportId;

    @OneToOne(mappedBy = "client", cascade = CascadeType.ALL)
    private Statement statement;
}
