type Message = {
    role: "user" | "assistant";
    content: string;
};

type ChatWindowProps = {
    messages: Message[];
    loading: boolean;
    onSuggestionClick: (question: string) => void;
};

const suggestions = [
    "Analyze my eating habits",
    "How healthy am I this week?",
    "Summarize my expenses",
    "Suggest better daily habits",
];

const ChatWindow = ({
    messages,
    loading,
    onSuggestionClick,
}: ChatWindowProps) => {
    if (messages.length === 0) {
        return (
            <div className="flex h-full flex-col items-center justify-center px-4 sm:px-8">
                <h1 className="mb-2 text-center text-2xl font-bold text-slate-800 sm:mb-3 sm:text-3xl">
                    Lifestyle AI Coach
                </h1>

                <p className="mb-6 max-w-xl text-center text-sm text-slate-500 sm:mb-10 sm:text-base">
                    Ask anything about your habits, food, expenses, journals or
                    daily check-ins.
                </p>

                <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                    {suggestions.map((suggestion) => (
                        <button
                            key={suggestion}
                            onClick={() => onSuggestionClick(suggestion)}
                            className="rounded-2xl border border-slate-200 bg-white p-4 text-left text-sm text-slate-700 transition hover:border-teal-400 hover:bg-teal-50 active:bg-teal-100 sm:p-5 sm:text-base"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto px-3 py-4 sm:px-8 sm:py-6">
            <div className="mx-auto max-w-4xl space-y-4 sm:space-y-5">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            message.role === "user"
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >
                        <div
                            className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm sm:max-w-2xl sm:px-5 sm:py-3 sm:text-base ${
                                message.role === "user"
                                    ? "bg-teal-500 text-white"
                                    : "border border-slate-200 bg-white"
                            }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start">
                        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-500 sm:px-5 sm:py-3 sm:text-base">
                            Thinking...
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatWindow;
