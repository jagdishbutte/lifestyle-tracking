import { useState } from "react";

import { expenseCategories } from "../../data/dashboard";

const QuickExpenseCard = () => {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");

    const handleSave = () => {
        console.log({
            amount,
            category,
        });

        setAmount("");
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
                Quick Expense
            </h2>

            <p className="mt-1 text-sm text-slate-500">
                Record expenses without leaving the dashboard.
            </p>

            <div className="mt-6 space-y-4">
                <div>
                    <label className="mb-2 block text-sm text-slate-600">
                        Amount
                    </label>

                    <input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) =>
                            setAmount(e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm text-slate-600">
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                    >
                        {expenseCategories.map((item) => (
                            <option
                                key={item}
                                value={item}
                            >
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={handleSave}
                    className="w-full rounded-xl bg-teal-500 py-3 text-white transition hover:bg-teal-600"
                >
                    Add Expense
                </button>
            </div>
        </div>
    );
};

export default QuickExpenseCard;