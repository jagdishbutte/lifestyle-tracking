package com.lifestyleai.dto.food;

import com.lifestyleai.enums.food.FoodCategory;
import com.lifestyleai.enums.food.ServingUnit;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodResponse {

    private Long id;

    private String name;

    private FoodCategory category;

    private Double servingQuantity;

    private ServingUnit servingUnit;

    private Double calories;

    private Double protein;

    private Double carbs;

    private Double fat;

    private Double fiber;
}