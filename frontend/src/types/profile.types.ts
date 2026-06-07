export interface Profile {
    name: string;
    email: string;

    age: number;
    gender: string;

    height: number;
    weight: number;
    targetWeight: number;

    monthlyIncome: number;
    savingsGoal: number;

    aiInsightsEnabled: boolean;
    notificationsEnabled: boolean;

    activityLevel:
    | "Sedentary"
    | "Light"
    | "Moderate"
    | "Active";
}