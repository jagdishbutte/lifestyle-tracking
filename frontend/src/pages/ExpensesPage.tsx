import { useMemo, useState } from "react";

import AppShell from "../components/common/AppShell";
import ExpenseModal from "../components/expenses/ExpenseModal";

import { expenseCategories, initialExpenses } from "../data/expenses";

import { type Expense } from "../types/expense.types";

const ExpensesPage = () => {
    const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

    const [selectedMonth, setSelectedMonth] = useState(
        new Date().toISOString().slice(0, 7),
    );

    const [showModal, setShowModal] = useState(false);

    const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

    const filteredExpenses = useMemo(() => {
        return expenses.filter(
            (expense) => expense.date.slice(0, 7) === selectedMonth,
        );
    }, [expenses, selectedMonth]);

    const totalExpenses = filteredExpenses.reduce(
        (sum, expense) => sum + expense.amount,
        0,
    );

    const handleAddExpense = () => {
        setEditingExpense(null);

        setShowModal(true);
    };

    const handleEditExpense = (expense: Expense) => {
        setEditingExpense(expense);

        setShowModal(true);
    };

    const handleDeleteExpense = (id: number) => {
        const confirmed = window.confirm("Delete this expense?");

        if (!confirmed) return;

        setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    };

    const handleSaveExpense = (expenseData: Omit<Expense, "id">) => {
        if (editingExpense) {
            setExpenses((prev) =>
                prev.map((expense) =>
                    expense.id === editingExpense.id
                        ? {
                              ...expense,
                              ...expenseData,
                          }
                        : expense,
                ),
            );

            setEditingExpense(null);
            setShowModal(false);

            return;
        }

        const newExpense: Expense = {
            id: Date.now(),
            ...expenseData,
        };

        setExpenses((prev) => [newExpense, ...prev]);
    };

    const categoryBreakdown = expenseCategories
        .map((category) => {
            const amount = filteredExpenses
                .filter((expense) => expense.category === category)
                .reduce((sum, expense) => sum + expense.amount, 0);

            return {
                category,
                amount,
            };
        })
        .filter((item) => item.amount > 0);

    return (
        <AppShell>
            <div>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Expenses</h1>

                        <p className="mt-2 text-slate-600">
                            Track and manage your spending.
                        </p>
                    </div>

                    <button
                        onClick={handleAddExpense}
                        className="rounded-xl bg-teal-500 px-5 py-3 text-white hover:bg-teal-600"
                    >
                        + Add Expense
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {/* Filters */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <label className="mb-2 block text-sm font-medium">
                            Select Month
                        </label>

                        <input
                            type="month"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="rounded-xl border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate-500">Total Expenses</p>

                        <h2 className="mt-2 text-3xl font-bold text-teal-600">
                            ₹{totalExpenses.toLocaleString()}
                        </h2>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate-500">Transactions</p>

                        <h2 className="mt-2 text-3xl font-bold text-teal-600">
                            {filteredExpenses.length}
                        </h2>
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold">
                        Category Breakdown
                    </h2>

                    <div className="space-y-4">
                        {categoryBreakdown.map((item) => (
                            <div key={item.category}>
                                <div className="mb-1 flex justify-between">
                                    <span>{item.category}</span>

                                    <span>₹{item.amount}</span>
                                </div>

                                <div className="h-4 rounded-full bg-slate-200">
                                    <div
                                        className="h-4 rounded-full bg-teal-500"
                                        style={{
                                            width: `${
                                                totalExpenses === 0
                                                    ? 0
                                                    : (item.amount /
                                                          totalExpenses) *
                                                      100
                                            }%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Expenses Table */}
                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-left">
                                        Title
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Category
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Amount
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Date
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredExpenses.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-8 text-center text-slate-500"
                                        >
                                            No expenses found for this month.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredExpenses.map((expense) => (
                                        <tr
                                            key={expense.id}
                                            className="border-t border-slate-200"
                                        >
                                            <td className="px-6 py-4">
                                                {expense.title}
                                            </td>
                                            <td className="px-6 py-4">
                                                {expense.category}
                                            </td>
                                            <td className="px-6 py-4">
                                                ₹
                                                {expense.amount.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                {new Date(
                                                    expense.date,
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() =>
                                                        handleEditExpense(
                                                            expense,
                                                        )
                                                    }
                                                    className="mr-3 text-teal-600 hover:text-teal-800"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteExpense(
                                                            expense.id,
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <ExpenseModal
                    isOpen={showModal}
                    expense={editingExpense}
                    onClose={() => {
                        setShowModal(false);

                        setEditingExpense(null);
                    }}
                    onSave={handleSaveExpense}
                />
            </div>
        </AppShell>
    );
};

export default ExpensesPage;
