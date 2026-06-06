import { useState } from "react";

import AppShell from "../components/common/AppShell";

import HabitCard from "../components/habits/HabitCard";
import HabitForm from "../components/habits/HabitForm";
import HabitProgress from "../components/habits/HabitProgress";

import { habits as initialHabits } from "../data/habits";

import type { Habit } from "../types/habit.types";

const HabitsPage = () => {
    const [habits, setHabits] =
        useState<Habit[]>(initialHabits);

    const toggleHabit = (id: number) => {
        setHabits((prev) =>
            prev.map((habit) =>
                habit.id === id
                    ? {
                          ...habit,
                          completedToday:
                              !habit.completedToday,
                      }
                    : habit
            )
        );
    };

    const addHabit = (name: string) => {
        const newHabit: Habit = {
            id: Date.now(),
            name,
            streak: 0,
            completedToday: false,
        };

        setHabits((prev) => [
            newHabit,
            ...prev,
        ]);
    };

    const completed = habits.filter(
        (habit) => habit.completedToday
    ).length;

    return (
        <AppShell>
            <div>
                <h1 className="text-3xl font-bold">
                    Habits
                </h1>

                <p className="mt-2 text-slate-600">
                    Track and build consistency.
                </p>

                <div className="mt-6">
                    <HabitProgress
                        completed={completed}
                        total={habits.length}
                    />
                </div>

                <div className="mt-6">
                    <HabitForm
                        onAddHabit={addHabit}
                    />
                </div>

                <div className="mt-6 grid gap-4">
                    {habits.map((habit) => (
                        <HabitCard
                            key={habit.id}
                            habit={habit}
                            onToggle={toggleHabit}
                        />
                    ))}
                </div>
            </div>
        </AppShell>
    );
};

export default HabitsPage;