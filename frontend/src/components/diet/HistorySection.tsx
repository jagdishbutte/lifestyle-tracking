import type { DailyDietResponse, DietEntryResponse } from "../../types/diet";

import HistoryCard from "./HistoryCard";

interface HistorySectionProps {
    history: DailyDietResponse[];
    search: string;
    period: string;
    onSearchChange: (value: string) => void;
    onPeriodChange: (value: string) => void;
    onEditEntry: (entry: DietEntryResponse) => void;
    onDeleteEntry: (entryId: number) => void;
}

const HistorySection = ({
    history,
    search,
    period,
    onSearchChange,
    onPeriodChange,
    onEditEntry,
    onDeleteEntry,
}: HistorySectionProps) => {
    return (
        <div className="flex h-full flex-col">
            <div className="space-y-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search food..."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                />

                <select
                    value={period}
                    onChange={(e) => onPeriodChange(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                >
                    <option value="7">Last 7 Days</option>
                    <option value="30">Last Month</option>
                    <option value="90">Last Quarter</option>
                    <option value="365">Last Year</option>
                </select>
            </div>

            <div className="mt-5 flex-1 space-y-4 overflow-y-auto">
                {history.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-slate-500">
                        No history found.
                    </div>
                ) : (
                    history.map((day) => (
                        <HistoryCard
                            key={day.date}
                            day={day}
                            onEditEntry={onEditEntry}
                            onDeleteEntry={onDeleteEntry}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default HistorySection;
