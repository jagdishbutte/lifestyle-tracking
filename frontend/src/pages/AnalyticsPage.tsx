import { useState } from "react";

import {
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

import AppShell from "../components/common/AppShell";

import { analyticsData } from "../data/analytics";
import StatCard from "../components/common/StatCard";

const AnalyticsPage = () => {
    const [selectedMonth, setSelectedMonth] = useState(
        new Date().toISOString().slice(0, 7),
    );

    const pieColors = ["#14B8A6", "#22C55E", "#F59E0B", "#3B82F6"];

    return (
        <AppShell>
            <div>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Analytics</h1>

                        <p className="mt-2 text-slate-600">
                            Understand your lifestyle through data and insights.
                        </p>
                    </div>

                    <div className="rounded-2xl">
                        <input
                            type="month"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="rounded-xl border border-slate-300 px-4 py-2"
                        />
                    </div>
                </div>

                {/* Summary Cards */}

                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Habit Score"
                        value={`${analyticsData.summary.habitScore}%`}
                    />

                    <StatCard
                        title="Expenses"
                        value={`₹${analyticsData.summary.expenses}`}
                    />

                    <StatCard
                        title="Goal Completion"
                        value={`${analyticsData.summary.goalCompletion}%`}
                    />

                    <StatCard
                        title="Journal Entries"
                        value={analyticsData.summary.journalEntries}
                    />
                </div>

                {/* Habit Trend */}

                <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-xl font-semibold">Habit Trend</h2>

                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={analyticsData.habitTrend}>
                                <XAxis dataKey="day" />

                                <YAxis />

                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#14B8A6"
                                    strokeWidth={3}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Charts */}

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    {/* Expense Breakdown */}

                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-semibold">
                            Expense Breakdown
                        </h2>

                        <div className="h-[300px]">
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={analyticsData.expenseCategories}
                                        dataKey="amount"
                                        nameKey="category"
                                        outerRadius={100}
                                    >
                                        {analyticsData.expenseCategories.map(
                                            (_, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={
                                                        pieColors[
                                                            index %
                                                                pieColors.length
                                                        ]
                                                    }
                                                />
                                            ),
                                        )}
                                    </Pie>

                                    <Tooltip />

                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Mood Distribution */}

                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-semibold">
                            Mood Distribution
                        </h2>

                        <div className="h-[300px]">
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={analyticsData.moodDistribution}
                                        dataKey="count"
                                        nameKey="mood"
                                        outerRadius={100}
                                    >
                                        {analyticsData.moodDistribution.map(
                                            (_, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={
                                                        pieColors[
                                                            index %
                                                                pieColors.length
                                                        ]
                                                    }
                                                />
                                            ),
                                        )}
                                    </Pie>

                                    <Tooltip />

                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Goal Progress */}

                <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-xl font-semibold">
                        Goal Progress
                    </h2>

                    <div className="space-y-6">
                        {analyticsData.goals.map((goal) => {
                            const progress = Math.min(
                                (goal.current / goal.target) * 100,
                                100,
                            );

                            return (
                                <div key={goal.title}>
                                    <div className="mb-2 flex justify-between">
                                        <span>{goal.title}</span>

                                        <span>
                                            {goal.current}/{goal.target}
                                            {goal.unit}
                                        </span>
                                    </div>

                                    <div className="h-4 rounded-full bg-slate-200">
                                        <div
                                            className="h-4 rounded-full bg-teal-500"
                                            style={{
                                                width: `${progress}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* AI Insights */}

                <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-xl font-semibold">AI Insights</h2>

                    <div className="space-y-3">
                        {analyticsData.insights.map((insight, index) => (
                            <div
                                key={index}
                                className="rounded-xl bg-teal-50 p-4"
                            >
                                {insight}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppShell>
    );
};

export default AnalyticsPage;
