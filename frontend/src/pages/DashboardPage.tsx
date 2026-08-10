import { useEffect, useState } from "react";
import {
    Moon,
    Droplets,
    Flame,
    CheckCircle2,
    MessageCircle,
    Brain,
} from "lucide-react";
import toast from "react-hot-toast";

import AppShell from "../components/common/AppShell";
import AiInsightCard from "../components/dashboard/AiInsightCard";
import QuickDietLogCard from "../components/dashboard/QuickDietLogCard";
import HabitTrackerCard from "../components/dashboard/HabitTrackerCard";
import QuickCheckInCard from "../components/dashboard/QuickCheckInCard";
import QuickExpenseCard from "../components/dashboard/QuickExpenseCard";
import QuickJournalCard from "../components/dashboard/QuickJournalCard";
import StatCard from "../components/dashboard/StatCard";
import { useDashboardStore } from "../store/dashboardStore";

import { getDashboardSummary } from "../services/dashboardService";
import { getErrorMessage } from "../utils/errorHandler";
import type { DashboardSummary, StatCardProps } from "../types/dashboard";
import { getProfile } from "../services/profileService";
import type { UserResponse } from "../types/profile";
import { useNavigate } from "react-router-dom";
import { useInsightStore } from "../store/insightStore";
import { getLatestInsights, refreshInsights } from "../services/aiService";

const DashboardPage = () => {
    const [user, setUser] = useState<UserResponse | null>(null);
    const { statUpdate } = useDashboardStore();
    const [summary, setSummary] = useState<DashboardSummary>({
        sleepHours: 0,
        sleepGoalHours: 8,

        waterGlasses: 0,
        waterGoalGlasses: 0,

        caloriesConsumed: 0,
        dailyCalorieGoal: 0,

        completedHabits: 0,
        totalHabits: 0,
    });
    const navigate = useNavigate();
    const { setInsights, setInsightsLoading } = useInsightStore();

    const loadInsights = async () => {
        try {
            const response = await getLatestInsights();

            if (response.success) {
                setInsights(response.data);
            } else {
                setInsights(null);
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const handleRefreshInsights = async () => {
        try {
            setInsightsLoading(true);

            const response = await refreshInsights();

            if (response.success) {
                toast.success("Insights refreshed successfully.");
                await loadInsights();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setInsightsLoading(false);
        }
    };

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const response = await getDashboardSummary();
                if (response.success) {
                    setSummary(response.data);
                }
                // console.log(summary);
            } catch (error) {
                toast.error(getErrorMessage(error));
            }
        };
        loadDashboard();
    }, [statUpdate]);

    useEffect(() => {
        getProfile().then((response) => {
            setUser(response.data);
        });
    }, []);

    useEffect(() => {
        loadInsights();
    }, []);

    const stats: StatCardProps[] = [
        {
            title: "Sleep",
            current: summary?.sleepHours ?? 0,
            target: summary?.sleepGoalHours ?? 0,
            unit: "hrs",
            icon: Moon,
            color: "teal",
        },
        {
            title: "Water",
            current: summary?.waterGlasses ?? 0,
            target: summary?.waterGoalGlasses ?? 0,
            unit: "glasses",
            icon: Droplets,
            color: "green",
        },
        {
            title: "Calories",
            current: summary?.caloriesConsumed ?? 0,
            target: summary?.dailyCalorieGoal ?? 0,
            unit: "kcal",
            icon: Flame,
            color: "amber",
        },
        {
            title: "Habits",
            current: summary?.completedHabits ?? 0,
            target: summary?.totalHabits ?? 0,
            icon: CheckCircle2,
            color: "teal",
        },
    ];

    const hasStartedDay =
        summary.sleepHours > 0 ||
        summary.waterGlasses > 0 ||
        summary.completedHabits > 0 ||
        summary.caloriesConsumed > 0;

    return (
        <AppShell>
            <div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Welcome back, {user?.firstName}! 👋
                        </h1>

                        <p className="mt-2 text-slate-600">
                            {hasStartedDay
                                ? "You're on track today. Keep it up!"
                                : "Complete today's check-in to get started."}
                        </p>
                    </div>

                    <div className="flex w-full gap-3 sm:w-auto">
                        <button
                            onClick={handleRefreshInsights}
                            className="group flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-700 shadow-sm transition hover:border-amber-300 hover:bg-amber-100 hover:text-amber-800 active:scale-[0.98] sm:flex-none"
                        >
                            <Brain
                                size={17}
                                className="transition-transform group-hover:rotate-6"
                            />
                            Refresh Insights
                        </button>

                        <button
                            onClick={() => navigate("/chat")}
                            className="group flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-sm font-semibold text-teal-700 shadow-sm transition hover:border-teal-300 hover:bg-teal-100 hover:text-teal-800 active:scale-[0.98] sm:flex-none"
                        >
                            <MessageCircle
                                size={17}
                                className="transition-transform group-hover:scale-110"
                            />
                            LifeStyle Coach
                        </button>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-6 xl:grid-cols-4">
                    {stats.map((stat) => (
                        <StatCard key={stat.title} {...stat} />
                    ))}
                </div>

                <div className="mt-8 grid gap-6 xl:grid-cols-2">
                    <QuickCheckInCard />
                    <HabitTrackerCard
                        completedHabits={summary.completedHabits}
                        totalHabits={summary.totalHabits}
                    />

                    <QuickExpenseCard />
                    <QuickDietLogCard />

                    <QuickJournalCard />
                    <AiInsightCard />
                </div>
            </div>
        </AppShell>
    );
};

export default DashboardPage;
