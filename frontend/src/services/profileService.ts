import { apiConnector } from "../api/apiConnector";
import { PROFILE_API } from "../api/apiEndpoints";

import type { ApiResponse } from "../types/common";

import type { UserResponse, UpdateProfileRequest } from "../types/profile";

export const getProfile = async (userId: number) => {
    const response = await apiConnector<ApiResponse<UserResponse>>(
        "GET",
        `${PROFILE_API.BASE}/${userId}`,
    );

    return response.data;
};

export const updateProfile = async (
    userId: number,
    request: UpdateProfileRequest,
) => {
    const response = await apiConnector<ApiResponse<UserResponse>>(
        "PUT",
        `${PROFILE_API.BASE}/${userId}/profile`,
        request,
    );

    return response.data;
};
