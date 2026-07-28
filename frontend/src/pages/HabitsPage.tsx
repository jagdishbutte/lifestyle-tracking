import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AppShell from "../components/common/AppShell";
import HabitCard from "../components/habits/HabitCard";
import HabitFormModal from "../components/habits/HabitFormModal";

import type { HabitResponse } from "../types/habit";
import { getActiveHabits, deleteHabit } from "../services/habitService";
import { getErrorMessage } from "../utils/errorHandler";
import ConfirmModal from "../components/common/ConfirmModal";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HabitsPage = () => {
    const userId = 6;
    const [habits, setHabits] = useState<HabitResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingHabit, setEditingHabit] = useState<HabitResponse | null>(
        null,
    );
    const [deleteHabitId, setDeleteHabitId] = useState<number | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const navigate = useNavigate();

    const loadHabits = async () => {
        try {
            setLoading(true);
            const response = await getActiveHabits(userId);

            if (response.success) {
                setHabits(response.data);
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadHabits();
    }, []);

    const handleCreate = () => {
        setEditingHabit(null);
        setShowModal(true);
    };

    const handleEdit = (habit: HabitResponse) => {
        setEditingHabit(habit);
        setShowModal(true);
    };

    const handleDelete = async () => {
        if (deleteHabitId == null) return;
        try {
            setDeleteLoading(true);
            const response = await deleteHabit(deleteHabitId);
            toast.success(response.message);
            setDeleteHabitId(null);
            await loadHabits();
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <AppShell>
            <div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100"
                        >
                            <ArrowLeft size={20} />
                        </button>

                        <div>
                            <h1 className="text-3xl font-bold">Habits</h1>

                            <p className="mt-2 text-slate-600">
                                Create and manage your daily habits.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleCreate}
                        className="rounded-xl bg-teal-500 px-5 py-3 text-white transition hover:bg-teal-600"
                    >
                        + Add Habit
                    </button>
                </div>

                {loading ? (
                    <p className="mt-8 text-slate-500">Loading habits...</p>
                ) : habits.length === 0 ? (
                    <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-12 text-center">
                        <p className="text-slate-500">No habits found.</p>
                    </div>
                ) : (
                    <div className="mt-8 grid gap-4">
                        {habits.map((habit) => (
                            <HabitCard
                                key={habit.id}
                                habit={habit}
                                onEdit={handleEdit}
                                onDelete={setDeleteHabitId}
                            />
                        ))}
                    </div>
                )}

                <HabitFormModal
                    open={showModal}
                    habit={editingHabit}
                    onClose={() => setShowModal(false)}
                    onSaved={loadHabits}
                />
            </div>
            <ConfirmModal
                open={deleteHabitId !== null}
                title="Delete Habit"
                message="Are you sure you want to delete this habit?"
                loading={deleteLoading}
                confirmText="Delete"
                onConfirm={handleDelete}
                onCancel={() => setDeleteHabitId(null)}
            />
        </AppShell>
    );
};

export default HabitsPage;
