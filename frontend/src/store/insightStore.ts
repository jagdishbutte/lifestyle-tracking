import { create } from "zustand";

import type { WeeklyInsightsResponse } from "../types/insights";

interface InsightStore {
    insights: WeeklyInsightsResponse | null;
    insightsLoading: boolean;

    setInsights: (insights: WeeklyInsightsResponse | null) => void;

    setInsightsLoading: (insightsLoading: boolean) => void;

    clearInsights: () => void;
}

export const useInsightStore = create<InsightStore>((set) => ({
    insights: null,
    insightsLoading: false,

    setInsights: (insights) =>
        set({
            insights,
        }),

    setInsightsLoading: (insightsLoading) =>
        set({
            insightsLoading,
        }),

    clearInsights: () =>
        set({
            insights: null,
        }),
}));
