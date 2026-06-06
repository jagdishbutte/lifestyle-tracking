import {
    Activity,
    CircleDollarSign,
    Target,
    Moon,
} from "lucide-react";
import type { CheckInData } from "../types/dashboard.types";

export const dashboardStats = [
    {
        title: "Steps Today",
        value: "6,542",
        description: "+12% from yesterday",
        icon: Activity,
        color: "teal",
    },

    {
        title: "Sleep",
        value: "7.5 hrs",
        description: "Good quality sleep",
        icon: Moon,
        color: "green",
    },

    {
        title: "Expenses",
        value: "₹1,250",
        description: "Today's spending",
        icon: CircleDollarSign,
        color: "amber",
    },

    {
        title: "Goals",
        value: "4/5",
        description: "Completed today",
        icon: Target,
        color: "teal",
    },
];

export const todayCheckIn: CheckInData = {
    sleepHours: 7.5,
    waterIntake: 2.5,
    mood: "happy",
};

export const todayHabits = [
    {
        id: 1,
        name: "Workout",
        completed: true,
    },
    {
        id: 2,
        name: "Reading",
        completed: false,
    },
    {
        id: 3,
        name: "Meditation",
        completed: true,
    },
    {
        id: 4,
        name: "Drink 3L Water",
        completed: false,
    },
];

export const expenseCategories = [
    "Food",
    "Travel",
    "Bills",
    "Shopping",
    "Health",
    "Other",
];

export const journalPrompt =
    "What went well today? What can be improved tomorrow?";

export const insights = [
    {
        id: 1,
        title: "Sleep Improvement",
        description:
            "Your average sleep duration increased by 18% this week.",
    },
    {
        id: 2,
        title: "Expense Pattern",
        description:
            "Food expenses account for 42% of your monthly spending.",
    },
    {
        id: 3,
        title: "Habit Consistency",
        description:
            "Reading is your most consistent habit with a 90% completion rate.",
    },
];

export const workoutTypes = [
    "Running",
    "Walking",
    "Cycling",
    "Gym",
    "Yoga",
    "Swimming",
    "Sports",
    "Other",
];