package com.lifestyleai.service;

import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lifestyleai.dto.habit.HabitLogRequest;
import com.lifestyleai.dto.habit.HabitLogResponse;
import com.lifestyleai.entity.Habit;
import com.lifestyleai.entity.HabitLog;
import com.lifestyleai.entity.User;
import com.lifestyleai.exception.ResourceNotFoundException;
import com.lifestyleai.repository.HabitLogRepository;
import com.lifestyleai.repository.HabitRepository;
import com.lifestyleai.service.common.UserHelper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class HabitLogServiceImpl implements HabitLogService {

    private final HabitLogRepository habitLogRepository;
    private final HabitRepository habitRepository;
    private final UserHelper userHelper;
    private final ModelMapper mapper;

    @Override
    public HabitLogResponse updateHabitCompletion(HabitLogRequest request) {

        User user = userHelper.findActiveUser(request.getUserId());

        Habit habit = habitRepository
                .findByIdAndUserIdAndIsActiveTrue(
                        request.getHabitId(),
                        user.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Habit not found."));

        HabitLog habitLog = habitLogRepository
                .findByHabitIdAndDate(
                        habit.getId(),
                        LocalDate.now())
                .orElse(new HabitLog());

        habitLog.setHabit(habit);
        habitLog.setDate(LocalDate.now());
        habitLog.setCompleted(request.getCompleted());

        HabitLog savedLog = habitLogRepository.save(habitLog);

        return mapToResponse(savedLog);
    }

    @Override
    @Transactional(readOnly = true)
    public List<HabitLogResponse> getTodayHabitLogs(Long userId) {

        userHelper.findActiveUser(userId);

        return habitLogRepository
                .findByHabitUserIdAndDate(userId, LocalDate.now())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)

    public List<HabitLogResponse> getHabitLogsByHabit(
            Long userId,
            Long habitId) {

        User user = userHelper.findActiveUser(userId);

        Habit habit = habitRepository
                .findByIdAndUserIdAndIsActiveTrue(
                        habitId,
                        user.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Habit not found."));

        return habitLogRepository
                .findByHabitId(habit.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<HabitLogResponse> getHabitLogsBetweenDates(
            Long userId,
            LocalDate start,
            LocalDate end) {

        userHelper.findActiveUser(userId);

        return habitLogRepository
                .findByHabitUserIdAndDateBetween(userId, start, end)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    /**
     * Converts HabitLog entity to HabitLogResponse DTO.
     */
    private HabitLogResponse mapToResponse(HabitLog habitLog) {

        HabitLogResponse response =
                mapper.map(habitLog, HabitLogResponse.class);

        response.setHabitId(habitLog.getHabit().getId());

        return response;
    }

}