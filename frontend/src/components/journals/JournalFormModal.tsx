import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Star } from "lucide-react";

import type { JournalRequest, JournalResponse } from "../../types/journal";

import { addJournal, updateJournal } from "../../services/journalService";

import { getErrorMessage } from "../../utils/errorHandler";

interface JournalFormModalProps {
    open: boolean;
    journal: JournalResponse | null;
    onClose: () => void;
    onSaved: () => void;
}

const userId = 6;

const JournalFormModal = ({
    open,
    journal,
    onClose,
    onSaved,
}: JournalFormModalProps) => {
    const isEdit = journal !== null;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [favourite, setFavourite] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!open) return;

        if (journal) {
            setTitle(journal.title);
            setContent(journal.content);
            setFavourite(journal.favourite);
        } else {
            setTitle("");
            setContent("");
            setFavourite(false);
        }
    }, [journal, open]);

    if (!open) return null;

    const handleSave = async () => {
        if (!title.trim()) {
            toast.error("Title is required.");
            return;
        }

        if (!content.trim()) {
            toast.error("Journal content is required.");
            return;
        }

        const request: JournalRequest = {
            userId,
            title,
            content,
            favourite,
        };

        try {
            setSaving(true);

            const response = isEdit
                ? await updateJournal(journal.id, request)
                : await addJournal(request);

            toast.success(response.message);

            onSaved();
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        {isEdit ? "Update Journal" : "New Journal"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-xl text-slate-500 hover:text-slate-700"
                    >
                        ×
                    </button>
                </div>

                <div className="mt-6 space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                    />

                    <textarea
                        rows={10}
                        placeholder="Write your thoughts..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                    />

                    <button
                        type="button"
                        onClick={() => setFavourite(!favourite)}
                        className={`flex items-center gap-2 rounded-xl border px-4 py-2 transition ${
                            favourite
                                ? "border-yellow-400 bg-yellow-50 text-yellow-600"
                                : "border-slate-300 text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                        <Star
                            size={18}
                            fill={favourite ? "currentColor" : "none"}
                        />

                        {favourite ? "Favourite" : "Mark Favourite"}
                    </button>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={saving}
                        className="rounded-xl border border-slate-300 px-5 py-2 hover:bg-slate-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="rounded-xl bg-teal-500 px-5 py-2 text-white hover:bg-teal-600 disabled:opacity-60"
                    >
                        {saving ? "Saving..." : isEdit ? "Update" : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JournalFormModal;
