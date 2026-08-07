import { useEffect, useRef, useState } from "react";
import { Check, MoreHorizontal, Pencil, Trash2, X } from "lucide-react";

import ConfirmModal from "../common/ConfirmModal";

type ChatHistoryItemProps = {
    sessionId: string;
    title: string;
    active?: boolean;

    onClick: () => void;

    onRename: (sessionId: string, title: string) => Promise<void>;

    onDelete: (sessionId: string) => Promise<void>;
};

const ChatHistoryItem = ({
    sessionId,
    title,
    active = false,
    onClick,
    onRename,
    onDelete,
}: ChatHistoryItemProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setNewTitle(title);
    }, [title]);

    useEffect(() => {
        const close = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", close);

        return () => document.removeEventListener("mousedown", close);
    }, []);

    const handleRename = async () => {
        if (!newTitle.trim() || newTitle === title) {
            setEditing(false);
            return;
        }

        setLoading(true);

        await onRename(sessionId, newTitle.trim());

        setLoading(false);
        setEditing(false);
    };

    const handleDelete = async () => {
        setLoading(true);

        await onDelete(sessionId);

        setLoading(false);

        setDeleteOpen(false);
    };

    return (
        <>
            <div
                className={`group flex items-center justify-between rounded-xl px-3 py-3 transition ${
                    active ? "bg-teal-100" : "hover:bg-slate-100"
                }`}
            >
                {editing ? (
                    <input
                        autoFocus
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="flex-1 bg-transparent outline-none"
                    />
                ) : (
                    <button
                        onClick={onClick}
                        className="flex-1 truncate text-left"
                    >
                        {title}
                    </button>
                )}

                <div ref={menuRef} className="relative ml-2">
                    {editing ? (
                        <div className="flex gap-1">
                            <button onClick={handleRename}>
                                <Check size={16} />
                            </button>

                            <button
                                onClick={() => {
                                    setEditing(false);
                                    setNewTitle(title);
                                }}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="rounded-lg p-1 opacity-0 transition group-hover:opacity-100 hover:bg-slate-200"
                            >
                                <MoreHorizontal size={18} />
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 top-8 z-20 w-36 rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                                    <button
                                        onClick={() => {
                                            setEditing(true);
                                            setMenuOpen(false);
                                        }}
                                        className="flex w-full items-center gap-2 px-3 py-2 hover:bg-slate-100"
                                    >
                                        <Pencil size={16} />
                                        Rename
                                    </button>

                                    <button
                                        onClick={() => {
                                            setDeleteOpen(true);
                                            setMenuOpen(false);
                                        }}
                                        className="flex w-full items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <ConfirmModal
                open={deleteOpen}
                title="Delete Chat"
                message="This conversation will be permanently deleted."
                loading={loading}
                onCancel={() => setDeleteOpen(false)}
                onConfirm={handleDelete}
            />
        </>
    );
};

export default ChatHistoryItem;
