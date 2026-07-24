package com.lifestyleai.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lifestyleai.entity.Habit;
import com.lifestyleai.entity.HabitTemplate;
import com.lifestyleai.entity.User;
import com.lifestyleai.repository.HabitRepository;
import com.lifestyleai.repository.HabitTemplateRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class HabitTemplateServiceImpl implements HabitTemplateService {

    private final HabitTemplateRepository habitTemplateRepository;
    private final HabitRepository habitRepository;

    @Override
    public void initializeUserHabits(User user) {

        List<HabitTemplate> templates = habitTemplateRepository.findByIsActiveTrue();

        List<Habit> habits = new ArrayList<>();

        for (HabitTemplate template : templates) {

            Habit habit = new Habit();

            habit.setName(template.getName());
            habit.setCategory(template.getCategory());
            habit.setFrequency(template.getFrequency());

            habit.setIsActive(true);
            habit.setIsPredefined(true);
            habit.setUser(user);

            habits.add(habit);
        }

        habitRepository.saveAll(habits);
    }

}