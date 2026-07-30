package com.lifestyleai.service;

import java.util.List;

import com.lifestyleai.dto.habit.HabitRequest;
import com.lifestyleai.dto.habit.HabitResponse;

public interface HabitService {

    HabitResponse addHabit(HabitRequest request);

    List<HabitResponse> getHabitsByUser();

    HabitResponse updateHabit(Long id, HabitRequest request);

    void deleteHabit(Long id);

}