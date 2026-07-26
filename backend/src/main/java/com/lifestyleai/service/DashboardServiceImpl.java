package com.lifestyleai.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lifestyleai.dto.dashboard.DashboardSummaryResponse;
import com.lifestyleai.entity.DailyCheckIn;
import com.lifestyleai.entity.User;
import com.lifestyleai.repository.DailyCheckInRepository;
import com.lifestyleai.repository.DietEntryRepository;
import com.lifestyleai.repository.HabitLogRepository;
import com.lifestyleai.repository.HabitRepository;
import com.lifestyleai.service.common.UserHelper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class DashboardServiceImpl implements DashboardService {

    private final UserHelper userHelper;
    private final DailyCheckInRepository dailyCheckInRepository;
    private final DietEntryRepository dietEntryRepository;
    private final HabitRepository habitRepository;
    private final HabitLogRepository habitLogRepository;

    @Override
    public DashboardSummaryResponse getDashboardSummary(Long userId) {

        User user = userHelper.findActiveUser(userId);

        LocalDate today = LocalDate.now();

        DailyCheckIn checkIn = dailyCheckInRepository
                .findByUserIdAndDate(userId, today)
                .orElse(null);

        DashboardSummaryResponse response = new DashboardSummaryResponse();

        // Sleep & Water
        if (checkIn != null) {
            response.setSleepHours(checkIn.getSleepHours());
            response.setWaterGlasses(checkIn.getWaterGlasses());
        }

        // User Goals
        response.setSleepGoalHours(user.getSleepGoalHours());
        response.setWaterGoalGlasses(user.getWaterGoalGlasses());
        response.setDailyCalorieGoal(user.getDailyCalorieGoal());

        // Calories
        Double calories = dietEntryRepository
                .getTotalCaloriesByUserAndDate(userId, today);

        response.setCaloriesConsumed(calories.intValue());

        // Habits
        Long completed = habitLogRepository
                .countCompletedHabits(userId, today);

        Long total = habitRepository
                .countTotalHabits(userId);

        response.setCompletedHabits(completed.intValue());
        response.setTotalHabits(total.intValue());

        return response;
    }

}
