import { Brain } from "lucide-react";

import { insights } from "../../data/dashboard";

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
                {insights.map((insight) => (
                    <div
                        key={insight.id}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                    >
                        <h3 className="font-medium">
                            {insight.title}
                        </h3>

                        <p className="mt-2 text-sm text-slate-600">
                            {insight.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AiInsightCard;