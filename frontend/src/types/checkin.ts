export interface DailyCheckInRequest {
    sleepHours: number;
    waterGlasses: number;
    stepsWalked: number;
    wellbeingScore: number;
}

export interface DailyCheckInResponse {
    id: number;
    date: string;

    /* Today's Metrics */
    sleepHours: number;
    waterGlasses: number;
    stepsWalked: number;
    caloriesConsumed: number;
    wellbeingScore: number;

    /* Daily Targets */
    sleepGoalHours: number;
    waterGoalGlasses: number;
    stepsGoal: number;
    dailyCalorieGoal: number;
}