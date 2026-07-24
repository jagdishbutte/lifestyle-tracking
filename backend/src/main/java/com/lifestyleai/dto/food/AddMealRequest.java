package com.lifestyleai.dto.food;

import java.time.LocalDate;
import java.util.List;

import com.lifestyleai.enums.food.MealType;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddMealRequest {

    @NotNull
    private Long userId;

    @NotNull
    private MealType mealType;

    @NotNull
    private LocalDate consumedDate;

    @Valid
    @NotEmpty
    private List<MealItemRequest> items;
}