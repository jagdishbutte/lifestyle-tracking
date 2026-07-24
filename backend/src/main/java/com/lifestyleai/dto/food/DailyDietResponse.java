package com.lifestyleai.dto.food;

import java.time.LocalDate;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DailyDietResponse {

    private LocalDate date;

    private Double totalCalories;

    private Double totalProtein;

    private Double totalCarbs;

    private Double totalFat;

    private Double totalFiber;

    private List<MealResponse> mealSummaries;

}