package com.lifestyleai.dto.habit;

import java.time.LocalDateTime;

import com.lifestyleai.enums.habit.HabitCategory;
import com.lifestyleai.enums.habit.HabitFrequency;

import lombok.Data;

@Data
public class HabitResponse {

    private Long id;

    private Long userId;

    private String name;

    private HabitCategory category;

    private HabitFrequency frequency;

    private Boolean isPredefined;

    private Boolean isActive;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}