import type { DailyDietResponse, DietEntryResponse } from "../../types/diet";
import HistoryCard from "./HistoryCard";

interface HistorySectionProps {
    history: DailyDietResponse[];
    onEditEntry: (entry: DietEntryResponse) => void;
    onDeleteEntry: (id: number) => void;
}

const HistorySection = ({
    history,
    onEditEntry,
    onDeleteEntry,
}: HistorySectionProps) => {
    if (history.length === 0) {
        return (
            <p className="py-10 text-center text-slate-500">
                No history found.
            </p>
        );
    }

    return (
        <div className="space-y-4">
            {history.map((day) => (
                <HistoryCard
                    key={day.date}
                    day={day}
                    onEditEntry={onEditEntry}
                    onDeleteEntry={onDeleteEntry}
                />
            ))}
        </div>
    );
};

export default HistorySection;