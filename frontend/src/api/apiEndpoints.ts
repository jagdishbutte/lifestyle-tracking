export const AUTH_API = {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
};

export const DASHBOARD_API = {
    SUMMARY: "/api/dashboard/summary",
};

export const CHECKIN_API = {
    SAVE: "/api/checkin",
    TODAY: "/api/checkin/user",
};

export const HABIT_API = {
    ACTIVE: "/api/habits/user",
    BASE: "/api/habits",
};

export const HABIT_LOG_API = {
    COMPLETION: "/api/habit-logs/completion",
    TODAY: "/api/habit-logs/user",
    HISTORY: "/api/habit-logs/user",
};

export const DIET_API = {
    BASE: "/api/diet",
    TODAY: "/api/diet/user",
    ENTRY: "/api/diet/entry",
    HISTORY: "/api/diet/user",
};

export const FOOD_API = {
    SEARCH: "/api/foods/search",
};

export const EXPENSE_API = {
    TODAY: "/api/expenses/user",
    HISTORY: "/api/expenses/user",
    BASE: "/api/expenses",
};

export const JOURNAL_API = {
    TODAY: "/api/journals/user",
    HISTORY: "/api/journals/user",
    BASE: "/api/journals",
};

export const PROFILE_API = {
    BASE: "/api/users",
};

export const CHAT_API = {
    CHAT: "/api/ai/chat",
    HISTORY: "/api/ai/history",
    HISTORY_BY_ID: (sessionId: string) => `/api/ai/history/${sessionId}`,
    UPDATE_TITLE: (sessionId: string) => `/api/ai/history/${sessionId}/title`,
    DELETE: (sessionId: string) =>`/api/ai/chat/${sessionId}`,
};

export const INSIGHTS_API = {
    REFRESH: "/api/ai/insights/refresh",
    LATEST: "/api/ai/insights",
};