package com.lifestyleai.dto.food;

import com.lifestyleai.enums.food.FoodCategory;
import com.lifestyleai.enums.food.ServingUnit;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodRequest {

    @NotBlank
    private String name;

    @NotNull
    private FoodCategory category;

    @NotNull
    private Double servingQuantity;

    @NotNull
    private ServingUnit servingUnit;

    @NotNull
    private Double calories;

    @NotNull
    private Double protein;

    @NotNull
    private Double carbs;

    @NotNull
    private Double fat;

    @NotNull
    private Double fiber;
}