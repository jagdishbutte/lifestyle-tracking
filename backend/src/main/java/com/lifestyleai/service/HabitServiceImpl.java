package com.lifestyleai.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lifestyleai.dto.habit.HabitRequest;
import com.lifestyleai.dto.habit.HabitResponse;
import com.lifestyleai.entity.Habit;
import com.lifestyleai.entity.User;
import com.lifestyleai.exception.ResourceNotFoundException;
import com.lifestyleai.repository.HabitRepository;
import com.lifestyleai.service.common.UserHelper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class HabitServiceImpl implements HabitService {

    private final HabitRepository habitRepository;
    private final UserHelper userHelper;
    private final ModelMapper mapper;

    @Override
    public HabitResponse addHabit(HabitRequest request) {

    	User user = userHelper.getCurrentUser();

        Habit habit = new Habit();

        habit.setName(request.getName());
        habit.setCategory(request.getCategory());
        habit.setFrequency(request.getFrequency());
        habit.setUser(user);
        habit.setIsActive(true);
        habit.setIsPredefined(false);

        Habit savedHabit = habitRepository.save(habit);

        HabitResponse response = mapper.map(savedHabit, HabitResponse.class);
        response.setUserId(user.getId());

        return response;
    }

    @Override
    public List<HabitResponse> getHabitsByUser(Long userId) {

        return habitRepository.findByUserIdAndIsActiveTrue(userId)
                .stream()
                .map(habit -> {
                    HabitResponse response = mapper.map(habit, HabitResponse.class);
                    response.setUserId(userId);
                    return response;
                })
                .toList();
    }

    @Override
    public HabitResponse updateHabit(Long id, HabitRequest request) {

        Habit habit = findHabit(id);

        habit.setName(request.getName());
        habit.setCategory(request.getCategory());
        habit.setFrequency(request.getFrequency());

        Habit updatedHabit = habitRepository.save(habit);

        HabitResponse response = mapper.map(updatedHabit, HabitResponse.class);
        response.setUserId(updatedHabit.getUser().getId());

        return response;
    }

    @Override
    public void deleteHabit(Long id) {

        Habit habit = findHabit(id);

        habit.setIsActive(false);

        habitRepository.save(habit);
    }

    /**
     * Returns a Habit by id or throws ResourceNotFoundException.
     */
    private Habit findHabit(Long id) {

        return habitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Habit not found."));
    }

}