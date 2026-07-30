import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import { getTodayDiet } from "../../services/dietService";
import { getErrorMessage } from "../../utils/errorHandler";

import type { DailyDietResponse, MealType } from "../../types/diet";

import FoodSearchModal from "../diet/FoodSearchModal";

const MEALS: {
    title: string;
    type: MealType;
    icon: string;
}[] = [
    {
        title: "Breakfast",
        type: "BREAKFAST",
        icon: "🍳",
    },
    {
        title: "Lunch",
        type: "LUNCH",
        icon: "🍛",
    },
    {
        title: "Snacks",
        type: "SNACK",
        icon: "☕",
    },
    {
        title: "Dinner",
        type: "DINNER",
        icon: "🍽",
    },
];

const QuickDietLogCard = () => {
    const navigate = useNavigate();
    const [diet, setDiet] = useState<DailyDietResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedMeal, setSelectedMeal] = useState<MealType | null>(null);

    const loadDiet = async () => {
        try {
            setLoading(true);

            const response = await getTodayDiet();

            if (response.success) {
                setDiet(response.data);
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDiet();
    }, []);

    return (
        <>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">Today's Food</h2>

                        <p className="text-sm text-slate-500">
                            Track your meals
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/diet")}
                        className="rounded-lg border border-teal-500 px-3 py-2 text-sm text-teal-600 transition hover:bg-teal-50"
                    >
                        Manage
                    </button>
                </div>

                <div className="mt-6 space-y-4">
                    {loading ? (
                        <p className="text-sm text-slate-500">Loading...</p>
                    ) : (
                        MEALS.map((mealConfig) => {
                            const meal = diet?.mealSummaries.find(
                                (item) => item.mealType === mealConfig.type,
                            );

                            return (
                                <div
                                    key={mealConfig.type}
                                    className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
                                >
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">
                                                {mealConfig.icon}
                                            </span>

                                            <span className="font-medium">
                                                {mealConfig.title}
                                            </span>
                                        </div>

                                        <p className="mt-1 text-sm text-slate-500">
                                            {meal
                                                ? `${meal.itemCount} items • ${meal.totalCalories} kcal`
                                                : "Tap + to add food"}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() =>
                                            setSelectedMeal(mealConfig.type)
                                        }
                                        className="rounded-lg bg-teal-500 p-2 text-white transition hover:bg-teal-600"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="mt-6 border-t pt-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Today's Total</span>

                        <span className="font-semibold text-teal-600">
                            {diet?.totalCalories ?? 0} kcal
                        </span>
                    </div>
                </div>
            </div>

            <FoodSearchModal
                mealType={selectedMeal}
                onClose={() => setSelectedMeal(null)}
                onSaved={loadDiet}
            />
        </>
    );
};

export default QuickDietLogCard;
