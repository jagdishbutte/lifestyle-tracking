package com.lifestyleai.dto.food;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MealItemRequest {

    @NotNull
    private Long foodId;

    @NotNull
    @DecimalMin(value = "0.1", inclusive = true)
    private Double quantity;
}