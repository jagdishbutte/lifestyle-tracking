package com.lifestyleai.dto.user;

import com.lifestyleai.enums.user.ActivityLevel;
import com.lifestyleai.enums.user.CurrencyType;
import com.lifestyleai.enums.user.Gender;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class UpdateProfileRequest {

    private Gender gender;

    private LocalDate dateOfBirth;

    @Positive(message = "Height must be greater than zero")
    private Double height;

    @Positive(message = "Weight must be greater than zero")
    private Double weight;

    @Positive(message = "Target weight must be greater than zero")
    private Double targetWeight;

    private ActivityLevel activityLevel;

    private String occupation;

    @Positive(message = "Monthly income must be greater than zero")
    private BigDecimal monthlyIncome;

    private CurrencyType currency;
    
    private Double sleepGoalHours;

    private Integer waterGoalGlasses;

    private Integer stepsGoal;

    private Integer dailyCalorieGoal;

}