import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AppShell from "../components/common/AppShell";
import ConfirmModal from "../components/common/ConfirmModal";

import JournalFormModal from "../components/journals/JournalFormModal";
import JournalCard from "../components/journals/JournalCard";
import JournalHistorySection from "../components/journals/JournalHistorySection";

import {
    deleteJournal,
    getJournalHistory,
    getTodayJournals,
} from "../services/journalService";

import type { DailyJournalResponse, JournalResponse } from "../types/journal";

import { getErrorMessage } from "../utils/errorHandler";

const userId = 6;

const JournalPage = () => {
    const navigate = useNavigate();
    const [todayJournals, setTodayJournals] =
        useState<DailyJournalResponse | null>(null);
    const [history, setHistory] = useState<DailyJournalResponse[]>([]);
    const [period, setPeriod] = useState(7);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingJournal, setEditingJournal] =
        useState<JournalResponse | null>(null);
    const [deleteJournalId, setDeleteJournalId] = useState<number | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const loadTodayJournals = async () => {
        try {
            const response = await getTodayJournals(userId);

            if (response.success) {
                setTodayJournals(response.data);
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const loadHistory = async () => {
        try {
            const response = await getJournalHistory(userId, period);

            if (response.success) {
                setHistory(response.data);
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    useEffect(() => {
        loadTodayJournals();
    }, []);

    useEffect(() => {
        loadHistory();
    }, [period]);

    const filteredHistory = history.filter((day) => {
        if (!search.trim()) return true;

        const keyword = search.toLowerCase();

        return day.journals.some(
            (journal) =>
                journal.title.toLowerCase().includes(keyword) ||
                journal.content.toLowerCase().includes(keyword),
        );
    });

    const handleDelete = async () => {
        if (!deleteJournalId) return;

        try {
            setDeleteLoading(true);

            const response = await deleteJournal(deleteJournalId);

            toast.success(response.message);

            await loadTodayJournals();
            await loadHistory();

            setDeleteJournalId(null);
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
                            <h1 className="text-3xl font-bold">Journal</h1>

                            <p className="mt-1 text-slate-600">
                                Capture your thoughts and reflections.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid gap-6 xl:grid-cols-2">
                    {/* Today's Journals */}

                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-200 p-5">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Today's Journals
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
                                className="rounded-xl bg-teal-500 px-5 py-2 text-white hover:bg-teal-600"
                            >
                                + Add Journal
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
                                        onDelete={(id) =>
                                            setDeleteJournalId(id)
                                        }
                                    />
                                ))
                            ) : (
                                <p className="py-10 text-center text-slate-500">
                                    No journals today.
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
                                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
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
                                placeholder="Search journal..."
                                className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                            />
                        </div>

                        <div className="max-h-[55vh] overflow-y-auto p-5">
                            <JournalHistorySection
                                history={filteredHistory}
                                onEditJournal={(journal) => {
                                    setEditingJournal(journal);
                                    setShowModal(true);
                                }}
                                onDeleteJournal={(id) => setDeleteJournalId(id)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <JournalFormModal
                open={showModal}
                journal={editingJournal}
                onClose={() => {
                    setShowModal(false);
                    setEditingJournal(null);
                }}
                onSaved={async () => {
                    await loadTodayJournals();
                    await loadHistory();

                    setShowModal(false);
                    setEditingJournal(null);
                }}
            />

            <ConfirmModal
                open={deleteJournalId !== null}
                title="Delete Journal"
                message="Are you sure you want to delete this journal?"
                confirmText="Delete"
                loading={deleteLoading}
                // loadingText="Deleting..."
                onConfirm={handleDelete}
                onCancel={() => setDeleteJournalId(null)}
            />
        </AppShell>
    );
};

export default JournalPage;
