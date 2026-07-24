package com.lifestyleai.dto.habit;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class HabitLogResponse {

    private Long id;

    private Long habitId;

    private LocalDate date;

    private Boolean completed;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}