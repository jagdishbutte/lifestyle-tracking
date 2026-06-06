import { useState } from "react";

import { todayHabits } from "../../data/dashboard";
import type { Habit } from "../../types/dashboard.types";

const HabitTrackerCard = () => {
    const [habits, setHabits] =
        useState<Habit[]>(todayHabits);

    const toggleHabit = (id: number) => {
        setHabits((prev) =>
            prev.map((habit) =>
                habit.id === id
                    ? {
                          ...habit,
                          completed: !habit.completed,
                      }
                    : habit
            )
        );
    };

    const completedCount = habits.filter(
        (habit) => habit.completed
    ).length;

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    Today's Habits
                </h2>

                <span className="rounded-full bg-teal-100 px-3 py-1 text-sm text-teal-700">
                    {completedCount}/{habits.length}
                </span>
            </div>

            <div className="mt-6 space-y-3">
                {habits.map((habit) => (
                    <button
                        key={habit.id}
                        onClick={() =>
                            toggleHabit(habit.id)
                        }
                        className={`
                            flex w-full items-center justify-between rounded-xl border px-4 py-3 transition

                            ${
                                habit.completed
                                    ? "border-teal-200 bg-teal-50"
                                    : "border-slate-200 hover:bg-slate-50"
                            }
                        `}
                    >
                        <span>{habit.name}</span>

                        <span className="text-xl">
                            {habit.completed
                                ? "✅"
                                : "⬜"}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HabitTrackerCard;