import type { StatCardProps } from "../../types/dashboard.types";

const colorVariants = {
    teal: {
        bg: "bg-teal-50",
        text: "text-teal-600",
    },

    green: {
        bg: "bg-green-50",
        text: "text-green-600",
    },

    amber: {
        bg: "bg-amber-50",
        text: "text-amber-600",
    },
};

const StatCard = ({
    title,
    value,
    description,
    icon: Icon,
    color = "teal",
}: StatCardProps) => {
    const variant = colorVariants[color];

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-slate-500">
                        {title}
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-slate-900">
                        {value}
                    </h3>

                    {description && (
                        <p className="mt-2 text-sm text-slate-500">
                            {description}
                        </p>
                    )}
                </div>

                <div
                    className={`rounded-xl p-3 ${variant.bg}`}
                >
                    <Icon
                        size={22}
                        className={variant.text}
                    />
                </div>
            </div>
        </div>
    );
};

export default StatCard;