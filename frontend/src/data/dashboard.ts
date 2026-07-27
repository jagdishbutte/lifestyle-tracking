import type { CheckInData } from "../types/dashboard";

// import {
//     Moon,
//     Droplets,
//     Flame,
//     CheckCircle2,
// } from "lucide-react";

// export const dashboardStats = [

//     {
//         title: "Sleep",
//         value: "7.5 / 8 hrs",
//         description: "Daily sleep goal",
//         icon: Moon,
//         color: "teal",
//     },

//     {
//         title: "Water",
//         value: "6 / 8 glasses",
//         description: "Today's hydration",
//         icon: Droplets,
//         color: "green",
//     },

//     {
//         title: "Calories",
//         value: "1850 / 2200 kcal",
//         description: "Today's calorie intake",
//         icon: Flame,
//         color: "amber",
//     },

//     {
//         title: "Habits",
//         value: "5 / 7",
//         description: "Completed today",
//         icon: CheckCircle2,
//         color: "teal",
//     },

// ];

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