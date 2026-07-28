import { apiConnector } from "../api/apiConnector";
import { EXPENSE_API } from "../api/apiEndpoints";

import type { ApiResponse } from "../types/common";

import type {
    DailyExpenseResponse,
    ExpenseRequest,
    ExpenseResponse,
} from "../types/expense";

export const getTodayExpenses = async (
    userId: number
): Promise<ApiResponse<DailyExpenseResponse>> => {

    const response =
        await apiConnector<ApiResponse<DailyExpenseResponse>>(
            "GET",
            `${EXPENSE_API.TODAY}/${userId}/today`
        );

    return response.data;
};

export const getExpenseHistory = async (
    userId: number,
    days: number
): Promise<ApiResponse<DailyExpenseResponse[]>> => {

    const response =
        await apiConnector<ApiResponse<DailyExpenseResponse[]>>(
            "GET",
            `${EXPENSE_API.HISTORY}/${userId}/history`,
            null,
            {
                days,
            }
        );

    return response.data;
};

export const addExpense = async (
    request: ExpenseRequest
): Promise<ApiResponse<ExpenseResponse>> => {

    const response =
        await apiConnector<ApiResponse<ExpenseResponse>>(
            "POST",
            EXPENSE_API.BASE,
            request
        );

    return response.data;
};

export const updateExpense = async (
    expenseId: number,
    request: ExpenseRequest
): Promise<ApiResponse<ExpenseResponse>> => {

    const response =
        await apiConnector<ApiResponse<ExpenseResponse>>(
            "PUT",
            `${EXPENSE_API.BASE}/${expenseId}`,
            request
        );

    return response.data;
};

export const deleteExpense = async (
    expenseId: number
): Promise<ApiResponse<void>> => {

    const response =
        await apiConnector<ApiResponse<void>>(
            "DELETE",
            `${EXPENSE_API.BASE}/${expenseId}`
        );

    return response.data;
};