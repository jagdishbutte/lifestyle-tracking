package com.lifestyleai.dto.dashboard;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DashboardSummaryResponse {

    /* Sleep */

    private Double sleepHours;
    private Double sleepGoalHours;

    /* Water */

    private Integer waterGlasses;
    private Integer waterGoalGlasses;

    /* Calories */

    private Integer caloriesConsumed;
    private Integer dailyCalorieGoal;

    /* Habits */

    private Integer completedHabits;
    private Integer totalHabits;

}
