import type { ApiResponse } from "./common";

export type ExpenseCategory =
    | "FOOD"
    | "TRANSPORT"
    | "SHOPPING"
    | "ENTERTAINMENT"
    | "HEALTH"
    | "BILLS"
    | "EDUCATION"
    | "TRAVEL"
    | "OTHER";

export interface ExpenseRequest {
    expenseName: string;
    amount: number;
    category: ExpenseCategory;
    description: string;
    expenseDate: string;
}

export interface ExpenseResponse {
    id: number;
    expenseName: string;
    amount: number;
    category: ExpenseCategory;
    description: string;
    expenseDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface DailyExpenseResponse {
    date: string;
    totalAmount: number;
    expenses: ExpenseResponse[];
}

export type ExpenseApiResponse = ApiResponse<ExpenseResponse>;
export type DailyExpenseApiResponse = ApiResponse<DailyExpenseResponse>;
export type ExpenseHistoryApiResponse = ApiResponse<DailyExpenseResponse[]>;