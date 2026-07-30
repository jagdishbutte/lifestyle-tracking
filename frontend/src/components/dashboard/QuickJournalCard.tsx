import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
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
import JournalCard from '../journals/JournalCard';

const QuickJournalCard = () => {
    const navigate = useNavigate();
    const [todayJournals, setTodayJournals] = useState<DailyJournalResponse | null>(null);
    const [editingJournal, setEditingJournal] = useState<JournalResponse | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

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
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 p-5">
                    <div>
                        <h2 className="text-xl font-semibold">
                            Today's Journal
                        </h2>

                        <p className="mt-1 text-slate-500">
                            {todayJournals?.entryCount ?? 0} Entries
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            setEditingJournal(null);
                            setShowModal(true);
                        }}
                        className="flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2 text-white hover:bg-teal-600"
                    >
                        <Plus size={18} />
                        Add
                    </button>
                </div>

                <div className="max-h-[55vh] space-y-3 overflow-y-auto p-5">
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

                <div className="border-t border-slate-200 p-5">
                    <button
                        onClick={() => navigate("/journal")}
                        className="w-full rounded-xl border border-teal-500 py-3 text-teal-600 transition hover:bg-teal-50"
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
                // loadingText="Deleting..."
                onConfirm={handleDelete}
                onCancel={() => setDeleteId(null)}
            />
        </>
    );
};

export default QuickJournalCard;
