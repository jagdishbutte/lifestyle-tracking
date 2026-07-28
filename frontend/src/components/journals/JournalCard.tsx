import { Pencil, Star, Trash2 } from "lucide-react";

import type { JournalResponse } from "../../types/journal";

interface JournalCardProps {
    journal: JournalResponse;
    onEdit: (journal: JournalResponse) => void;
    onDelete: (journalId: number) => void;
}

const JournalCard = ({ journal, onEdit, onDelete }: JournalCardProps) => {
    return (
        <div className="rounded-xl border border-slate-200 p-4 transition hover:border-teal-300">
            <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="truncate font-semibold text-slate-900">
                            {journal.title}
                        </h3>

                        {journal.favourite && (
                            <Star
                                size={16}
                                className="fill-yellow-400 text-yellow-400"
                            />
                        )}
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                        {journal.content}
                    </p>
                </div>

                <div className="ml-4 flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => onEdit(journal)}
                        className="text-slate-500 transition hover:text-teal-600"
                    >
                        <Pencil size={18} />
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(journal.id)}
                        className="text-slate-500 transition hover:text-red-600"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JournalCard;
