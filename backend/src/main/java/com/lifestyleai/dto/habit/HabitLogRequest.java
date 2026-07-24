package com.lifestyleai.dto.habit;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class HabitLogRequest {

    @NotNull(message = "Habit ID is required")
    private Long habitId;

    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotNull(message = "Completion status is required")
    private Boolean completed;

}