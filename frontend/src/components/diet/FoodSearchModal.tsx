import { useEffect, useState } from "react";
import type { AddMealRequest, FoodResponse, MealType } from "../../types/diet";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/errorHandler";
import { addMeal, searchFoods } from "../../services/dietService";
import { Plus } from "lucide-react";

interface FoodSearchModalProps {
    mealType: MealType | null;
    onClose: () => void;
    onSaved: () => void;
}

const FoodSearchModal = ({
    mealType,
    onClose,
    onSaved,
}: FoodSearchModalProps) => {
    if (!mealType) return null;

    const userId = 6;
    const [search, setSearch] = useState("");
    const [foods, setFoods] = useState<FoodResponse[]>([]);
    const [selectedFood, setSelectedFood] = useState<FoodResponse | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const today = new Date();
    const consumedDate =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");

    useEffect(() => {
        const loadFoods = async () => {
            if (search.trim().length < 2) {
                setFoods([]);

                return;
            }

            try {
                setLoading(true);

                const response = await searchFoods(search);

                // console.log(response);
                // console.log(response.success);
                if (response.success) {
                    setFoods(response.data);
                }
            } catch (error) {
                toast.error(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(loadFoods, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const handleSave = async () => {
        if (!selectedFood || !mealType) return;

        try {
            setSaving(true);

            const request: AddMealRequest = {
                userId: userId,
                mealType,
                consumedDate,
                items: [
                    {
                        foodId: selectedFood.id,
                        quantity,
                    },
                ],
            };

            const response = await addMeal(request);

            toast.success(response.message);

            // Reset modal state
            setSelectedFood(null);
            setFoods([]);
            setSearch("");
            setQuantity(1);

            onSaved();
            onClose();
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Add Food</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-slate-700"
                    >
                        ✕
                    </button>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                    Meal: <span className="font-medium">{mealType}</span>
                </p>

                <div className="mt-6">
                    {/* Search Input */}

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search food..."
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                    />

                    {selectedFood == null ? (
                        /* Search Results */

                        <div className="mt-5 max-h-64 space-y-3 overflow-y-auto">
                            {loading ? (
                                <p className="py-8 text-center text-slate-500">
                                    Searching...
                                </p>
                            ) : search.trim().length < 2 ? (
                                <p className="py-8 text-center text-slate-500">
                                    Type at least 2 characters to search.
                                </p>
                            ) : foods.length === 0 ? (
                                <p className="py-8 text-center text-slate-500">
                                    No food found.
                                </p>
                            ) : (
                                foods.map((food) => (
                                    <button
                                        key={food.id}
                                        type="button"
                                        onClick={() => setSelectedFood(food)}
                                        className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition hover:border-teal-300 hover:bg-slate-50"
                                    >
                                        <div>
                                            <h3 className="font-medium">
                                                {food.name}
                                            </h3>

                                            <p className="mt-1 text-sm text-slate-500">
                                                {food.calories} kcal /{" "}
                                                {food.servingQuantity}{" "}
                                                {food.servingUnit}
                                            </p>
                                        </div>

                                        <Plus
                                            size={18}
                                            className="text-teal-600"
                                        />
                                    </button>
                                ))
                            )}
                        </div>
                    ) : (
                        /* Selected Food */

                        <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50 p-5">
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedFood(null);
                                    setQuantity(1);
                                }}
                                className="mb-4 text-sm font-medium text-teal-600 hover:underline"
                            >
                                ← Choose Another Food
                            </button>

                            <h3 className="font-semibold">
                                {selectedFood?.name}
                            </h3>

                            <p className="mt-1 text-sm text-slate-600">
                                {selectedFood?.calories} kcal /{" "}
                                {selectedFood?.servingQuantity}{" "}
                                {selectedFood?.servingUnit}
                            </p>

                            <div className="mt-6">
                                <label className="mb-2 block text-sm font-medium">
                                    Quantity
                                </label>

                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setQuantity((q) =>
                                                Math.max(1, q - 1),
                                            )
                                        }
                                        className="rounded-lg border px-4 py-2"
                                    >
                                        −
                                    </button>

                                    <input
                                        type="number"
                                        min={1}
                                        value={quantity}
                                        onChange={(e) =>
                                            setQuantity(Number(e.target.value))
                                        }
                                        className="w-20 rounded-lg border px-3 py-2 text-center"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setQuantity((q) => q + 1)
                                        }
                                        className="rounded-lg border px-4 py-2"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 rounded-lg bg-white p-4">
                                <p className="text-sm text-slate-500">
                                    Estimated Calories
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-teal-600">
                                    {(selectedFood.calories * quantity).toFixed(
                                        0,
                                    )}{" "}
                                    kcal
                                </h2>
                            </div>

                            <button
                                type="button"
                                disabled={saving}
                                onClick={handleSave}
                                className="mt-6 w-full rounded-xl bg-teal-500 py-3 font-medium text-white transition hover:bg-teal-600 disabled:opacity-60"
                            >
                                {saving ? "Adding..." : "Add Meal"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FoodSearchModal;
