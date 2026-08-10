import { Brain } from "lucide-react";

const gettingStarted = [
    {
        id: 1,
        title: "Complete your Daily Check-in",
        description:
            "Log your sleep, water intake, steps, and wellbeing every day to help AI understand your lifestyle.",
    },
    {
        id: 2,
        title: "Track Habits, Meals & Expenses",
        description:
            "Build consistent records of your habits, diet, and spending to unlock meaningful weekly insights.",
    },
    {
        id: 3,
        title: "Write a Journal Entry",
        description:
            "Reflect on your day in a few sentences. Your journal helps AI identify emotional and behavioral patterns.",
    },
];

const AiInsightCard = () => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-100 p-3">
                    <Brain
                        size={22}
                        className="text-amber-600"
                    />
                </div>

                <div>
                    <h2 className="text-xl font-semibold">
                        AI Insights
                    </h2>

                    <p className="text-sm text-slate-500">
                        Personalized recommendations
                    </p>
                </div>
            </div>

            <div className="mt-6 space-y-4">
                {gettingStarted.map((step) => (
                    <div
                        key={step.id}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-500 text-sm font-semibold text-white">
                                {step.id}
                            </div>

                            <h3 className="font-semibold text-slate-900">
                                {step.title}
                            </h3>
                        </div>

                        <p className="mt-3 pl-10 text-sm leading-6 text-slate-600">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AiInsightCard;