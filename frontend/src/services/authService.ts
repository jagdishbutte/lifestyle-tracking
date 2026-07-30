import { apiConnector } from "../api/apiConnector";
import { AUTH_API } from "../api/apiEndpoints";

import type {
    LoginRequest,
    RegisterRequest,
    LoginResponse,
} from "../types/auth";

import type { ApiResponse } from "../types/common";
import type { UserResponse } from "../types/profile";

export const registerUser = async (
    request: RegisterRequest
): Promise<ApiResponse<UserResponse>> => {

    const response = await apiConnector<ApiResponse<UserResponse>>(
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