import ChatHistoryItem from "./ChatHistoryItem";

import type { ChatSession } from "../../types/chat";

type ChatSidebarProps = {
    sessions: ChatSession[];
    currentSessionId: string | null;

    onNewChat: () => void;
    onSelectChat: (sessionId: string) => void;
    onRenameChat: (sessionId: string, title: string) => Promise<void>;
    onDeleteChat: (sessionId: string) => Promise<void>;
};

const ChatSidebar = ({
    sessions,
    currentSessionId,
    onNewChat,
    onSelectChat,
    onRenameChat,
    onDeleteChat,
}: ChatSidebarProps) => {
    // console.log(sessions)
    return (
        <div className="flex h-full w-full flex-col bg-white">
            {/* Header */}
            <div className="border-b border-slate-200 p-4">
                <button
                    onClick={onNewChat}
                    className="w-full rounded-xl bg-teal-500 px-4 py-3 font-medium text-white transition hover:bg-teal-600"
                >
                    + New Chat
                </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-3">
                <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Recent Chats
                </p>

                <div className="space-y-2">
                    {sessions?.length === 0 ? (
                        <p className="px-2 py-4 text-sm text-slate-400">
                            No conversations yet
                        </p>
                    ) : (
                        sessions?.map((session) => (
                            <ChatHistoryItem
                                key={session.sessionId}
                                sessionId={session.sessionId}
                                title={session.title}
                                active={currentSessionId === session.sessionId}
                                onClick={() => onSelectChat(session.sessionId)}
                                onRename={onRenameChat}
                                onDelete={onDeleteChat}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatSidebar;
