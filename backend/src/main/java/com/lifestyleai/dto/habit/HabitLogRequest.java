package com.lifestyleai.dto.habit;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class HabitLogRequest {
	
	@NotNull(message = "User ID is required")
	private Long userId;

    @NotNull(message = "Habit ID is required")
    private Long habitId;

    @NotNull(message = "Completion status is required")
    private Boolean completed;

}