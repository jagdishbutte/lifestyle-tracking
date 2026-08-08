import { SendHorizontal } from "lucide-react";

type ChatInputProps = {
    question: string;
    setQuestion: (value: string) => void;
    onSend: () => void;
    loading: boolean;
};

const ChatInput = ({
    question,
    setQuestion,
    onSend,
    loading,
}: ChatInputProps) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (
            event.key === "Enter" &&
            !event.shiftKey &&
            question.trim() &&
            !loading
        ) {
            event.preventDefault();
            onSend();
        }
    };

    return (
        <div className="shrink-0 bg-slate-50 px-4 py-4">
            <div
                className={`mx-auto flex w-full max-w-4xl items-center gap-2 rounded-2xl border bg-white px-3 py-2 shadow-sm transition sm:gap-3 sm:px-4 sm:py-3 ${
                    question.trim()
                        ? "border-teal-500 ring-2 ring-teal-100"
                        : "border-slate-300 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100"
                }`}
            >
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about your habits, food, expenses..."
                    className="min-w-0 flex-1 bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400 placeholder:truncate"
                />

                <button
                    onClick={onSend}
                    disabled={loading || !question.trim()}
                    aria-label="Send message"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white transition hover:bg-teal-600 active:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10"
                >
                    <SendHorizontal size={18} />
                </button>
            </div>
        </div>
    );
};

export default ChatInput;
