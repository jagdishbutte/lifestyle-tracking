import { apiConnector } from "../api/apiConnector";
import { JOURNAL_API } from "../api/apiEndpoints";

import type { ApiResponse } from "../types/common";

import type {
    DailyJournalResponse,
    JournalRequest,
    JournalResponse,
} from "../types/journal";

export const getTodayJournals = async (
    userId: number,
): Promise<ApiResponse<DailyJournalResponse>> => {

    const response =
        await apiConnector<ApiResponse<DailyJournalResponse>>(
            "GET",
            `${JOURNAL_API.TODAY}/${userId}/today`,
        );

    return response.data;
};

export const getJournalHistory = async (
    userId: number,
    days: number,
): Promise<ApiResponse<DailyJournalResponse[]>> => {

    const response =
        await apiConnector<ApiResponse<DailyJournalResponse[]>>(
            "GET",
            `${JOURNAL_API.HISTORY}/${userId}/history`,
            null,
            {
                days,
            },
        );

    return response.data;
};

export const addJournal = async (
    request: JournalRequest,
): Promise<ApiResponse<JournalResponse>> => {

    const response =
        await apiConnector<ApiResponse<JournalResponse>>(
            "POST",
            JOURNAL_API.BASE,
            request,
        );

    return response.data;
};

export const updateJournal = async (
    journalId: number,
    request: JournalRequest,
): Promise<ApiResponse<JournalResponse>> => {

    const response =
        await apiConnector<ApiResponse<JournalResponse>>(
            "PUT",
            `${JOURNAL_API.BASE}/${journalId}`,
            request,
        );

    return response.data;
};

export const deleteJournal = async (
    journalId: number,
): Promise<ApiResponse<void>> => {

    const response =
        await apiConnector<ApiResponse<void>>(
            "DELETE",
            `${JOURNAL_API.BASE}/${journalId}`,
        );

    return response.data;
};