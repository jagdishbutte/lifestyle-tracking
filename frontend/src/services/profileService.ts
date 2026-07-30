import { apiConnector } from "../api/apiConnector";
import { PROFILE_API } from "../api/apiEndpoints";

import type { ApiResponse } from "../types/common";

import type { UserResponse, UpdateProfileRequest } from "../types/profile";

export const getProfile = async () => {
    const response = await apiConnector<ApiResponse<UserResponse>>(
        "GET",
        `${PROFILE_API.BASE}`,
    );

    return response.data;
};

export const updateProfile = async (
    request: UpdateProfileRequest,
) => {
    const response = await apiConnector<ApiResponse<UserResponse>>(
        "PUT",
        `${PROFILE_API.BASE}/profile`,
        request,
    );

    return response.data;
};
