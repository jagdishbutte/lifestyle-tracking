import { type Journal } from "../types/journal.types";

export const initialJournals: Journal[] = [
    {
        id: 1,
        title: "Productive Day",
        content:
            "Completed all assignments and went for a walk.",
        mood: "Happy",
        date: "2026-06-05",
    },

    {
        id: 2,
        title: "Average Day",
        content:
            "Worked on project but felt tired.",
        mood: "Neutral",
        date: "2026-06-04",
    },

    {
        id: 3,
        title: "Stressful Day",
        content:
            "Had deadline pressure throughout the day.",
        mood: "Sad",
        date: "2026-06-03",
    },
];