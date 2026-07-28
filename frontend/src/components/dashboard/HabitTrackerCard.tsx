import { useEffect, useState } from "react";

import type { HabitItem, HabitLogRequest } from "../../types/habit";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/errorHandler";
import {
    getActiveHabits,
    getTodayHabitLogs,
    updateHabitCompletion,
} from "../../services/habitService";
import { useNavigate } from "react-router-dom";

const HabitTrackerCard = () => {
    const userId = 6;
    const [habits, setHabits] = useState<HabitItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadHabits = async () => {
            try {
                const [habitsResponse, habitLogsResponse] = await Promise.all([
                    getActiveHabits(userId),
                    getTodayHabitLogs(userId),
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
            userId,
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

                toast.success(response.message);
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const completedCount = 0;

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
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Today's Habits</h2>

                    <p className="mt-1 text-sm text-slate-500">
                        {completedCount}/{habits.length} completed
                    </p>
                </div>

                <button
                    className="rounded-lg border border-teal-500 px-3 py-2 text-sm text-teal-600 hover:bg-teal-50"
                    onClick={() => navigate("/habits")}
                >
                    Manage
                </button>
            </div>

            <div className="mt-6 max-h-80 space-y-3 overflow-y-auto pr-2">
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
                            className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-slate-100"
                        >
                            {habit.completed ? (
                                <span className="text-2xl text-teal-600">
                                    ✅
                                </span>
                            ) : (
                                <span className="text-2xl text-slate-300">
                                    ⬜
                                </span>
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HabitTrackerCard;
