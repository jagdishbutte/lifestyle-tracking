import { AxiosError } from "axios";
import type { ApiErrorResponse } from "../types/common";

export const getErrorMessage = (error: unknown): string => {

    if (error instanceof AxiosError) {

        const apiError = error.response?.data as ApiErrorResponse;

        return apiError?.message || "Something went wrong.";
    }

    return "Something went wrong.";
};