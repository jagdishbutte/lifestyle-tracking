export interface WeeklyInsightsResponse {
    userId: number;
    insightId: string;
    insights: InsightSections;
    recommendations: string[];
    createdAt: string;
}

export interface InsightSections {
    checkins: string;
    habits: string;
    diet: string;
    expenses: string;
    journal: string;
}