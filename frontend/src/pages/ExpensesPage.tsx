import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AppShell from "../components/common/AppShell";
import ConfirmModal from "../components/common/ConfirmModal";
import ExpenseFormModal from "../components/expenses/ExpenseFormModal";

import {
    deleteExpense,
    getExpenseHistory,
    getTodayExpenses,
} from "../services/expenseService";

import type { DailyExpenseResponse, ExpenseResponse } from "../types/expense";
import { getErrorMessage } from "../utils/errorHandler";
import ExpenseCard from "../components/expenses/ExpenseCard";
import ExpenseHistorySection from "../components/expenses/ExpenseHistorySection";

const ExpensePage = () => {
    const navigate = useNavigate();
    const [todayExpenses, setTodayExpenses] =
        useState<DailyExpenseResponse | null>(null);
    const [history, setHistory] = useState<DailyExpenseResponse[]>([]);
    const [period, setPeriod] = useState(7);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingExpense, setEditingExpense] =
        useState<ExpenseResponse | null>(null);
    const [deleteExpenseId, setDeleteExpenseId] = useState<number | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const loadTodayExpenses = async () => {
        try {
            const response = await getTodayExpenses();

            if (response.success) {
                setTodayExpenses(response.data);
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const loadHistory = async () => {
        try {
            const response = await getExpenseHistory(period);

            if (response.success) {
                setHistory(response.data);
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    useEffect(() => {
        loadTodayExpenses();
    }, []);

    useEffect(() => {
        loadHistory();
    }, [period]);

    const filteredHistory = history.filter((day) => {
        if (!search.trim()) return true;

        const keyword = search.toLowerCase();

        return day.expenses.some((expense) =>
            expense.expenseName.toLowerCase().includes(keyword),
        );
    });

    const handleDelete = async () => {
        if (!deleteExpenseId) return;

        try {
            setDeleteLoading(true);

            const response = await deleteExpense(deleteExpenseId);

            toast.success(response.message);

            await loadTodayExpenses();
            await loadHistory();

            setDeleteExpenseId(null);
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <AppShell>
            <div>
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
                            <h1 className="text-3xl font-bold">Expense Manager</h1>

                            <p className="mt-1 text-slate-600">
                                Track and manage your daily expenses.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid gap-6 xl:grid-cols-2">
                    {/* Today's Expenses */}

                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                         <div className="border-b border-slate-200 p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        Today's Expenses
                                    </h2>

                                    <p className="mt-1 text-slate-500">
                                        ₹{todayExpenses?.totalAmount ?? 0}
                                    </p>
                                </div>

                                <button
                                    onClick={() => {
                                        setEditingExpense(null);

                                        setShowModal(true);
                                    }}
                                    className="rounded-xl bg-teal-500 px-5 py-2 text-white transition hover:bg-teal-600"
                                >
                                    + Add Expense
                                </button>
                            </div>
                        </div>

                        <div className="max-h-[55vh] overflow-y-auto p-5">
                            {todayExpenses?.expenses.length ? (
                                <div className="space-y-3">
                                    {todayExpenses.expenses.map((expense) => (
                                        <ExpenseCard
                                            key={expense.id}
                                            expense={expense}
                                            onEdit={(expense) => {
                                                setEditingExpense(expense);
                                                setShowModal(true);
                                            }}
                                            onDelete={(id) =>
                                                setDeleteExpenseId(id)
                                            }
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="py-10 text-center text-slate-500">
                                    No expenses added today.
                                </p>
                            )}
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
                                placeholder="Search expense..."
                                className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                            />
                        </div>

                        <div className="max-h-[55vh] overflow-y-auto p-5">
                            <ExpenseHistorySection
                                history={filteredHistory}
                                onEditExpense={(expense) => {
                                    setEditingExpense(expense);

                                    setShowModal(true);
                                }}
                                onDeleteExpense={(id) => setDeleteExpenseId(id)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ExpenseFormModal
                open={showModal}
                expense={editingExpense}
                onClose={() => {
                    setShowModal(false);
                    setEditingExpense(null);
                }}
                onSaved={async () => {
                    await loadTodayExpenses();
                    await loadHistory();

                    setShowModal(false);
                    setEditingExpense(null);
                }}
            />

            <ConfirmModal
                open={deleteExpenseId !== null}
                title="Delete Expense"
                message="Are you sure you want to delete this expense?"
                confirmText="Delete"
                loading={deleteLoading}
                // loadingText="Deleting..."
                onConfirm={handleDelete}
                onCancel={() => setDeleteExpenseId(null)}
            />
        </AppShell>
    );
};

export default ExpensePage;
