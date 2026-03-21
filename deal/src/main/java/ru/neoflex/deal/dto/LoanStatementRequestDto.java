package ru.neoflex.deal.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

@Builder
@Data
@AllArgsConstructor
public class LoanStatementRequestDto {
    @NotNull(message = "Размер кредита требуется")
    @DecimalMin(value = "10000.0", message = "Размер кредита должен быть не менее 10.000")
    @DecimalMax(value = "5000000.0", message = "Размер кредита должен быть не более 5.000.000")
    private BigDecimal amount;

    @NotNull(message = "Срок кредита требуется")
    @Min(value = 6, message = "Срок кредита должен быть не менее 6 месяцев")
    @Max(value = 360, message = "Срок кредита должен быть не более 360 месяцев")
    private Integer term;

    @NotBlank(message = "Имя требуется")
    @Size(min = 2, max = 50, message = "Имя должно быть не меньше 2 и не больше 50 символов")
    @Pattern(regexp = "^[а-яА-Яa-zA-Z\\-]+$", message = "Имя должно содержать только буквы и дефисы")
    @Schema(example = "Илья")
    private String firstName;

    @NotBlank(message = "Фамилия требуется")
    @Size(min = 2, max = 50, message = "Фамилия должна быть не меньше 2 и не больше 50 символов")
    @Pattern(regexp = "^[а-яА-Яa-zA-Z\\-]+$", message = "Фамилия должна содержать только буквы и дефисы")
    @Schema(example = "Семенов")
    private String lastName;

    @Size(min = 2, max = 50, message = "Отчество должно быть не меньше 2 и не больше 50 символов")
    @Pattern(regexp = "^[а-яА-Яa-zA-Z\\-]*$", message = "Отчество должно содержать только буквы и дефисы")
    @Schema(example = "Игоревич")
    private String middleName;

    @NotBlank(message = "Почта требуется")
    @Email(message = "Неверный формат почты")
    @Size(max = 50, message = "Почта должна быть не больше 50 символов")
    private String email;

    @NotNull(message = "Дата рождения требуется")
    @Past(message = "Дата рождения должна быть в прошлом")
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @JsonFormat(pattern = "dd-MM-yyyy")
    @Schema(example = "25-08-2004")
    private LocalDate birthdate;

    @NotBlank(message = "Серия паспорта требуется")
    @Pattern(regexp = "^\\d{4}$", message = "Серия паспорта должна содержать 4 цифры")
    private String passportSeries;

    @NotBlank(message = "Номер паспорта требуетс")
    @Pattern(regexp = "^\\d{6}$", message = "Номер паспорта должен содержать 6 цифр")
    private String passportNumber;
}
