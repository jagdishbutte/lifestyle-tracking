import { type LucideIcon } from "lucide-react";

export interface StatCardProps {
    title: string;
    value: string;
    description?: string;
    icon: LucideIcon;
    color?: "teal" | "green" | "amber";
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