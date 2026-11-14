package ru.neoflex.deal.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.neoflex.deal.enums.Theme;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmailMessage {

    @NotNull
    private String address;

    @NotNull
    private Theme theme;

    @NotNull
    private UUID statementId;

    private String text;
}
