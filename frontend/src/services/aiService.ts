import { apiConnector } from "../api/apiConnector";
import { CHAT_API } from "../api/apiEndpoints";

import type { ApiResponse } from "../types/common";

import type {
    ChatHistory,
    ChatSessionsList,
    UpdateChatTitleRequest,
    // ChatRequest,
} from "../types/chat";

export const getChatHistory = async (): Promise<
    ApiResponse<ChatSessionsList>
> => {

    const response =
        await apiConnector<ApiResponse<ChatSessionsList>>(
            "GET",
            CHAT_API.HISTORY
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

// export const streamChat = (
//     request: ChatRequest,
//     onMessage: (event: MessageEvent) => void
// ) => {

//     const eventSource = new EventSource(
//         `${CHAT_API.CHAT}`
//     );

//     return eventSource;
// };