interface SaveProfileBarProps {
    saving: boolean;
    onSave: () => void;
}

const SaveProfileBar = ({ saving, onSave }: SaveProfileBarProps) => {
    return (
        <div className="sticky bottom-0 z-20 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-lg backdrop-blur">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={onSave}
                    disabled={saving}
                    className="rounded-xl bg-teal-500 px-8 py-3 font-medium text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );
};

export default SaveProfileBar;
