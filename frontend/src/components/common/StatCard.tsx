interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
}

const StatCard = ({
    title,
    value,
    subtitle,
}: StatCardProps) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
                {title}
            </p>

            <h2 className="mt-2 text-3xl font-bold text-teal-600">
                {value}
            </h2>

            {subtitle && (
                <p className="mt-2 text-sm text-slate-500">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default StatCard;