package com.lifestyleai.dto.food;

import java.util.List;

import com.lifestyleai.enums.food.MealType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MealResponse {

    private MealType mealType;

    private List<DietEntryResponse> entries;

    private Double totalCalories;

    private Double totalProtein;

    private Double totalCarbs;

    private Double totalFat;

    private Double totalFiber;
    
    private Integer itemCount;

}