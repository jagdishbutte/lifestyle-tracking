import { useEffect, useState } from "react";
import { Plus, BookOpenText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import type {
    DailyJournalResponse,
    JournalResponse,
} from "../../types/journal";

import { deleteJournal, getTodayJournals } from "../../services/journalService";
import { getErrorMessage } from "../../utils/errorHandler";
import ConfirmModal from "../common/ConfirmModal";
import JournalFormModal from "../journals/JournalFormModal";
import JournalCard from "../journals/JournalCard";
import { useInsightStore } from "../../store/insightStore";

const QuickJournalCard = () => {
    const navigate = useNavigate();
    const [todayJournals, setTodayJournals] =
        useState<DailyJournalResponse | null>(null);
    const [editingJournal, setEditingJournal] =
        useState<JournalResponse | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const { insights, insightsLoading } = useInsightStore();

    const loadJournals = async () => {
        try {
            const response = await getTodayJournals();

            if (response.success) {
                setTodayJournals(response.data);
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    useEffect(() => {
        loadJournals();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            setDeleteLoading(true);

            const response = await deleteJournal(deleteId);

            toast.success(response.message);

            setDeleteId(null);

            loadJournals();
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

                        {insightsLoading ? (
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-full animate-pulse rounded-md bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
                                <div className="h-4 w-5/6 animate-pulse rounded-md bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
                            </div>
                        ) : (
                            <p className="text-md leading-6 tracking-tight text-slate-800">
                                {insights?.insights.journal ??
                                    "No insights available yet. Keep logging your activities consistently to unlock personalized AI insights."}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-violet-100 p-3">
                            <BookOpenText
                                size={22}
                                className="text-violet-600"
                            />
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold">
                                Today's Journal
                            </h2>

                            <p className="text-sm text-slate-500">
                                {todayJournals?.entryCount ?? 0} Entries
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setEditingJournal(null);
                            setShowModal(true);
                        }}
                        className="flex items-center gap-2 rounded-lg bg-teal-500 px-3 py-2 text-sm text-white hover:bg-teal-600"
                    >
                        <Plus size={16} />
                        Add
                    </button>
                </div>

                <div className="mt-6 max-h-100 space-y-3 overflow-y-auto pr-2">
                    {todayJournals?.journals.length ? (
                        todayJournals.journals.map((journal) => (
                            <JournalCard
                                key={journal.id}
                                journal={journal}
                                onEdit={(journal) => {
                                    setEditingJournal(journal);
                                    setShowModal(true);
                                }}
                                onDelete={(id) => setDeleteId(id)}
                            />
                        ))
                    ) : (
                        <p className="py-10 text-center text-slate-500">
                            No journal entries today.
                        </p>
                    )}
                </div>

                <div className="mt-6 border-t border-slate-200 pt-5">
                    <button
                        onClick={() => navigate("/journal")}
                        className="w-full rounded-lg border border-teal-500 py-3 text-sm text-teal-600 transition hover:bg-teal-50"
                    >
                        Manage Journals
                    </button>
                </div>
            </div>

            <JournalFormModal
                open={showModal}
                journal={editingJournal}
                onClose={() => {
                    setShowModal(false);
                    setEditingJournal(null);
                }}
                onSaved={() => {
                    loadJournals();
                    setShowModal(false);
                    setEditingJournal(null);
                }}
            />

            <ConfirmModal
                open={deleteId !== null}
                title="Delete Journal"
                message="Are you sure you want to delete this journal?"
                confirmText="Delete"
                loading={deleteLoading}
                onConfirm={handleDelete}
                onCancel={() => setDeleteId(null)}
            />
        </>
    );
};

export default QuickJournalCard;
