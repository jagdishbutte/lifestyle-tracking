package com.lifestyleai.service;

import java.time.LocalDate;
import java.util.List;

import com.lifestyleai.dto.habit.HabitLogRequest;
import com.lifestyleai.dto.habit.HabitLogResponse;

public interface HabitLogService {

    HabitLogResponse markHabit(HabitLogRequest request);

    HabitLogResponse getHabitLogById(Long id);

    List<HabitLogResponse> getHabitLogsByHabit(Long habitId);

    List<HabitLogResponse> getHabitLogsByDate(LocalDate date);

}