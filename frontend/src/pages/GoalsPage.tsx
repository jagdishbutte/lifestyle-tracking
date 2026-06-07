import { useMemo, useState } from "react";

import AppShell from "../components/common/AppShell";
import GoalModal from "../components/goals/GoalModal";

import {
    goalCategories,
    initialGoals,
} from "../data/goals";

import { type Goal } from "../types/goal.types";

const GoalsPage = () => {
    const [goals, setGoals] =
        useState(initialGoals);

    const [selectedCategory,
        setSelectedCategory] =
        useState("All");

    const [showModal, setShowModal] =
        useState(false);

    const [editingGoal, setEditingGoal] =
        useState<Goal | null>(null);

    const filteredGoals =
        useMemo(() => {
            if (
                selectedCategory === "All"
            ) {
                return goals;
            }

            return goals.filter(
                (goal) =>
                    goal.category ===
                    selectedCategory
            );
        }, [
            goals,
            selectedCategory,
        ]);

    const saveGoal = (
        goalData: Omit<Goal, "id">
    ) => {
        if (editingGoal) {
            setGoals((prev) =>
                prev.map((goal) =>
                    goal.id ===
                    editingGoal.id
                        ? {
                              ...goal,
                              ...goalData,
                          }
                        : goal
                )
            );

            setEditingGoal(null);

            return;
        }

        setGoals((prev) => [
            {
                id: Date.now(),
                ...goalData,
            },
            ...prev,
        ]);
    };

    const deleteGoal = (
        id: number
    ) => {
        const confirmed =
            window.confirm(
                "Delete this goal?"
            );

        if (!confirmed) return;

        setGoals((prev) =>
            prev.filter(
                (goal) =>
                    goal.id !== id
            )
        );
    };

    const completedGoals =
        goals.filter(
            (goal) =>
                goal.currentValue >=
                goal.targetValue
        ).length;

    const averageProgress =
        goals.length === 0
            ? 0
            : Math.round(
                  goals.reduce(
                      (
                          sum,
                          goal
                      ) =>
                          sum +
                          Math.min(
                              (goal.currentValue /
                                  goal.targetValue) *
                                  100,
                              100
                          ),
                      0
                  ) / goals.length
              );

    return (
        <AppShell>
            <div>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Goals
                        </h1>

                        <p className="mt-2 text-slate-600">
                            Track your long
                            term progress.
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            setShowModal(
                                true
                            )
                        }
                        className="rounded-xl bg-teal-500 px-5 py-3 text-white"
                    >
                        + New Goal
                    </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border bg-white p-6">
                        <p>Total Goals</p>
                        <h2 className="mt-2 text-3xl font-bold">
                            {goals.length}
                        </h2>
                    </div>

                    <div className="rounded-2xl border bg-white p-6">
                        <p>
                            Completed
                        </p>
                        <h2 className="mt-2 text-3xl font-bold">
                            {
                                completedGoals
                            }
                        </h2>
                    </div>

                    <div className="rounded-2xl border bg-white p-6">
                        <p>
                            Avg Progress
                        </p>
                        <h2 className="mt-2 text-3xl font-bold">
                            {
                                averageProgress
                            }
                            %
                        </h2>
                    </div>
                </div>

                <div className="mt-6">
                    <select
                        value={
                            selectedCategory
                        }
                        onChange={(e) =>
                            setSelectedCategory(
                                e.target.value
                            )
                        }
                        className="rounded-xl border px-4 py-3"
                    >
                        <option value="All">
                            All Categories
                        </option>

                        {goalCategories.map(
                            (
                                category
                            ) => (
                                <option
                                    key={
                                        category
                                    }
                                    value={
                                        category
                                    }
                                >
                                    {
                                        category
                                    }
                                </option>
                            )
                        )}
                    </select>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {filteredGoals.map(
                        (goal) => {
                            const progress =
                                Math.min(
                                    (goal.currentValue /
                                        goal.targetValue) *
                                        100,
                                    100
                                );

                            return (
                                <div
                                    key={
                                        goal.id
                                    }
                                    className="rounded-2xl border bg-white p-6 shadow-sm"
                                >
                                    <div className="flex justify-between">
                                        <h2 className="font-semibold">
                                            {
                                                goal.title
                                            }
                                        </h2>

                                        <span className="text-sm text-slate-500">
                                            {
                                                goal.category
                                            }
                                        </span>
                                    </div>

                                    <p className="mt-4">
                                        {
                                            goal.currentValue
                                        }{" "}
                                        /
                                        {" "}
                                        {
                                            goal.targetValue
                                        }{" "}
                                        {
                                            goal.unit
                                        }
                                    </p>

                                    <div className="mt-3 h-3 rounded-full bg-slate-200">
                                        <div
                                            className="h-3 rounded-full bg-teal-500"
                                            style={{
                                                width: `${progress}%`,
                                            }}
                                        />
                                    </div>

                                    <p className="mt-2 text-sm text-slate-500">
                                        Target:{" "}
                                        {
                                            goal.targetDate
                                        }
                                    </p>

                                    <div className="mt-4 flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingGoal(
                                                    goal
                                                );

                                                setShowModal(
                                                    true
                                                );
                                            }}
                                            className="rounded-lg bg-amber-100 px-3 py-1 text-amber-700"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                deleteGoal(
                                                    goal.id
                                                )
                                            }
                                            className="rounded-lg bg-red-100 px-3 py-1 text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>

                <GoalModal
                    isOpen={
                        showModal
                    }
                    goal={
                        editingGoal
                    }
                    onClose={() => {
                        setShowModal(
                            false
                        );

                        setEditingGoal(
                            null
                        );
                    }}
                    onSave={saveGoal}
                />
            </div>
        </AppShell>
    );
};

export default GoalsPage;