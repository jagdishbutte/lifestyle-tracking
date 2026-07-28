import JournalHistoryCard from "./JournalHistoryCard";

import type {
    DailyJournalResponse,
    JournalResponse,
} from "../../types/journal";

interface JournalHistorySectionProps {
    history: DailyJournalResponse[];
    onEditJournal: (journal: JournalResponse) => void;
    onDeleteJournal: (journalId: number) => void;
}

const JournalHistorySection = ({
    history,
    onEditJournal,
    onDeleteJournal,
}: JournalHistorySectionProps) => {

    if (history.length === 0) {
        return (
            <p className="py-10 text-center text-slate-500">
                No journal history found.
            </p>
        );
    }

    return (
        <div className="space-y-4">

            {history.map((day) => (
                <JournalHistoryCard
                    key={day.date}
                    day={day}
                    onEditJournal={onEditJournal}
                    onDeleteJournal={onDeleteJournal}
                />
            ))}

        </div>
    );
};

export default JournalHistorySection;