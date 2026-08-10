import { apiConnector } from "../api/apiConnector";
import { CHAT_API, INSIGHTS_API } from "../api/apiEndpoints";

import type { ApiResponse } from "../types/common";

import type {
    ChatHistory,
    ChatSessionsList,
    UpdateChatTitleRequest,
    // ChatRequest,
} from "../types/chat";
import type { WeeklyInsightsResponse } from "../types/insights";

export const getChatHistory = async (): Promise<
    ApiResponse<ChatSessionsList>
> => {

    const response =
        await apiConnector<ApiResponse<ChatSessionsList>>(
            "GET",
            CHAT_API.HISTORY
        );

    response.data.data.sessions = response.data.data.sessions.map(
        (session: any) => ({
            sessionId: session.session_id,
            title: session.title,
        })
    );

    return response.data;
};

export const getChatById = async (
    sessionId: string
): Promise<ApiResponse<ChatHistory>> => {
    const response =
        await apiConnector<ApiResponse<ChatHistory>>(
            "GET",
            CHAT_API.HISTORY_BY_ID(sessionId)
        );

    const data = response.data.data as ChatHistory & {
        session_id: string;
    };

    response.data.data = {
        ...data,
        sessionId: data.session_id,
    };

    return response.data;
};

export const updateChatTitle = async (
    sessionId: string,
    request: UpdateChatTitleRequest
): Promise<ApiResponse<string>> => {

    const response =
        await apiConnector<ApiResponse<string>>(
            "PUT",
            CHAT_API.UPDATE_TITLE(sessionId),
            request
        );

    return response.data;
};

export const deleteChat = async (
    sessionId: string
): Promise<ApiResponse<string>> => {

    const response =
        await apiConnector<ApiResponse<string>>(
            "DELETE",
            CHAT_API.DELETE(sessionId)
        );

    return response.data;
};

export const refreshInsights = async (): Promise<ApiResponse<string>> => {

    const response =
        await apiConnector<ApiResponse<string>>(
            "POST",
            INSIGHTS_API.REFRESH
        );

    return response.data;
};

export const getLatestInsights = async (): Promise<ApiResponse<WeeklyInsightsResponse>> => {

    const response =
        await apiConnector<ApiResponse<WeeklyInsightsResponse>>(
            "GET",
            INSIGHTS_API.LATEST
        );

    return response.data;
};