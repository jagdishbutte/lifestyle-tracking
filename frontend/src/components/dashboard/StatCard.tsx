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
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-slate-500">{title}</p>

                    <h3 className="mt-2 text-3xl font-bold text-slate-900">
                        {current} / {target}
                        {unit && ` ${unit}`}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                        {percentage}% completed
                    </p>
                </div>

                <div className={`rounded-xl p-3 ${variant.bg}`}>
                    <Icon size={22} className={variant.text} />
                </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${variant.progress}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default StatCard;
