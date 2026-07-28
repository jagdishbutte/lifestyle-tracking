import { Pencil, Plus, Trash2 } from "lucide-react";

import type {
    DietEntryResponse,
    MealSummary,
    MealType,
} from "../../types/diet";

interface MealSectionProps {
    meal: MealSummary | null;
    title: string;
    icon: string;
    mealType: MealType;
    onAddFood: (mealType: MealType) => void;
    onEditEntry: (entry: DietEntryResponse) => void;
    onDeleteEntry: (entryId: number) => void;
}

const MealSection = ({
    meal,
    title,
    icon,
    mealType,
    onAddFood,
    onEditEntry,
    onDeleteEntry,
}: MealSectionProps) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
            {/* Header */}

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{icon}</span>

                    <div>
                        <h3 className="font-semibold text-slate-900">
                            {title}
                        </h3>

                        <p className="text-sm text-slate-500">
                            {meal?.itemCount ?? 0} items •{" "}
                            {meal?.totalCalories ?? 0} kcal
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => onAddFood(mealType)}
                    className="flex items-center gap-2 rounded-lg bg-teal-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-teal-600"
                >
                    <Plus size={16} />
                    Add Food
                </button>
            </div>

            {/* Entries */}

            <div className="mt-5 space-y-3">
                {meal == null || meal.entries.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 py-8 text-center text-sm text-slate-500">
                        No food added yet.
                    </div>
                ) : (
                    meal.entries.map((entry) => (
                        <div
                            key={entry.id}
                            className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
                        >
                            <div>
                                <h4 className="font-medium">
                                    {entry.foodName}
                                </h4>

                                <p className="mt-1 text-sm text-slate-500">
                                    {entry.quantityConsumed} serving
                                    {entry.quantityConsumed > 1 ? "s" : ""}
                                </p>
                            </div>

                            <div className="flex items-center gap-5">
                                <span className="text-sm font-semibold text-teal-600">
                                    {entry.consumedCalories} kcal
                                </span>

                                <button
                                    type="button"
                                    onClick={() => onEditEntry(entry)}
                                    className="text-slate-500 transition hover:text-teal-600"
                                >
                                    <Pencil size={18} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => onDeleteEntry(entry.id)}
                                    className="text-slate-500 transition hover:text-red-600"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MealSection;
