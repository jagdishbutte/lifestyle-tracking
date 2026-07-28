import type { ApiResponse } from "./common";

export type Gender =
    | "MALE"
    | "FEMALE"
    | "OTHER";

export type ActivityLevel =
    | "SEDENTARY"
    | "LIGHT"
    | "MODERATE"
    | "ACTIVE"
    | "VERY_ACTIVE";

export type CurrencyType =
    | "INR"
    | "USD"
    | "EUR"
    | "GBP";

export interface UserResponse {
    id: number;

    firstName: string;
    lastName: string;
    email: string;

    gender: Gender;
    dateOfBirth: string;

    height: number;
    weight: number;
    targetWeight: number;

    activityLevel: ActivityLevel;
    occupation: string;
    monthlyIncome: number;
    currency: CurrencyType;

    sleepGoalHours: number;
    waterGoalGlasses: number;
    stepsGoal: number;
    dailyCalorieGoal: number;

    createdAt: string;
    updatedAt: string;
}

export interface UpdateProfileRequest {
    gender: Gender;

    dateOfBirth: string;

    height: number;
    weight: number;
    targetWeight: number;

    activityLevel: ActivityLevel;
    occupation: string;
    monthlyIncome: number;
    currency: CurrencyType;

    sleepGoalHours: number;
    waterGoalGlasses: number;
    stepsGoal: number;
    dailyCalorieGoal: number;
}

export type UserApiResponse = ApiResponse<UserResponse>;