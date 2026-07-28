import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import ExpenseCard from "./ExpenseCard";

import type {
    DailyExpenseResponse,
    ExpenseResponse,
} from "../../types/expense";

interface ExpenseHistoryCardProps {
    day: DailyExpenseResponse;
    onEditExpense: (expense: ExpenseResponse) => void;
    onDeleteExpense: (id: number) => void;
}

const ExpenseHistoryCard = ({
    day,
    onEditExpense,
    onDeleteExpense,
}: ExpenseHistoryCardProps) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="rounded-2xl border border-slate-200 bg-white">
            <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="flex w-full items-center justify-between p-5 text-left"
            >
                <div>
                    <h3 className="font-semibold">
                        {new Date(day.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        {day.expenses.length} expense
                        {day.expenses.length !== 1 && "s"}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <span className="font-semibold text-teal-600">
                        ₹{Number(day.totalAmount).toFixed(2)}
                    </span>

                    {expanded ? (
                        <ChevronUp size={20} />
                    ) : (
                        <ChevronDown size={20} />
                    )}
                </div>
            </button>

            {expanded && (
                <div className="space-y-3 border-t border-slate-200 p-5">
                    {day.expenses.map((expense) => (
                        <ExpenseCard
                            key={expense.id}
                            expense={expense}
                            onEdit={onEditExpense}
                            onDelete={onDeleteExpense}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExpenseHistoryCard;
