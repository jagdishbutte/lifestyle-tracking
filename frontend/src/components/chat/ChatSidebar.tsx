type ChatSidebarProps = {
    onNewChat: () => void;
};

const ChatSidebar = ({ onNewChat }: ChatSidebarProps) => {
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
                    <button className="w-full rounded-xl px-3 py-3 text-left text-slate-700 transition hover:bg-slate-100">
                        How healthy am I this week?
                    </button>

                    <button className="w-full rounded-xl px-3 py-3 text-left text-slate-700 transition hover:bg-slate-100">
                        Analyze my expenses
                    </button>

                    <button className="w-full rounded-xl px-3 py-3 text-left text-slate-700 transition hover:bg-slate-100">
                        Improve my sleep
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatSidebar;
