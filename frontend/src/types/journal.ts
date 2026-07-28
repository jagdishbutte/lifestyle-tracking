import type { ApiResponse } from "./common";

export interface JournalRequest {
    userId: number;
    title: string;
    content: string;
    favourite: boolean;
}

export interface JournalResponse {
    id: number;
    userId: number;
    title: string;
    content: string;
    favourite: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface DailyJournalResponse {
    date: string;
    entryCount: number;
    journals: JournalResponse[];
}

export type JournalApiResponse = ApiResponse<JournalResponse>;
export type DailyJournalApiResponse = ApiResponse<DailyJournalResponse>;
export type JournalHistoryApiResponse = ApiResponse<DailyJournalResponse[]>;