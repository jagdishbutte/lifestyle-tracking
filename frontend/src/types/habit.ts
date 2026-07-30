export interface HabitResponse {
    id: number;
    userId: number;
    name: string;

    category:
        | "HEALTH"
        | "FITNESS"
        | "PRODUCTIVITY"
        | "LEARNING"
        | "MINDFULNESS"
        | "FINANCE"
        | "PERSONAL"
        | "OTHER";

    frequency:
        | "DAILY"
        | "WEEKLY"
        | "MONTHLY";

    isPredefined: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface HabitRequest {
    name: string;

    category:
        | "HEALTH"
        | "FITNESS"
        | "PRODUCTIVITY"
        | "LEARNING"
        | "MINDFULNESS"
        | "FINANCE"
        | "PERSONAL"
        | "OTHER";

    frequency:
        | "DAILY"
        | "WEEKLY"
        | "MONTHLY";
}

export interface HabitLogRequest {
    habitId: number;
    completed: boolean;
}

export interface HabitLogResponse {
    id: number;
    habitId: number;
    date: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

/**
 * Frontend view model used by the dashboard.
 * Combines HabitResponse with today's completion status.
 */
export interface HabitItem extends HabitResponse {
    completed: boolean;
}
