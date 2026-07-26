export interface User {

    id: number;

    firstName: string;
    lastName: string;

    email: string;

    gender?: "MALE" | "FEMALE" | "OTHER";

    dateOfBirth?: string;

    height?: number;

    weight?: number;

    targetWeight?: number;

    activityLevel?:
        | "SEDENTARY"
        | "LIGHT"
        | "MODERATE"
        | "ACTIVE"
        | "VERY_ACTIVE";

    occupation?: string;

    monthlyIncome?: number;

    currency?: "INR" | "USD" | "EUR";

    sleepGoalHours: number;

    waterGoalGlasses: number;

    stepsGoal: number;

    dailyCalorieGoal: number;

    isActive: boolean;

    createdAt: string;

    updatedAt: string;
}