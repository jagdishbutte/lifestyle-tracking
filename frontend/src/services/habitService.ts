import { apiConnector } from "../api/apiConnector";
import { HABIT_API, HABIT_LOG_API } from "../api/apiEndpoints";

import type { ApiResponse } from "../types/common";
import type { HabitLogRequest, HabitLogResponse, HabitRequest, HabitResponse } from "../types/habit";

export const getActiveHabits = async (
    userId: number
): Promise<ApiResponse<HabitResponse[]>> => {

    const response = await apiConnector<ApiResponse<HabitResponse[]>>(
        "GET",
        `${HABIT_API.ACTIVE}/${userId}/active`
    );

    return response.data;
};

export const getTodayHabitLogs = async (
    userId: number
): Promise<ApiResponse<HabitLogResponse[]>> => {

    const response = await apiConnector<ApiResponse<HabitLogResponse[]>>(
        "GET",
        `${HABIT_LOG_API.TODAY}/${userId}/today`
    );

    return response.data;
};

export const updateHabitCompletion = async (
    request: HabitLogRequest
): Promise<ApiResponse<HabitLogResponse>> => {

    const response = await apiConnector<ApiResponse<HabitLogResponse>>(
        "PATCH",
        HABIT_LOG_API.COMPLETION,
        request
    );

    return response.data;
};

export const createHabit = async (
    request: HabitRequest
): Promise<ApiResponse<HabitResponse>> => {

    const response = await apiConnector<ApiResponse<HabitResponse>>(
        "POST",
        HABIT_API.BASE,
        request
    );

    return response.data;
};

export const updateHabit = async (
    habitId: number,
    request: HabitRequest
): Promise<ApiResponse<HabitResponse>> => {

    const response = await apiConnector<ApiResponse<HabitResponse>>(
        "PUT",
        `${HABIT_API.BASE}/${habitId}`,
        request
    );

    return response.data;
};

export const deleteHabit = async (
    habitId: number
): Promise<ApiResponse<void>> => {

    const response = await apiConnector<ApiResponse<void>>(
        "DELETE",
        `${HABIT_API.BASE}/${habitId}`
    );

    return response.data;
};

export const getHabitHistory = async (
    userId: number,
    start: string,
    end: string
): Promise<ApiResponse<HabitLogResponse[]>> => {

    const response = await apiConnector<ApiResponse<HabitLogResponse[]>>(
        "GET",
        `${HABIT_LOG_API.HISTORY}/${userId}`,
        undefined,
        undefined,
        {
            start,
            end,
        }
    );

    return response.data;
};