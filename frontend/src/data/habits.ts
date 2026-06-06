import type { Habit } from "../types/habit.types";

export const habits: Habit[] = [
    {
        id: 1,
        name: "Reading",
        streak: 12,
        completedToday: true,
    },
    {
        id: 2,
        name: "Workout",
        streak: 5,
        completedToday: false,
    },
    {
        id: 3,
        name: "Meditation",
        streak: 20,
        completedToday: true,
    },
    {
        id: 4,
        name: "Drink 3L Water",
        streak: 8,
        completedToday: true,
    },
];