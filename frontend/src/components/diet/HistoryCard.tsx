import { ChevronDown, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import type { DailyDietResponse, DietEntryResponse } from "../../types/diet";

interface HistoryCardProps {
    day: DailyDietResponse;
    onEditEntry: (entry: DietEntryResponse) => void;
    onDeleteEntry: (entryId: number) => void;
}

const mealTitles = {
    BREAKFAST: "🍳 Breakfast",
    LUNCH: "🍛 Lunch",
    SNACKS: "☕ Snacks",
    DINNER: "🍽 Dinner",
};

const HistoryCard = ({ day, onEditEntry, onDeleteEntry }: HistoryCardProps) => {
    const [expanded, setExpanded] = useState(false);

    const totalFoods = day.mealSummaries.reduce(
        (sum, meal) => sum + meal.itemCount,
        0,
    );

    const formattedDate = new Date(day.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Header */}

            <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="flex w-full items-center justify-between p-5 text-left transition hover:bg-slate-50"
            >
                <div>
                    <h3 className="font-semibold">{formattedDate}</h3>

                    <p className="mt-1 text-sm text-slate-500">
                        {day.totalCalories} kcal • {totalFoods} foods
                    </p>
                </div>

                {expanded ? (
                    <ChevronDown size={20} />
                ) : (
                    <ChevronRight size={20} />
                )}
            </button>

            {/* Details */}

            {expanded && (
                <div className="space-y-5 border-t border-slate-200 p-5">
                    {day.mealSummaries.filter((meal) => meal.itemCount > 0).map((meal) => (
                        <div key={meal.mealType}>
                            <div className="mb-3 flex items-center justify-between">
                                <h4 className="font-medium">
                                    {
                                        mealTitles[
                                            meal.mealType as keyof typeof mealTitles
                                        ]
                                    }
                                </h4>

                                <span className="text-sm text-slate-500">
                                    {meal.totalCalories} kcal
                                </span>
                            </div>

                            <div className="space-y-2">
                                {meal.entries.map((entry) => (
                                    <div
                                        key={entry.id}
                                        className="flex items-center justify-between rounded-lg border border-slate-200 p-3"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {entry.foodName}
                                            </p>

                                            <p className="text-sm text-slate-500">
                                                {entry.quantityConsumed} serving
                                                {entry.quantityConsumed > 1
                                                    ? "s"
                                                    : ""}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-semibold text-teal-600">
                                                {entry.consumedCalories} kcal
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onEditEntry(entry)
                                                }
                                                className="text-slate-500 transition hover:text-teal-600"
                                            >
                                                <Pencil size={16} />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onDeleteEntry(entry.id)
                                                }
                                                className="text-slate-500 transition hover:text-red-600"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HistoryCard;
