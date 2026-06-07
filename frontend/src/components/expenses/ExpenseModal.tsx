import { useEffect, useState } from "react";

import { type Expense } from "../../types/expense.types";

import { expenseCategories } from "../../data/expenses";

interface Props {
    isOpen: boolean;

    expense: Expense | null;

    onClose: () => void;

    onSave: (expense: Omit<Expense, "id">) => void;
}

const ExpenseModal = ({ isOpen, expense, onClose, onSave }: Props) => {
    const [title, setTitle] = useState("");

    const [amount, setAmount] = useState("");

    const [category, setCategory] = useState("Food");

    const [notes, setNotes] = useState("");

    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

    useEffect(() => {
        if (expense) {
            setTitle(expense.title);
            setAmount(expense.amount.toString());
            setCategory(expense.category);
            setDate(expense.date);
            setNotes(expense.notes || "");
        } else {
            setTitle("");
            setAmount("");
            setCategory("Food");
            setDate(new Date().toISOString().split("T")[0]);
            setNotes("");
        }
    }, [expense, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSave({
            title,
            amount: Number(amount),
            category,
            notes,
            date,
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold">
                    {expense ? "Edit Expense" : "Add Expense"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-xl border px-4 py-3"
                    />

                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full rounded-xl border px-4 py-3"
                    />

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Expense Date
                        </label>

                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-xl border px-4 py-3"
                    >
                        {expenseCategories.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <textarea
                        rows={3}
                        placeholder="Notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full rounded-xl border px-4 py-3"
                    />

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl border py-3"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex-1 rounded-xl bg-teal-500 py-3 text-white"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExpenseModal;
