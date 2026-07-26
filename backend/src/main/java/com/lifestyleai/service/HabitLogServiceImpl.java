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
@Transactional
@RequiredArgsConstructor
public class HabitLogServiceImpl implements HabitLogService {

    private final HabitLogRepository habitLogRepository;
    private final HabitRepository habitRepository;
    private final UserHelper userHelper;
    private final ModelMapper mapper;

    @Override
    public HabitLogResponse markHabit(HabitLogRequest request) {
    	
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

        HabitLogResponse response = mapper.map(savedLog, HabitLogResponse.class);
        response.setHabitId(habit.getId());

        return response;
    }

    @Override
    public HabitLogResponse getHabitLogById(Long id) {

        HabitLog habitLog = findHabitLog(id);

        HabitLogResponse response = mapper.map(habitLog, HabitLogResponse.class);
        response.setHabitId(habitLog.getHabit().getId());

        return response;
    }

    @Override
    public List<HabitLogResponse> getHabitLogsByHabit(Long habitId) {

        return habitLogRepository.findByHabitId(habitId)
                .stream()
                .map(log -> {
                    HabitLogResponse response = mapper.map(log, HabitLogResponse.class);
                    response.setHabitId(log.getHabit().getId());
                    return response;
                })
                .toList();
    }

    @Override
    public List<HabitLogResponse> getHabitLogsByDate(LocalDate date) {

        return habitLogRepository.findByDate(date)
                .stream()
                .map(log -> {
                    HabitLogResponse response = mapper.map(log, HabitLogResponse.class);
                    response.setHabitId(log.getHabit().getId());
                    return response;
                })
                .toList();
    }

    /**
     * Returns a HabitLog by id or throws ResourceNotFoundException.
     */
    private HabitLog findHabitLog(Long id) {

        return habitLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Habit log not found."));
    }

}