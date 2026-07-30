package com.lifestyleai.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lifestyleai.dto.checkin.DailyCheckInRequest;
import com.lifestyleai.dto.checkin.DailyCheckInResponse;
import com.lifestyleai.entity.DailyCheckIn;
import com.lifestyleai.entity.User;
import com.lifestyleai.repository.DailyCheckInRepository;
import com.lifestyleai.repository.DietEntryRepository;
import com.lifestyleai.service.common.UserHelper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class DailyCheckInServiceImpl implements DailyCheckInService {

    private final DailyCheckInRepository dailyCheckInRepository;
    private final UserHelper userHelper;
    private final DietEntryRepository dietEntryRepository;

    @Override
    public DailyCheckInResponse saveTodayCheckIn(DailyCheckInRequest request) {

    	User user = userHelper.getCurrentUser();

        LocalDate today = LocalDate.now();

        DailyCheckIn checkIn = dailyCheckInRepository
                .findByUserIdAndDate(user.getId(), today)
                .orElseGet(() -> {
                    DailyCheckIn newCheckIn = new DailyCheckIn();
                    newCheckIn.setUser(user);
                    newCheckIn.setDate(today);
                    return newCheckIn;
                });

        checkIn.setSleepHours(request.getSleepHours());
        checkIn.setWaterGlasses(request.getWaterGlasses());
        checkIn.setStepsWalked(request.getStepsWalked());
        checkIn.setWellbeingScore(request.getWellbeingScore());

        dailyCheckInRepository.save(checkIn);

        return buildResponse(checkIn);
    }

    @Override
    @Transactional(readOnly = true)
    public DailyCheckInResponse getTodayCheckIn() {

        return dailyCheckInRepository
                .findByUserIdAndDate(userHelper.getCurrentUserId(), LocalDate.now())
                .map(this::buildResponse)
                .orElse(null);
    }

    /* ==========================================================
                            Helper Methods
       ========================================================== */

    private DailyCheckInResponse buildResponse(DailyCheckIn checkIn) {

        User user = checkIn.getUser();

        DailyCheckInResponse response = new DailyCheckInResponse();

        response.setId(checkIn.getId());
        response.setDate(checkIn.getDate());

        response.setSleepHours(checkIn.getSleepHours());
        response.setWaterGlasses(checkIn.getWaterGlasses());
        response.setStepsWalked(checkIn.getStepsWalked());
        response.setWellbeingScore(checkIn.getWellbeingScore());

        response.setSleepGoalHours(user.getSleepGoalHours());
        response.setWaterGoalGlasses(user.getWaterGoalGlasses());
        response.setStepsGoal(user.getStepsGoal());
        response.setDailyCalorieGoal(user.getDailyCalorieGoal());

        Double caloriesConsumed = dietEntryRepository
                .getTotalCaloriesByUserAndDate(
                        user.getId(),
                        checkIn.getDate());

        response.setCaloriesConsumed(caloriesConsumed.intValue());

        return response;
    }

}