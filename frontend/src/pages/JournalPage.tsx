import { useMemo, useState } from "react";

import AppShell from "../components/common/AppShell";

import JournalModal from "../components/journals/JournalModal";

import { initialJournals } from "../data/journals";

import { type Journal } from "../types/journal.types";

const JournalPage = () => {
    const [journals, setJournals] = useState(initialJournals);

    const [search, setSearch] = useState("");

    const [selectedMood, setSelectedMood] = useState("All");

    const [showModal, setShowModal] = useState(false);

    const [editingJournal, setEditingJournal] = useState<Journal | null>(null);

    const filteredJournals = useMemo(() => {
        return journals.filter((journal) => {
            const matchesSearch =
                journal.title.toLowerCase().includes(search.toLowerCase()) ||
                journal.content.toLowerCase().includes(search.toLowerCase());

            const matchesMood =
                selectedMood === "All" || journal.mood === selectedMood;

            return matchesSearch && matchesMood;
        });
    }, [journals, search, selectedMood]);

    const saveJournal = (journalData: Omit<Journal, "id">) => {
        if (editingJournal) {
            setJournals((prev) =>
                prev.map((journal) =>
                    journal.id === editingJournal.id
                        ? {
                              ...journal,
                              ...journalData,
                          }
                        : journal,
                ),
            );

            setEditingJournal(null);

            return;
        }

        setJournals((prev) => [
            {
                id: Date.now(),
                ...journalData,
            },
            ...prev,
        ]);
    };

    const deleteJournal = (id: number) => {
        const confirmed = window.confirm("Delete this journal?");

        if (!confirmed) return;

        setJournals((prev) => prev.filter((journal) => journal.id !== id));
    };

    return (
        <AppShell>
            <div>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Journal</h1>

                        <p className="mt-2 text-slate-600">
                            Record your daily thoughts and reflections.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="rounded-xl bg-teal-500 px-5 py-3 text-white"
                    >
                        + New Entry
                    </button>
                </div>
                
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <input
                        type="text"
                        placeholder="Search journals..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="rounded-xl border px-4 py-3"
                    />

                    <select
                        value={selectedMood}
                        onChange={(e) => setSelectedMood(e.target.value)}
                        className="rounded-xl border px-4 py-3"
                    >
                        <option value="All">All Moods</option>

                        <option value="Happy">Happy</option>

                        <option value="Neutral">Neutral</option>

                        <option value="Sad">Sad</option>
                    </select>
                </div>

                <div className="mt-6 grid gap-6">
                    {filteredJournals.map((journal) => (
                        <div
                            key={journal.id}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">
                                    {journal.title}
                                </h2>

                                <span>{journal.mood}</span>
                            </div>

                            <p className="mt-4 text-slate-600">
                                {journal.content}
                            </p>

                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-sm text-slate-500">
                                    {journal.date}
                                </span>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setEditingJournal(journal);

                                            setShowModal(true);
                                        }}
                                        className="rounded-lg bg-amber-100 px-3 py-1 text-amber-700"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteJournal(journal.id)
                                        }
                                        className="rounded-lg bg-red-100 px-3 py-1 text-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <JournalModal
                    isOpen={showModal}
                    journal={editingJournal}
                    onClose={() => {
                        setShowModal(false);

                        setEditingJournal(null);
                    }}
                    onSave={saveJournal}
                />
            </div>
        </AppShell>
    );
};

export default JournalPage;
