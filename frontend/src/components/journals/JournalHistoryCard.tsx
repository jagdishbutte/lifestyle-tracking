import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import JournalCard from "./JournalCard";

import type {
    DailyJournalResponse,
    JournalResponse,
} from "../../types/journal";

interface JournalHistoryCardProps {
    day: DailyJournalResponse;
    onEditJournal: (journal: JournalResponse) => void;
    onDeleteJournal: (journalId: number) => void;
}

const JournalHistoryCard = ({
    day,
    onEditJournal,
    onDeleteJournal,
}: JournalHistoryCardProps) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="rounded-2xl border border-slate-200 bg-white">
            <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="flex w-full items-center justify-between p-5 text-left"
            >
                <div>
                    <h3 className="font-semibold">
                        {new Date(day.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        {day.entryCount} entr
                        {day.entryCount === 1 ? "y" : "ies"}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {expanded ? (
                        <ChevronUp size={20} />
                    ) : (
                        <ChevronDown size={20} />
                    )}
                </div>
            </button>

            {expanded && (
                <div className="space-y-3 border-t border-slate-200 p-5">
                    {day.journals.map((journal) => (
                        <JournalCard
                            key={journal.id}
                            journal={journal}
                            onEdit={onEditJournal}
                            onDelete={onDeleteJournal}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default JournalHistoryCard;
