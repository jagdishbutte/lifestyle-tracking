export const analyticsData = {
    summary: {
        habitScore: 82,
        expenses: 12450,
        goalCompletion: 73,
        journalEntries: 18,
    },

    habitTrend: [
        { day: "Mon", score: 60 },
        { day: "Tue", score: 72 },
        { day: "Wed", score: 80 },
        { day: "Thu", score: 75 },
        { day: "Fri", score: 88 },
        { day: "Sat", score: 90 },
        { day: "Sun", score: 85 },
    ],

    expenseCategories: [
        {
            category: "Food",
            amount: 4500,
        },
        {
            category: "Travel",
            amount: 1500,
        },
        {
            category: "Education",
            amount: 3000,
        },
        {
            category: "Bills",
            amount: 3450,
        },
    ],

    moodDistribution: [
        {
            mood: "Happy",
            count: 15,
        },
        {
            mood: "Neutral",
            count: 8,
        },
        {
            mood: "Sad",
            count: 3,
        },
    ],

    goals: [
        {
            title: "Gain Weight",
            current: 55,
            target: 70,
            unit: "kg",
        },

        {
            title: "Savings",
            current: 25000,
            target: 50000,
            unit: "₹",
        },

        {
            title: "Complete CDAC",
            current: 80,
            target: 100,
            unit: "%",
        },
    ],

    insights: [
        "Habit consistency improved by 12% this week.",
        "Food spending is the highest expense category.",
        "Journal entries indicate mostly positive moods.",
        "Goal completion is progressing steadily.",
    ],
};