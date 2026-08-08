import { useLayoutEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

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
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const chatContainer = chatContainerRef.current;

        if (!chatContainer) return;

        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [messages, loading]);

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

                <div className="grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
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

    const lastMessage = messages[messages.length - 1];

    const isWaitingForFirstToken =
        loading &&
        lastMessage?.role === "assistant" &&
        !lastMessage.content.trim();

    return (
        <div
            ref={chatContainerRef}
            className="h-full overflow-y-auto px-3 py-4 sm:px-8 sm:py-6"
        >
            <div className="mx-auto w-full max-w-4xl space-y-4 sm:space-y-5">
                {messages.map((message, index) => {
                    if (message.role === "assistant" && !message.content.trim())
                        return null;

                    return (
                        <div
                            key={index}
                            className={`flex w-full ${
                                message.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`break-words rounded-2xl px-4 py-3 text-sm sm:px-5 sm:text-base ${
                                    message.role === "user"
                                        ? "max-w-[85%] whitespace-pre-wrap bg-teal-500 text-white"
                                        : "w-full border border-slate-200 bg-white text-slate-700"
                                }`}
                            >
                                {message.role === "assistant" ? (
                                    <div className="leading-7 text-slate-700">
                                        <ReactMarkdown
                                            remarkPlugins={[
                                                remarkGfm,
                                                remarkBreaks,
                                            ]}
                                            components={{
                                                h1: ({ children }) => (
                                                    <h1 className="mb-3 mt-5 text-2xl font-bold text-slate-800">
                                                        {children}
                                                    </h1>
                                                ),
                                                h2: ({ children }) => (
                                                    <h2 className="mb-2 mt-4 text-xl font-bold text-slate-800">
                                                        {children}
                                                    </h2>
                                                ),
                                                h3: ({ children }) => (
                                                    <h3 className="mb-2 mt-4 text-lg font-semibold text-slate-800">
                                                        {children}
                                                    </h3>
                                                ),
                                                p: ({ children }) => (
                                                    <p className="mb-3 last:mb-0">
                                                        {children}
                                                    </p>
                                                ),
                                                ul: ({ children }) => (
                                                    <ul className="mb-3 list-disc space-y-1 pl-6">
                                                        {children}
                                                    </ul>
                                                ),
                                                ol: ({ children }) => (
                                                    <ol className="mb-3 list-decimal space-y-1 pl-6">
                                                        {children}
                                                    </ol>
                                                ),
                                                blockquote: ({ children }) => (
                                                    <blockquote className="my-3 border-l-4 border-teal-400 pl-4 italic text-slate-600">
                                                        {children}
                                                    </blockquote>
                                                ),
                                                pre: ({ children }) => (
                                                    <pre className="my-3 overflow-x-auto rounded-lg bg-slate-800 p-4 text-sm text-slate-100">
                                                        {children}
                                                    </pre>
                                                ),
                                                code: ({ children }) => (
                                                    <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-sm text-pink-600">
                                                        {children}
                                                    </code>
                                                ),
                                                table: ({ children }) => (
                                                    <div className="my-4 overflow-x-auto">
                                                        <table className="w-full border-collapse border border-slate-200 text-left text-sm">
                                                            {children}
                                                        </table>
                                                    </div>
                                                ),
                                                th: ({ children }) => (
                                                    <th className="border border-slate-200 bg-slate-100 px-3 py-2 font-semibold">
                                                        {children}
                                                    </th>
                                                ),
                                                td: ({ children }) => (
                                                    <td className="border border-slate-200 px-3 py-2">
                                                        {children}
                                                    </td>
                                                ),
                                                a: ({ children, href }) => (
                                                    <a
                                                        href={href}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-teal-600 underline hover:text-teal-700"
                                                    >
                                                        {children}
                                                    </a>
                                                ),
                                            }}
                                        >
                                            {message.content}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    message.content
                                )}
                            </div>
                        </div>
                    );
                })}

                {isWaitingForFirstToken && (
                    <div className="flex w-full justify-start">
                        <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-500 sm:px-5 sm:text-base">
                            Thinking...
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatWindow;
