package ru.neoflex.deal.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Passport {
    @JsonProperty("series")
    private String series;

    @JsonProperty("number")
    private String number;


}
