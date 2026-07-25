package com.lifestyleai.dto.checkin;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DailyCheckInResponse {

    private Long id;

    private LocalDate date;

    /* Today's Metrics */

    private Double sleepHours;

    private Integer waterGlasses;

    private Integer stepsWalked;

    private Integer caloriesConsumed;

    private Integer wellbeingScore;

    /* Daily Targets */

    private Double sleepGoalHours;

    private Integer waterGoalGlasses;

    private Integer stepsGoal;

    private Integer dailyCalorieGoal;

}