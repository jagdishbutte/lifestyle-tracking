package com.lifestyleai.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.lifestyleai.enums.ActivityLevel;
import com.lifestyleai.enums.CurrencyType;
import com.lifestyleai.enums.Gender;

import lombok.Data;

@Data
public class UserResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private Gender gender;

    private LocalDate dateOfBirth;

    private Double height;

    private Double weight;

    private Double targetWeight;

    private ActivityLevel activityLevel;

    private String occupation;

    private BigDecimal monthlyIncome;

    private CurrencyType currency;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}