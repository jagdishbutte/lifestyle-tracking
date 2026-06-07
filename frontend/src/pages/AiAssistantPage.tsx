import { useState } from "react";

import AppShell from "../components/common/AppShell";

import { aiAssistantData } from "../data/aiAssistant";

const AIAssistantPage = () => {
    const [question, setQuestion] =
        useState("");

    const [messages, setMessages] =
        useState(aiAssistantData.chatHistory);

    const handleAskAI = () => {
        if (!question.trim()) return;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                message: question,
            },
            {
                role: "assistant",
                message:
                    "This response is currently generated from dummy data. AI integration will be connected through Spring Boot later.",
            },
        ]);

        setQuestion("");
    };

    return (
        <AppShell>
            <div>
                <div>
                    <h1 className="text-3xl font-bold">
                        AI Lifestyle Coach
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Personalized insights and recommendations
                        powered by your lifestyle data.
                    </p>
                </div>

                {/* Today's Insight */}

                <div className="mt-6 rounded-2xl border border-teal-200 bg-teal-50 p-6">
                    <h2 className="text-xl font-semibold text-teal-700">
                        Today's Insight
                    </h2>

                    <p className="mt-3 text-slate-700">
                        {aiAssistantData.todaysInsight}
                    </p>
                </div>

                {/* Recommendations */}

                <div className="mt-6">
                    <h2 className="mb-4 text-xl font-semibold">
                        AI Recommendations
                    </h2>

                    <div className="grid gap-4 md:grid-cols-3">
                        {aiAssistantData.recommendations.map(
                            (item) => (
                                <div
                                    key={item.title}
                                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                                >
                                    <h3 className="font-semibold">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm text-slate-600">
                                        {item.description}
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Ask AI */}

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold">
                        Ask AI
                    </h2>

                    <div className="max-h-[300px] space-y-3 overflow-y-auto">
                        {messages.map(
                            (message, index) => (
                                <div
                                    key={index}
                                    className={`rounded-xl p-3 ${
                                        message.role === "user"
                                            ? "bg-teal-100"
                                            : "bg-slate-100"
                                    }`}
                                >
                                    {message.message}
                                </div>
                            )
                        )}
                    </div>

                    <div className="mt-4 flex gap-3">
                        <input
                            type="text"
                            value={question}
                            onChange={(e) =>
                                setQuestion(
                                    e.target.value
                                )
                            }
                            placeholder="Ask about your habits, expenses, goals..."
                            className="flex-1 rounded-xl border border-slate-300 px-4 py-3"
                        />

                        <button
                            onClick={handleAskAI}
                            className="rounded-xl bg-teal-500 px-5 py-3 text-white hover:bg-teal-600"
                        >
                            Ask
                        </button>
                    </div>
                </div>

                {/* Weekly Summary */}

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold">
                        Weekly Summary
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <p className="text-sm text-slate-500">
                                Habit Score
                            </p>

                            <p className="mt-1 text-xl font-semibold">
                                {
                                    aiAssistantData.weeklySummary
                                        .habitScore
                                }
                                %
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Expenses
                            </p>

                            <p className="mt-1 text-xl font-semibold">
                                ₹
                                {
                                    aiAssistantData.weeklySummary
                                        .expenses
                                }
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Mood
                            </p>

                            <p className="mt-1 text-xl font-semibold">
                                {
                                    aiAssistantData.weeklySummary
                                        .mood
                                }
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Goal Completion
                            </p>

                            <p className="mt-1 text-xl font-semibold">
                                {
                                    aiAssistantData.weeklySummary
                                        .goalCompletion
                                }
                                %
                            </p>
                        </div>
                    </div>
                </div>

                {/* Suggested Actions */}

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold">
                        Suggested Actions
                    </h2>

                    <div className="space-y-3">
                        {aiAssistantData.suggestedActions.map(
                            (action) => (
                                <div
                                    key={action}
                                    className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                                >
                                    <input
                                        type="checkbox"
                                    />

                                    <span>{action}</span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
};

export default AIAssistantPage;