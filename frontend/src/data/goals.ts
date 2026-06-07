import type { Goal } from "../types/goal.types";


export const goalCategories = [
    "Fitness",
    "Finance",
    "Learning",
    "Personal",
] as const;

export const initialGoals: Goal[] = [
    {
        id: 1,
        title: "Gain Weight",
        category: "Fitness",
        currentValue: 55,
        targetValue: 70,
        unit: "kg",
        targetDate: "2026-12-31",
    },

    {
        id: 2,
        title: "Savings",
        category: "Finance",
        currentValue: 25000,
        targetValue: 50000,
        unit: "₹",
        targetDate: "2026-12-31",
    },

    {
        id: 3,
        title: "Complete CDAC",
        category: "Learning",
        currentValue: 80,
        targetValue: 100,
        unit: "%",
        targetDate: "2026-09-30",
    },
];