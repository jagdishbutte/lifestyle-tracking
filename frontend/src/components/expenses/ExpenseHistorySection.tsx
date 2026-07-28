import ExpenseHistoryCard from "./ExpenseHistoryCard";

import type {
    DailyExpenseResponse,
    ExpenseResponse,
} from "../../types/expense";

interface ExpenseHistorySectionProps {
    history: DailyExpenseResponse[];
    onEditExpense: (expense: ExpenseResponse) => void;
    onDeleteExpense: (id: number) => void;
}

const ExpenseHistorySection = ({
    history,
    onEditExpense,
    onDeleteExpense,
}: ExpenseHistorySectionProps) => {

    if (history.length === 0) {
        return (
            <p className="py-10 text-center text-slate-500">
                No expenses found.
            </p>
        );
    }

    return (
        <div className="space-y-4">

            {history.map((day) => (
                <ExpenseHistoryCard
                    key={day.date}
                    day={day}
                    onEditExpense={onEditExpense}
                    onDeleteExpense={onDeleteExpense}
                />
            ))}

        </div>
    );
};

export default ExpenseHistorySection;