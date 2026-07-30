package com.lifestyleai.service;

import java.time.LocalDate;
import java.util.List;

import com.lifestyleai.dto.habit.HabitLogRequest;
import com.lifestyleai.dto.habit.HabitLogResponse;

public interface HabitLogService {

	HabitLogResponse updateHabitCompletion(HabitLogRequest request);

	List<HabitLogResponse> getTodayHabitLogs();

	List<HabitLogResponse> getHabitLogsByHabit(Long habitId);

	List<HabitLogResponse> getHabitLogsBetweenDates(
	        LocalDate start,
	        LocalDate end);

}