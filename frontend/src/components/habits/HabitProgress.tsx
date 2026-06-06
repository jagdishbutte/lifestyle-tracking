interface HabitProgressProps {
    completed: number;
    total: number;
}

const HabitProgress = ({
    completed,
    total,
}: HabitProgressProps) => {
    const percentage =
        total === 0 ? 0 : (completed / total) * 100;

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    Today's Progress
                </h2>

                <span className="text-sm text-slate-500">
                    {completed}/{total}
                </span>
            </div>

            <div className="mt-4 h-3 rounded-full bg-slate-200">
                <div
                    className="h-3 rounded-full bg-teal-500"
                    style={{
                        width: `${percentage}%`,
                    }}
                />
            </div>

            <p className="mt-3 text-sm text-slate-500">
                {percentage.toFixed(0)}% completed
            </p>
        </div>
    );
};

export default HabitProgress;