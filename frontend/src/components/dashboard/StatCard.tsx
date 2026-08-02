import type { StatCardProps } from "../../types/dashboard";

const colorVariants = {
    teal: {
        bg: "bg-teal-50",
        text: "text-teal-600",
        progress: "bg-teal-500",
    },
    green: {
        bg: "bg-green-50",
        text: "text-green-600",
        progress: "bg-green-500",
    },
    amber: {
        bg: "bg-amber-50",
        text: "text-amber-600",
        progress: "bg-amber-500",
    },
};

const StatCard = ({
    title,
    current,
    target,
    unit,
    icon: Icon,
    color,
}: StatCardProps) => {
    const variant = colorVariants[color];

    const percentage =
        target === 0 ? 0 : Math.min(Math.round((current / target) * 100), 100);

    return (
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <div className="mt-1 flex items-end gap-2">
                        <h3 className="text-3xl font-bold tracking-tight text-slate-900">
                            {current}
                        </h3>

                        {unit && (
                            <span className="pb-1 text-sm font-medium text-slate-500">
                                {unit}
                            </span>
                        )}
                    </div>
                </div>

                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105 ${variant.bg}`}
                >
                    <Icon size={22} className={variant.text} />
                </div>
            </div>

            {/* Progress */}
            <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">
                        Progress
                    </span>

                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        {percentage}%
                    </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                        className={`h-full rounded-full transition-all duration-700 ${variant.progress}`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <div>
                    <p className="text-xs text-slate-400">Current</p>
                    <p className="text-sm font-semibold text-slate-700">
                        {current} {unit}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-xs text-slate-400">Target</p>
                    <p className="text-sm font-semibold text-slate-700">
                        {target} {unit}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
