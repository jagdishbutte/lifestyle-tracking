import { create } from "zustand";
import type { ChatSession } from "../types/chat";

interface ChatStore {
    sessions: ChatSession[];
    currentSessionId: string | null;

    setSessions: (sessions: ChatSession[]) => void;

    setCurrentSession: (sessionId: string | null) => void;

    updateSessionName: (
        sessionId: string,
        title: string
    ) => void;

    deleteSession: (
        sessionId: string
    ) => void;

    addSession: (session: ChatSession) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
    sessions: [],
    currentSessionId: null,

    setSessions: (sessions) =>
        set({
            sessions,
        }),

    setCurrentSession: (sessionId) =>
        set({
            currentSessionId: sessionId,
        }),

    updateSessionName: (sessionId, title) =>
        set((state) => ({
            sessions: state.sessions.map((session) =>
                session.sessionId === sessionId
                    ? {
                          ...session,
                          title,
                      }
                    : session
            ),
        })),

    deleteSession: (sessionId) =>
        set((state) => ({
            sessions: state.sessions.filter(
                (session) => session.sessionId !== sessionId
            ),

            currentSessionId:
                state.currentSessionId === sessionId
                    ? null
                    : state.currentSessionId,
        })),

    addSession: (session) =>
        set((state) => ({
            sessions: [session, ...state.sessions],
        })),
}));