import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import type {
    ExpenseCategory,
    ExpenseRequest,
    ExpenseResponse,
} from "../../types/expense";

import { addExpense, updateExpense } from "../../services/expenseService";
import { getErrorMessage } from "../../utils/errorHandler";

interface ExpenseFormModalProps {
    open: boolean;
    expense: ExpenseResponse | null;
    onClose: () => void;
    onSaved: () => void;
}

const categories: ExpenseCategory[] = [
    "FOOD",
    "TRANSPORT",
    "SHOPPING",
    "ENTERTAINMENT",
    "HEALTH",
    "BILLS",
    "EDUCATION",
    "TRAVEL",
    "OTHER",
];

const categoryLabels = {
    FOOD: "Food",
    TRANSPORT: "Transport",
    SHOPPING: "Shopping",
    ENTERTAINMENT: "Entertainment",
    HEALTH: "Health",
    BILLS: "Bills",
    EDUCATION: "Education",
    TRAVEL: "Travel",
    OTHER: "Other",
};

const ExpenseFormModal = ({
    open,
    expense,
    onClose,
    onSaved,
}: ExpenseFormModalProps) => {
    const isEdit = expense !== null;
    const [expenseName, setExpenseName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState<ExpenseCategory>("OTHER");
    const [description, setDescription] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!open) return;

        if (expense) {
            setExpenseName(expense.expenseName);
            setAmount(expense.amount.toString());
            setCategory(expense.category);
            setDescription(expense.description ?? "");
        } else {
            setExpenseName("");
            setAmount("");
            setCategory("OTHER");
            setDescription("");
        }
    }, [expense, open]);

    if (!open) return null;

    const handleSave = async () => {
        if (!expenseName.trim()) {
            toast.error("Expense name is required.");
            return;
        }

        if (!amount || Number(amount) <= 0) {
            toast.error("Enter a valid amount.");
            return;
        }

        const request: ExpenseRequest = {
            expenseName,
            amount: Number(amount),
            category,
            description,
            expenseDate: new Date().toLocaleDateString("en-CA", {
                timeZone: "Asia/Kolkata",
            }),
        };

        try {
            setSaving(true);

            const response = isEdit
                ? await updateExpense(expense.id, request)
                : await addExpense(request);

            toast.success(response.message);

            onSaved();
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
                    <h2 className="text-xl font-semibold">
                        {isEdit ? "Update Expense" : "Add Expense"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-xl text-slate-500 hover:text-slate-700"
                    >
                        ×
                    </button>
                </div>

                <div className="mt-6 space-y-4">
                    <input
                        type="text"
                        placeholder="Expense Name"
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                    />

                    <input
                        type="number"
                        placeholder="Amount"
                        min={0}
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                    />

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value as ExpenseCategory)
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                    >
                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {categoryLabels[item]}
                            </option>
                        ))}
                    </select>

                    <textarea
                        rows={3}
                        placeholder="Description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                    />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={saving}
                        className="rounded-xl border border-slate-300 px-5 py-2 hover:bg-slate-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="rounded-xl bg-teal-500 px-5 py-2 text-white hover:bg-teal-600 disabled:opacity-60"
                    >
                        {saving ? "Saving..." : isEdit ? "Update" : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExpenseFormModal;
