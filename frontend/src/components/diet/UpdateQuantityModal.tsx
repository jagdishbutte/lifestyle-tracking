import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import type { DietEntryResponse } from "../../types/diet";

import { updateDietEntry } from "../../services/dietService";
import { getErrorMessage } from "../../utils/errorHandler";

interface UpdateQuantityModalProps {
    open: boolean;
    entry: DietEntryResponse | null;
    onClose: () => void;
    onUpdated: () => void;
}

const UpdateQuantityModal = ({
    open,
    entry,
    onClose,
    onUpdated,
}: UpdateQuantityModalProps) => {
    const [quantity, setQuantity] = useState(1);

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (entry) {
            setQuantity(entry.quantityConsumed);
        }
    }, [entry]);

    if (!open || !entry) return null;

    const caloriesPerServing = entry.consumedCalories / entry.quantityConsumed;

    const estimatedCalories = caloriesPerServing * quantity;

    const handleUpdate = async () => {
        try {
            setSaving(true);

            const response = await updateDietEntry(entry.id, {
                quantity,
            });

            toast.success(response.message);

            onUpdated();
            onClose();
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Update Quantity</h2>

                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-slate-700"
                    >
                        ✕
                    </button>
                </div>

                <p className="mt-5 font-semibold">{entry.foodName}</p>

                <p className="mt-1 text-sm text-slate-500">
                    {caloriesPerServing.toFixed(0)} kcal / serving
                </p>

                <div className="mt-6">
                    <label className="mb-2 block text-sm font-medium">
                        Quantity
                    </label>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                setQuantity((q) => Math.max(1, q - 1))
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
                            onClick={() => setQuantity((q) => q + 1)}
                            className="rounded-lg border px-4 py-2"
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="mt-6 rounded-lg bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Estimated Calories</p>

                    <h2 className="mt-1 text-2xl font-bold text-teal-600">
                        {estimatedCalories.toFixed(0)} kcal
                    </h2>
                </div>

                <button
                    onClick={handleUpdate}
                    disabled={saving}
                    className="mt-6 w-full rounded-xl bg-teal-500 py-3 text-white transition hover:bg-teal-600 disabled:opacity-60"
                >
                    {saving ? "Updating..." : "Update Quantity"}
                </button>
            </div>
        </div>
    );
};

export default UpdateQuantityModal;
