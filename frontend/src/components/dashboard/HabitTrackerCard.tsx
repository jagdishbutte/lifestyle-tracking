import { useEffect, useState } from "react";
import { Target } from "lucide-react";

import type { HabitItem, HabitLogRequest } from "../../types/habit";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/errorHandler";
import {
    getActiveHabits,
    getTodayHabitLogs,
    updateHabitCompletion,
} from "../../services/habitService";
import { useNavigate } from "react-router-dom";
import { useDashboardStore } from "../../store/dashboardStore";
import { useInsightStore } from "../../store/insightStore";

interface HabitTrackerCardProps {
    completedHabits: number;
    totalHabits: number;
}

const HabitTrackerCard = ({
    completedHabits,
    totalHabits,
}: HabitTrackerCardProps) => {
    const [habits, setHabits] = useState<HabitItem[]>([]);
    const navigate = useNavigate();
    const { triggerRefresh } = useDashboardStore();
    const { insights, insightsLoading } = useInsightStore();

    useEffect(() => {
        const loadHabits = async () => {
            try {
                const [habitsResponse, habitLogsResponse] = await Promise.all([
                    getActiveHabits(),
                    getTodayHabitLogs(),
                ]);

                if (habitsResponse.success && habitLogsResponse.success) {
                    const completedHabitIds = new Set(
                        habitLogsResponse.data
                            .filter((log) => log.completed)
                            .map((log) => log.habitId),
                    );

                    const mergedHabits: HabitItem[] = habitsResponse.data.map(
                        (habit) => ({
                            ...habit,
                            completed: completedHabitIds.has(habit.id),
                        }),
                    );
                    setHabits(mergedHabits);
                }
            } catch (error) {
                toast.error(getErrorMessage(error));
            }
        };

        loadHabits();
    }, []);

    const toggleHabit = async (habit: HabitItem) => {
        const request: HabitLogRequest = {
            habitId: habit.id,
            completed: !habit.completed,
        };

        try {
            const response = await updateHabitCompletion(request);

            if (response.success) {
                setHabits((prev) =>
                    prev.map((h) =>
                        h.id === habit.id
                            ? {
                                  ...h,
                                  completed: response.data.completed,
                              }
                            : h,
                    ),
                );
                triggerRefresh();
                toast.success(response.message);
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    if (habits.length === 0) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Today's Habits</h2>

                    <button className="text-sm text-teal-600">Manage</button>
                </div>

                <p className="mt-8 text-center text-slate-500">
                    No active habits found.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="overflow-hidden rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 via-white to-cyan-50 shadow-[0_4px_20px_rgba(20,184,166,0.08)]">
                <div className="flex items-start gap-3 border-l-4 border-teal-500 px-4 py-3">
                    <span className="mt-0.5 shrink-0 text-xl text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.9)]">
                        ✨
                    </span>

                    {insightsLoading ? (
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-full animate-pulse rounded-md bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
                            <div className="h-4 w-5/6 animate-pulse rounded-md bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
                        </div>
                    ) : (
                        <p className="text-md leading-6 tracking-tight text-slate-800">
                            {insights?.insights.habits ??
                                "No insights available yet. Keep logging your activities consistently to unlock personalized AI insights."}
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-indigo-100 p-3">
                        <Target size={22} className="text-indigo-600" />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">
                            Today's Habits
                        </h2>

                        <p className="text-sm text-slate-500">
                            {completedHabits}/{totalHabits} completed
                        </p>
                    </div>
                </div>

                <button
                    className="rounded-lg border border-teal-500 px-3 py-2 text-sm text-teal-600 transition hover:bg-teal-50"
                    onClick={() => navigate("/habits")}
                >
                    Manage
                </button>
            </div>

            <div className="mt-6 max-h-100 space-y-3 overflow-y-auto pr-2">
                {habits.map((habit) => (
                    <div
                        key={habit.id}
                        className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50"
                    >
                        <div className="text-left">
                            <p className="font-medium">{habit.name}</p>

                            <div className="mt-1 flex items-center gap-2 text-xs">
                                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">
                                    {habit.category}
                                </span>

                                <span className="rounded-full bg-teal-50 px-2 py-0.5 text-teal-700">
                                    {habit.frequency}
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => toggleHabit(habit)}
                            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300
                            ${habit.completed ? "bg-teal-500" : "bg-slate-300"}`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-300
                                ${habit.completed ? "translate-x-6" : "translate-x-1"}`}
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HabitTrackerCard;
