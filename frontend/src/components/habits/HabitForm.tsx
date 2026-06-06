import { useState } from "react";

interface HabitFormProps {
    onAddHabit: (name: string) => void;
}

const HabitForm = ({
    onAddHabit,
}: HabitFormProps) => {
    const [habitName, setHabitName] =
        useState("");

    const handleSubmit = (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!habitName.trim()) return;

        onAddHabit(habitName);

        setHabitName("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
            <h2 className="mb-4 text-lg font-semibold">
                Create Habit
            </h2>

            <div className="flex flex-col gap-4 md:flex-row">
                <input
                    type="text"
                    value={habitName}
                    onChange={(e) =>
                        setHabitName(
                            e.target.value
                        )
                    }
                    placeholder="Enter habit name"
                    className="flex-1 rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                />

                <button
                    type="submit"
                    className="rounded-xl bg-teal-500 px-6 py-3 text-white hover:bg-teal-600"
                >
                    Add Habit
                </button>
            </div>
        </form>
    );
};

export default HabitForm;