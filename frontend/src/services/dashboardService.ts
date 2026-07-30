import { apiConnector } from "../api/apiConnector";
import { DASHBOARD_API } from "../api/apiEndpoints";

import type { ApiResponse } from "../types/common";
import type { DashboardSummary } from "../types/dashboard";

export const getDashboardSummary = async (): Promise<ApiResponse<DashboardSummary>> => {

    const response = await apiConnector<ApiResponse<DashboardSummary>>(
        "GET",
        `${DASHBOARD_API.SUMMARY}`
    );

    return response.data;
};