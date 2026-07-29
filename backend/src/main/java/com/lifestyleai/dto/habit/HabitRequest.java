package com.lifestyleai.dto.habit;

import com.lifestyleai.enums.habit.HabitCategory;
import com.lifestyleai.enums.habit.HabitFrequency;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class HabitRequest {

    @NotBlank(message = "Habit name is required")
    private String name;

    @NotNull(message = "Category is required")
    private HabitCategory category;

    @NotNull(message = "Frequency is required")
    private HabitFrequency frequency;

}