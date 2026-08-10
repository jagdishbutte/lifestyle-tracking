import { useEffect, useState } from "react";
import { Plus, Wallet } from "lucide-react";
import toast from "react-hot-toast";

import type {
    DailyExpenseResponse,
    ExpenseResponse,
} from "../../types/expense";

import { getTodayExpenses, deleteExpense } from "../../services/expenseService";
import { getErrorMessage } from "../../utils/errorHandler";
import ExpenseFormModal from "../expenses/ExpenseFormModal";
import ConfirmModal from "../common/ConfirmModal";
import { useNavigate } from "react-router-dom";
import ExpenseCard from "../expenses/ExpenseCard";

const QuickExpenseCard = () => {
    const [todayExpenses, setTodayExpenses] =
        useState<DailyExpenseResponse | null>(null);
    const [editingExpense, setEditingExpense] =
        useState<ExpenseResponse | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const navigate = useNavigate();

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2,
        }).format(amount);

    const loadExpenses = async () => {
        try {
            const response = await getTodayExpenses();

            if (response.success) {
                setTodayExpenses(response.data);
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    useEffect(() => {
        loadExpenses();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            setDeleteLoading(true);

            const response = await deleteExpense(deleteId);

            toast.success(response.message);

            setDeleteId(null);

            loadExpenses();
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="overflow-hidden rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 via-white to-cyan-50 shadow-[0_4px_20px_rgba(20,184,166,0.08)]">
                    <div className="flex items-start gap-3 border-l-4 border-teal-500 px-4 py-3">
                        <span className="mt-0.5 shrink-0 text-xl text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.9)]">
                            ✨
                        </span>

                        <p className="text-sm font-semibold leading-6 tracking-tight text-slate-800">
                            No insights available yet. Keep logging your
                            activities regularly to unlock personalized
                            AI-powered lifestyle insights.
                        </p>
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-orange-100 p-3">
                            <Wallet size={22} className="text-orange-600" />
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold">
                                Today's Expenses
                            </h2>

                            <p className="text-sm text-slate-500">
                                {formatCurrency(
                                    todayExpenses?.totalAmount ?? 0,
                                )}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setEditingExpense(null);
                            setShowModal(true);
                        }}
                        className="flex items-center gap-2 rounded-lg bg-teal-500 px-3 py-2 text-sm text-white hover:bg-teal-600"
                    >
                        <Plus size={16} />
                        Add
                    </button>
                </div>

                <div className="mt-6 max-h-96 space-y-3 overflow-y-auto pr-2">
                    {todayExpenses?.expenses.length ? (
                        todayExpenses.expenses.map((expense) => (
                            <ExpenseCard
                                key={expense.id}
                                expense={expense}
                                onEdit={(expense) => {
                                    setEditingExpense(expense);
                                    setShowModal(true);
                                }}
                                onDelete={(id) => setDeleteId(id)}
                            />
                        ))
                    ) : (
                        <p className="py-8 text-center text-slate-500">
                            No expenses added today.
                        </p>
                    )}
                </div>

                <button
                    className="mt-6 w-full rounded-xl border border-teal-500 py-3 text-teal-600 transition hover:bg-teal-50"
                    onClick={() => navigate("/expenses")}
                >
                    Manage Expenses
                </button>
            </div>

            <ExpenseFormModal
                open={showModal}
                expense={editingExpense}
                onClose={() => {
                    setShowModal(false);
                    setEditingExpense(null);
                }}
                onSaved={() => {
                    loadExpenses();
                    setShowModal(false);
                    setEditingExpense(null);
                }}
            />

            <ConfirmModal
                open={deleteId !== null}
                title="Delete Expense"
                message="Are you sure you want to delete this expense?"
                confirmText="Delete"
                loading={deleteLoading}
                // loadingText="Deleting..."
                onConfirm={handleDelete}
                onCancel={() => setDeleteId(null)}
            />
        </>
    );
};

export default QuickExpenseCard;
