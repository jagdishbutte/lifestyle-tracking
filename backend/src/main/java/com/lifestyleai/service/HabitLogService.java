package com.lifestyleai.service;

import java.time.LocalDate;
import java.util.List;

import com.lifestyleai.dto.habit.HabitLogRequest;
import com.lifestyleai.dto.habit.HabitLogResponse;

public interface HabitLogService {

	HabitLogResponse updateHabitCompletion(HabitLogRequest request);

	List<HabitLogResponse> getTodayHabitLogs(Long userId);

	List<HabitLogResponse> getHabitLogsByHabit(Long userId, Long habitId);

	List<HabitLogResponse> getHabitLogsBetweenDates(
	        Long userId,
	        LocalDate start,
	        LocalDate end);

}