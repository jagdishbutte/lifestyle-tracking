import { Pencil, Trash2 } from "lucide-react";

import type { ExpenseResponse } from "../../types/expense";

interface ExpenseCardProps {
    expense: ExpenseResponse;
    onEdit: (expense: ExpenseResponse) => void;
    onDelete: (expenseId: number) => void;
}

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

const ExpenseCard = ({ expense, onEdit, onDelete }: ExpenseCardProps) => {
    return (
        <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-teal-300">
            <div>
                <h3 className="font-medium text-slate-900">
                    {expense.expenseName}
                </h3>

                <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                    <span>{categoryLabels[expense.category]}</span>

                    {expense.description && (
                        <>
                            <span>•</span>

                            <span className="truncate">
                                {expense.description}
                            </span>
                        </>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-5">
                <span className="font-semibold text-teal-600">
                    ₹{Number(expense.amount).toFixed(2)}
                </span>

                <button
                    type="button"
                    onClick={() => onEdit(expense)}
                    className="text-slate-500 transition hover:text-teal-600"
                >
                    <Pencil size={18} />
                </button>

                <button
                    type="button"
                    onClick={() => onDelete(expense.id)}
                    className="text-slate-500 transition hover:text-red-600"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default ExpenseCard;
