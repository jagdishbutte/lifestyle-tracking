package com.lifestyleai.dto.food;

import java.time.LocalDate;

import com.lifestyleai.enums.food.MealType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DietEntryResponse {

    private Long id;

    private String foodName;

    private MealType mealType;

    private Double quantityConsumed;

    private Double consumedCalories;

    private Double consumedProtein;

    private Double consumedCarbs;

    private Double consumedFat;

    private Double consumedFiber;

    private LocalDate consumedDate;
}