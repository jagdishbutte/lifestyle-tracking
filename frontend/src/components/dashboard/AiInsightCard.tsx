import { Brain, Lightbulb } from "lucide-react";

import { useInsightStore } from "../../store/insightStore";

const gettingStarted = [
    {
        id: 1,
        title: "Complete your Daily Check-in",
        description:
            "Log your sleep, water intake, steps and wellbeing consistently.",
    },
    {
        id: 2,
        title: "Track Daily Activities",
        description:
            "Record your habits, meals, expenses and journal entries every day.",
    },
    {
        id: 3,
        title: "Refresh Weekly Insights",
        description:
            "Generate AI-powered recommendations after a few days of consistent tracking.",
    },
];

const AiInsightCard = () => {
    const { insights } = useInsightStore();

    const hasInsights =
        insights?.recommendations && insights.recommendations.length === 3;

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-100 p-3">
                    <Brain size={22} className="text-amber-600" />
                </div>

                <div>
                    <h2 className="text-xl font-semibold">LifeTrack Smart</h2>

                    <p className="text-sm text-slate-500">
                        Personalized recommendations
                    </p>
                </div>
            </div>

            <div className="mt-6 space-y-4">
                {hasInsights
                    ? insights.recommendations.map((recommendation, index) => (
                          <div
                              key={index}
                              className="rounded-xl border border-amber-100 bg-amber-50 p-4"
                          >
                              <div className="flex items-start gap-3">
                                  <div className="rounded-lg bg-amber-100 p-2">
                                      <Lightbulb
                                          size={18}
                                          className="text-amber-600"
                                      />
                                  </div>

                                  <div>
                                      <p className="mt-2 text-sm leading-6 text-slate-600">
                                          {recommendation}
                                      </p>
                                  </div>
                              </div>
                          </div>
                      ))
                    : gettingStarted.map((step) => (
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