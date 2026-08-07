export interface ChatHistoryItem {
    role: "user" | "assistant";
    content: string;
}

export interface ChatHistory {
    sessionId: string;
    title: string;
    messages: ChatHistoryItem[];
}

export interface ChatSession {
    sessionId: string;
    title: string;
}

export interface ChatSessionsList {
    sessions: ChatSession[];
}

export interface ChatRequest {
    question: string;
    sessionId: string | null;
}

export interface UpdateChatTitleRequest {
    title: string;
}