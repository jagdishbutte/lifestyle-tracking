import { Pencil, Trash2 } from "lucide-react";

import type { HabitResponse } from "../../types/habit";

interface HabitCardProps {
    habit: HabitResponse;
    onEdit: (habit: HabitResponse) => void;
    onDelete: (id: number) => void;
}

const HabitCard = ({ habit, onEdit, onDelete }: HabitCardProps) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        {habit.name}
                    </h2>

                    <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            {habit.category}
                        </span>

                        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
                            {habit.frequency}
                        </span>

                        {habit.isPredefined && (
                            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                                Predefined
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(habit)}
                        className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100"
                    >
                        <Pencil size={18} />
                    </button>

                    <button
                        onClick={() => onDelete(habit.id)}
                        className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HabitCard;
