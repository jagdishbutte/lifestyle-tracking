interface ConfirmModalProps {
    open: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal = ({
    open,
    title,
    message,
    confirmText = "Delete",
    cancelText = "Cancel",
    loading = false,
    onConfirm,
    onCancel,
}: ConfirmModalProps) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="text-xl font-semibold text-slate-900">
                    {title}
                </h2>

                <p className="mt-3 text-slate-600">{message}</p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-xl border border-slate-300 px-5 py-2 transition hover:bg-slate-50"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="rounded-xl bg-red-600 px-5 py-2 text-white transition hover:bg-red-700 disabled:opacity-60"
                    >
                        {loading ? "Deleting..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
