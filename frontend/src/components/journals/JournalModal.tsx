import { useEffect, useState } from "react";

import { type Journal } from "../../types/journal.types";

interface Props {
    isOpen: boolean;

    journal: Journal | null;

    onClose: () => void;

    onSave: (
        journal: Omit<Journal, "id">
    ) => void;
}

const JournalModal = ({
    isOpen,
    journal,
    onClose,
    onSave,
}: Props) => {
    const [title, setTitle] =
        useState("");

    const [content, setContent] =
        useState("");

    const [mood, setMood] =
        useState<
            "Happy" | "Neutral" | "Sad"
        >("Happy");

    const [date, setDate] = useState(
        new Date()
            .toISOString()
            .split("T")[0]
    );

    useEffect(() => {
        if (journal) {
            setTitle(journal.title);
            setContent(journal.content);
            setMood(journal.mood);
            setDate(journal.date);
        } else {
            setTitle("");
            setContent("");
            setMood("Happy");
            setDate(
                new Date()
                    .toISOString()
                    .split("T")[0]
            );
        }
    }, [journal, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        onSave({
            title,
            content,
            mood,
            date,
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold">
                    {journal
                        ? "Edit Journal"
                        : "New Journal"}
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(
                                e.target.value
                            )
                        }
                        className="w-full rounded-xl border px-4 py-3"
                    />

                    <select
                        value={mood}
                        onChange={(e) =>
                            setMood(
                                e.target
                                    .value as
                                    | "Happy"
                                    | "Neutral"
                                    | "Sad"
                            )
                        }
                        className="w-full rounded-xl border px-4 py-3"
                    >
                        <option value="Happy">
                            😊 Happy
                        </option>

                        <option value="Neutral">
                            😐 Neutral
                        </option>

                        <option value="Sad">
                            😔 Sad
                        </option>
                    </select>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) =>
                            setDate(
                                e.target.value
                            )
                        }
                        className="w-full rounded-xl border px-4 py-3"
                    />

                    <textarea
                        rows={8}
                        placeholder="Write your thoughts..."
                        value={content}
                        onChange={(e) =>
                            setContent(
                                e.target.value
                            )
                        }
                        className="w-full rounded-xl border px-4 py-3"
                    />

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl border py-3"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex-1 rounded-xl bg-teal-500 py-3 text-white"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JournalModal;