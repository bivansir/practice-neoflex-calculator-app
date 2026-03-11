package ru.neoflex.calcservice.util;

import lombok.experimental.UtilityClass;
import ru.neoflex.calcservice.exception.BusinessValidationException;

import java.time.LocalDate;
import java.time.Period;

@UtilityClass
public class ValidationHelper {
    // Бизнес-валидация (прескоринг)
    public void validateAge(LocalDate birthdate, Integer term) {
        if (calculateAge(birthdate) < 18) {
            throw new BusinessValidationException("birthdate: Клиент должен быть старше 18 лет");
        }
        int ageAtCreditEnd = calculateAge(birthdate) + term / 12;
        if (ageAtCreditEnd > 65) {
            throw new BusinessValidationException("birthdate: Возраст клиента на момент окончания кредита не может быть больше 65 лет");
        }
    }

    private int calculateAge(LocalDate birthdate) {
        return Period.between(birthdate, LocalDate.now()).getYears();
    }
}
