import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AppShell from "../components/common/AppShell";
import type {
    DailyDietResponse,
    DietEntryResponse,
    MealType,
} from "../types/diet";
import { useEffect, useState } from "react";
import {
    deleteDietEntry,
    getDietHistory,
    getTodayDiet,
} from "../services/dietService";
import { getErrorMessage } from "../utils/errorHandler";
import toast from "react-hot-toast";
import MealSection from "../components/diet/MealSection";
import FoodSearchModal from "../components/diet/FoodSearchModal";
import ConfirmModal from "../components/common/ConfirmModal";
import UpdateQuantityModal from "../components/diet/UpdateQuantityModal";
import HistorySection from "../components/diet/HistorySection";

const meals: {
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

const DietPage = () => {
    const navigate = useNavigate();
    const [todayDiet, setTodayDiet] = useState<DailyDietResponse | null>(null);
    const [selectedMeal, setSelectedMeal] = useState<MealType | null>(null);
    const [deleteEntryId, setDeleteEntryId] = useState<number | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [editingEntry, setEditingEntry] = useState<DietEntryResponse | null>(
        null,
    );
    const [history, setHistory] = useState<DailyDietResponse[]>([]);
    const [period, setPeriod] = useState(7);
    const [search, setSearch] = useState("");

    const totalCalories = todayDiet?.totalCalories ?? 0;
    const calorieGoal = todayDiet?.dailyCalorieGoal ?? 2200;

    const progress = Math.min(
        Math.round((totalCalories / calorieGoal) * 100),
        100,
    );

    const progressColor =
        progress < 50
            ? "bg-amber-500"
            : progress < 100
              ? "bg-teal-500"
              : "bg-green-500";

    const loadTodayDiet = async () => {
        try {
            const response = await getTodayDiet();

            if (response.success) {
                setTodayDiet(response.data);
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const loadHistory = async () => {
        try {
            const response = await getDietHistory(period);

            if (response.success) {
                setHistory(response.data);
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const filteredHistory = history.filter((day) => {
        if (!search.trim()) return true;

        const keyword = search.toLowerCase();

        return day.mealSummaries.some(
            (meal) =>
                meal.mealType.toLowerCase().includes(keyword) ||
                meal.entries.some((entry) =>
                    entry.foodName.toLowerCase().includes(keyword),
                ),
        );
    });

    useEffect(() => {
        loadTodayDiet();
    }, []);

    useEffect(() => {
        loadHistory();
    }, [period]);

    const handleAddFood = (mealType: MealType) => {
        setSelectedMeal(mealType);
    };

    const handleEditEntry = (entry: DietEntryResponse) => {
        setEditingEntry(entry);
    };

    const confirmDelete = (entryId: number) => {
        setDeleteEntryId(entryId);
    };

    const handleDelete = async () => {
        if (deleteEntryId == null) return;
        try {
            setDeleteLoading(true);
            const response = await deleteDietEntry(deleteEntryId);
            toast.success(response.message);
            await loadTodayDiet();
            setDeleteEntryId(null);
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100"
                        >
                            <ArrowLeft size={20} />
                        </button>

                        <div>
                            <h1 className="text-3xl font-bold">Diet Tracker</h1>

                            <p className="mt-1 text-slate-600">
                                Track meals and monitor your daily nutrition.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Daily Calories Summary */}

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">
                                Today's Calories
                            </h2>

                            <p className="mt-1 text-slate-500">
                                {totalCalories} / {calorieGoal} kcal
                            </p>
                        </div>

                        <span className="rounded-full bg-teal-100 px-4 py-2 text-sm font-medium text-teal-700">
                            {progress}%
                        </span>
                    </div>

                    <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Main Layout */}

                <div className="grid gap-6 xl:grid-cols-2">
                    {/* Today's Diet */}

                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-200 p-5">
                            <h2 className="text-xl font-semibold">
                                Today's Diet
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Add, edit or delete today's meals.
                            </p>
                        </div>

                        <div className="max-h-[55vh] overflow-y-auto p-5">
                            {/* MealSection Components */}

                            <div className="space-y-5">
                                {meals.map((item) => (
                                    <MealSection
                                        key={item.type}
                                        title={item.title}
                                        icon={item.icon}
                                        mealType={item.type}
                                        meal={
                                            todayDiet?.mealSummaries.find(
                                                (meal) =>
                                                    meal.mealType === item.type,
                                            ) ?? null
                                        }
                                        onAddFood={handleAddFood}
                                        onEditEntry={handleEditEntry}
                                        onDeleteEntry={confirmDelete}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* History */}

                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-200 p-5">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">
                                    History
                                </h2>

                                <select
                                    value={period}
                                    onChange={(e) =>
                                        setPeriod(Number(e.target.value))
                                    }
                                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                                >
                                    <option value={7}>Last 7 Days</option>
                                    <option value={30}>Last Month</option>
                                    <option value={90}>Last Quarter</option>
                                    <option value={365}>Last Year</option>
                                </select>
                            </div>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search food..."
                                className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                            />
                        </div>

                        <div className="max-h-[55vh] overflow-y-auto p-5">
                            {/* HistoryCard Components */}

                            <HistorySection
                                history={filteredHistory}
                                onEditEntry={handleEditEntry}
                                onDeleteEntry={confirmDelete}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {selectedMeal && (
                <FoodSearchModal
                    mealType={selectedMeal}
                    onClose={() => {
                        setSelectedMeal(null);
                    }}
                    onSaved={() => {
                        loadTodayDiet();
                        setSelectedMeal(null);
                    }}
                />
            )}
            <ConfirmModal
                open={deleteEntryId !== null}
                title="Delete Diet Entry"
                message="Are you sure you want to delete this food entry?"
                confirmText="Delete"
                loading={deleteLoading}
                onConfirm={handleDelete}
                onCancel={() => setDeleteEntryId(null)}
            />
            <UpdateQuantityModal
                open={editingEntry !== null}
                entry={editingEntry}
                onClose={() => setEditingEntry(null)}
                onUpdated={() => {
                    loadTodayDiet();
                    setEditingEntry(null);
                }}
            />
        </AppShell>
    );
};

export default DietPage;
