import { apiConnector } from "../api/apiConnector";
import { AUTH_API } from "../api/apiEndpoints";

import type {
    LoginRequest,
    RegisterRequest,
    LoginResponse,
} from "../types/auth";

import type { ApiResponse } from "../types/common";
import type { User } from "../types/user";

export const registerUser = async (
    request: RegisterRequest
): Promise<ApiResponse<User>> => {

    const response = await apiConnector<ApiResponse<User>>(
        "POST",
        AUTH_API.REGISTER,
        request
    );

    return response.data;
};

export const login = async (
    request: LoginRequest
): Promise<ApiResponse<LoginResponse>> => {

    const response = await apiConnector<ApiResponse<LoginResponse>>(
        "POST",
        AUTH_API.LOGIN,
        request
    );

    return response.data;
};