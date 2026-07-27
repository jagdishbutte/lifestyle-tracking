import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createHabit, updateHabit } from "../../services/habitService";
import type { HabitRequest, HabitResponse } from "../../types/habit";
import { getErrorMessage } from "../../utils/errorHandler";

interface HabitFormModalProps {
    open: boolean;
    habit: HabitResponse | null;
    onClose: () => void;
    onSaved: () => void;
}

const categories = [
    "HEALTH",
    "FITNESS",
    "PRODUCTIVITY",
    "LEARNING",
    "MINDFULNESS",
    "FINANCE",
    "PERSONAL",
    "OTHER",
] as const;

const frequencies = ["DAILY", "WEEKLY", "MONTHLY"] as const;

const userId = 6;

const HabitFormModal = ({
    open,
    habit,
    onClose,
    onSaved,
}: HabitFormModalProps) => {
    const [formData, setFormData] = useState<HabitRequest>({
        userId,
        name: "",
        category: "HEALTH",
        frequency: "DAILY",
    });

    useEffect(() => {
        if (habit) {
            setFormData({
                userId,
                name: habit.name,
                category: habit.category,
                frequency: habit.frequency,
            });
        } else {
            setFormData({
                userId,
                name: "",
                category: "HEALTH",
                frequency: "DAILY",
            });
        }
    }, [habit]);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        try {
            const response = habit
                ? await updateHabit(habit.id, formData)
                : await createHabit(formData);

            toast.success(response.message);
            onSaved();
            onClose();
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-2xl bg-white p-6">
                <h2 className="text-xl font-semibold">
                    {habit ? "Update Habit" : "Create Habit"}
                </h2>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <input
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                        placeholder="Habit name"
                        className="w-full rounded-xl border px-4 py-3"
                        required
                    />

                    <select
                        value={formData.category}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                category: e.target
                                    .value as HabitRequest["category"],
                            })
                        }
                        className="w-full rounded-xl border px-4 py-3"
                    >
                        {categories.map((category) => (
                            <option key={category}>{category}</option>
                        ))}
                    </select>

                    <select
                        value={formData.frequency}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                frequency: e.target
                                    .value as HabitRequest["frequency"],
                            })
                        }
                        className="w-full rounded-xl border px-4 py-3"
                    >
                        {frequencies.map((frequency) => (
                            <option key={frequency}>{frequency}</option>
                        ))}
                    </select>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border px-5 py-2"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl bg-teal-500 px-5 py-2 text-white hover:bg-teal-600"
                        >
                            {habit ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HabitFormModal;
