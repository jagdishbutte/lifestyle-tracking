import { useEffect, useState } from "react";

import {
    goalCategories,
} from "../../data/goals";

import { type Goal } from "../../types/goal.types";

interface Props {
    isOpen: boolean;

    goal: Goal | null;

    onClose: () => void;

    onSave: (
        goal: Omit<Goal, "id">
    ) => void;
}

const GoalModal = ({
    isOpen,
    goal,
    onClose,
    onSave,
}: Props) => {
    const [title, setTitle] =
        useState("");

    const [category, setCategory] =
        useState<Goal["category"]>(
            "Fitness"
        );

    const [targetValue, setTargetValue] =
        useState("");

    const [currentValue, setCurrentValue] =
        useState("");

    const [unit, setUnit] =
        useState("");

    const [targetDate, setTargetDate] =
        useState("");

    useEffect(() => {
        if (goal) {
            setTitle(goal.title);
            setCategory(goal.category);
            setTargetValue(
                goal.targetValue.toString()
            );
            setCurrentValue(
                goal.currentValue.toString()
            );
            setUnit(goal.unit);
            setTargetDate(
                goal.targetDate
            );
        } else {
            setTitle("");
            setCategory("Fitness");
            setTargetValue("");
            setCurrentValue("");
            setUnit("");
            setTargetDate("");
        }
    }, [goal, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        onSave({
            title,
            category,
            currentValue:
                Number(currentValue),
            targetValue:
                Number(targetValue),
            unit,
            targetDate,
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold">
                    {goal
                        ? "Edit Goal"
                        : "Create Goal"}
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        placeholder="Goal Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(
                                e.target.value
                            )
                        }
                        className="w-full rounded-xl border px-4 py-3"
                    />

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(
                                e.target
                                    .value as Goal["category"]
                            )
                        }
                        className="w-full rounded-xl border px-4 py-3"
                    >
                        {goalCategories.map(
                            (item) => (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>
                            )
                        )}
                    </select>

                    <input
                        type="number"
                        placeholder="Current Value"
                        value={currentValue}
                        onChange={(e) =>
                            setCurrentValue(
                                e.target.value
                            )
                        }
                        className="w-full rounded-xl border px-4 py-3"
                    />

                    <input
                        type="number"
                        placeholder="Target Value"
                        value={targetValue}
                        onChange={(e) =>
                            setTargetValue(
                                e.target.value
                            )
                        }
                        className="w-full rounded-xl border px-4 py-3"
                    />

                    <input
                        type="text"
                        placeholder="Unit (kg, ₹, %, books)"
                        value={unit}
                        onChange={(e) =>
                            setUnit(
                                e.target.value
                            )
                        }
                        className="w-full rounded-xl border px-4 py-3"
                    />

                    <input
                        type="date"
                        value={targetDate}
                        onChange={(e) =>
                            setTargetDate(
                                e.target.value
                            )
                        }
                        className="w-full rounded-xl border px-4 py-3"
                    />

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl border py-3"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex-1 rounded-xl bg-teal-500 py-3 text-white"
                        >
                            Save Goal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GoalModal;