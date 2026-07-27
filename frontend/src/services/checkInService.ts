import { apiConnector } from "../api/apiConnector";
import { CHECKIN_API } from "../api/apiEndpoints";

import type { ApiResponse } from "../types/common";
import type {
    DailyCheckInRequest,
    DailyCheckInResponse,
} from "../types/checkin";

export const getTodayCheckIn = async (
    userId: number
): Promise<ApiResponse<DailyCheckInResponse>> => {

    const response = await apiConnector<ApiResponse<DailyCheckInResponse>>(
        "GET",
        `${CHECKIN_API.TODAY}/${userId}`
    );

    return response.data;
};

export const saveTodayCheckIn = async (
    request: DailyCheckInRequest
): Promise<ApiResponse<DailyCheckInResponse>> => {

    const response = await apiConnector<ApiResponse<DailyCheckInResponse>>(
        "POST",
        CHECKIN_API.SAVE,
        request
    );

    return response.data;
};