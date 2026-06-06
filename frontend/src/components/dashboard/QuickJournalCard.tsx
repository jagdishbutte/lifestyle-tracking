import { useState } from "react";

import { journalPrompt } from "../../data/dashboard";

const QuickJournalCard = () => {
    const [journal, setJournal] = useState("");

    const handleSave = () => {
        console.log({
            journal,
        });

        setJournal("");
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
                Daily Reflection
            </h2>

            <p className="mt-1 text-sm text-slate-500">
                {journalPrompt}
            </p>

            <textarea
                rows={6}
                value={journal}
                onChange={(e) =>
                    setJournal(e.target.value)
                }
                placeholder="Write your thoughts..."
                className="mt-4 w-full resize-none rounded-xl border border-slate-300 p-4 focus:border-teal-500 focus:outline-none"
            />

            <button
                onClick={handleSave}
                className="mt-4 w-full rounded-xl bg-teal-500 py-3 text-white transition hover:bg-teal-600"
            >
                Save Journal
            </button>
        </div>
    );
};

export default QuickJournalCard;