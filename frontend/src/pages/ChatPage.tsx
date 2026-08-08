import { useEffect, useState } from "react";
import { PanelRightClose, PanelRightOpen, X } from "lucide-react";

import AppShell from "../components/common/AppShell";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

import type { ChatHistoryItem } from "../types/chat";
import { streamChat } from "../services/chatService";
import toast from "react-hot-toast";
import {
    deleteChat,
    getChatById,
    getChatHistory,
    updateChatTitle,
} from "../services/aiService";
import { useChatStore } from "../store/chatStore";

const ChatPage = () => {
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<ChatHistoryItem[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const {
        sessions,
        currentSessionId,
        setSessions,
        addSession,
        setCurrentSession,
        updateSessionName,
        deleteSession,
    } = useChatStore();

    useEffect(() => {
        document.body.style.overflow = sidebarOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [sidebarOpen]);

    const handleAskAI = async () => {
        if (!question.trim() || loading) {
            return;
        }

        const userQuestion = question;
        const sessionIdForRequest = currentSessionId;
        const isNewChat = !sessionIdForRequest;

        setQuestion("");
        setLoading(true);

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: userQuestion,
            },
            {
                role: "assistant",
                content: "",
            },
        ]);

        try {
            await streamChat(
                {
                    question: userQuestion,
                    sessionId: sessionIdForRequest,
                },

                // Token
                (token) => {
                    setMessages((prev) => {
                        const updated = [...prev];

                        updated[updated.length - 1] = {
                            ...updated[updated.length - 1],
                            content:
                                updated[updated.length - 1].content + token,
                        };

                        return updated;
                    });
                },

                // Done
                (newSessionId) => {
                    console.log("REQUEST SESSION:", sessionIdForRequest);
                    console.log("NEW SESSION:", newSessionId);
                    console.log("IS NEW CHAT:", isNewChat);

                    setCurrentSession(newSessionId);

                    if (isNewChat) {
                        addSession({
                            sessionId: newSessionId,
                            title: userQuestion,
                        });
                    }
                },

                // Error
                (message) => {
                    toast.error(message);
                },
            );
        } catch (error) {
            toast.error("Failed to get AI response.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadChatHistory();
    }, []);

    const loadChatHistory = async () => {
        try {
            const response = await getChatHistory();

            if (response.success) {
                setSessions(response.data.sessions);
            }
        } catch (error) {
            toast.error("Failed to load chat history.");
        }
    };

    const handleRenameChat = async (sessionId: string, title: string) => {
        try {
            const response = await updateChatTitle(sessionId, { title });

            if (!response.success) return;

            updateSessionName(sessionId, title);
        } catch (error) {
            toast.error("Failed to rename chat.");
        }
    };

    const handleDeleteChat = async (deletedSessionId: string) => {
        try {
            const response = await deleteChat(deletedSessionId);

            if (!response.success) return;

            deleteSession(deletedSessionId);

            if (currentSessionId === deletedSessionId) {
                handleNewChat();
            }
        } catch (error) {
            toast.error("Failed to delete chat.");
        }
    };

    const handleSelectChat = async (selectedSessionId: string) => {
        try {
            console.log("SELECTED:", selectedSessionId);

            const response = await getChatById(selectedSessionId);

            if (!response.success) return;

            console.log("CHAT RESPONSE:", response.data);
            console.log("SESSION ID:", response.data.sessionId);

            setMessages(response.data.messages);
            setCurrentSession(response.data.sessionId);
        } catch (error) {
            toast.error("Failed to load chat.");
        }
    };

    const handleNewChat = () => {
        setCurrentSession(null);
        setMessages([]);
        setQuestion("");
        setSidebarOpen(false);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setQuestion(suggestion);
    };

    return (
        <AppShell>
            <div className="relative flex h-[calc(100vh-7rem)] overflow-hidden rounded-xl bg-slate-50">
                {/* Main */}
                <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex h-14 shrink-0 items-center justify-end px-3">
                        {!sidebarOpen && (
                            <button
                                onClick={() => setSidebarOpen(true)}
                                aria-label="Open chat history"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 active:bg-slate-200"
                            >
                                <PanelRightOpen size={20} />
                            </button>
                        )}
                    </div>

                    {/* Chat */}
                    <div className="min-h-0 flex-1 overflow-hidden">
                        <ChatWindow
                            messages={messages}
                            loading={loading}
                            onSuggestionClick={handleSuggestionClick}
                        />
                    </div>

                    {/* Input */}
                    <ChatInput
                        question={question}
                        setQuestion={setQuestion}
                        onSend={handleAskAI}
                        loading={loading}
                    />
                </div>

                <div
                    className={`hidden flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-lg transition-all duration-300 lg:flex ${
                        sidebarOpen
                            ? "w-80 ml-3 my-2 mr-2"
                            : "w-0 ml-0 border-0 shadow-none"
                    }`}
                >
                    <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-4">
                        <span className="text-sm font-semibold text-slate-700">
                            Chats
                        </span>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            aria-label="Close chat history"
                            className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 active:bg-slate-200"
                        >
                            <PanelRightClose size={18} />
                        </button>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto">
                        <ChatSidebar
                            sessions={sessions}
                            currentSessionId={currentSessionId}
                            onNewChat={handleNewChat}
                            onSelectChat={handleSelectChat}
                            onRenameChat={handleRenameChat}
                            onDeleteChat={handleDeleteChat}
                        />
                    </div>
                </div>

                {sidebarOpen && (
                    <div className="absolute inset-0 z-50 flex flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-lg lg:hidden">
                        <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 px-4">
                            <span className="text-sm font-semibold text-slate-700">
                                Chats
                            </span>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                aria-label="Close chat history"
                                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 active:bg-slate-200"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto">
                            <ChatSidebar
                                sessions={sessions}
                                currentSessionId={currentSessionId}
                                onNewChat={handleNewChat}
                                onSelectChat={handleSelectChat}
                                onRenameChat={handleRenameChat}
                                onDeleteChat={handleDeleteChat}
                            />
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
};

export default ChatPage;
