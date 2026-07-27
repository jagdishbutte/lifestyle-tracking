import type { LucideIcon } from "lucide-react";

export interface DashboardSummary {
    sleepHours: number;
    sleepGoalHours: number;

    waterGlasses: number;
    waterGoalGlasses: number;

    caloriesConsumed: number;
    dailyCalorieGoal: number;

    completedHabits: number;
    totalHabits: number;
}

export interface StatCardProps {
    title: string;
    current: number;
    target: number;
    unit?: string;
    icon: LucideIcon;
    color: "teal" | "green" | "amber";
}

export interface CheckInData {
    sleepHours: number;
    waterIntake: number;
    mood: "happy" | "neutral" | "sad";
}

export interface Habit {
    id: number;
    name: string;
    completed: boolean;
}

export interface QuickExpense {
    amount: string;
    category: string;
}

export interface QuickJournal {
    content: string;
}

export interface WorkoutLog {
    workoutType: string;
    duration: number;
    caloriesBurned: number;
    completed: boolean;
}