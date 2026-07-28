import { useEffect, useState } from "react";
import { Moon, Droplets, Flame, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

import AppShell from "../components/common/AppShell";
import AiInsightCard from "../components/dashboard/AiInsightCard";
import QuickDietLogCard from "../components/dashboard/QuickDietLogCard";
import HabitTrackerCard from "../components/dashboard/HabitTrackerCard";
import QuickCheckInCard from "../components/dashboard/QuickCheckInCard";
import QuickExpenseCard from "../components/dashboard/QuickExpenseCard";
import QuickJournalCard from "../components/dashboard/QuickJournalCard";
import StatCard from "../components/dashboard/StatCard";

import { getDashboardSummary } from "../services/dashboardService";
import { getErrorMessage } from "../utils/errorHandler";

import type { DashboardSummary, StatCardProps } from "../types/dashboard";

const DashboardPage = () => {
    const userId = 6; // Replace after authentication

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

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const response = await getDashboardSummary(userId);
                if (response.success) {
                    setSummary(response.data);
                }
                // console.log(summary);
            } catch (error) {
                toast.error(getErrorMessage(error));
            }
        };
        loadDashboard();
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

    return (
        <AppShell>
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>

                <p className="mt-2 text-slate-600">Welcome back, Jagdish.</p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => (
                        <StatCard key={stat.title} {...stat} />
                    ))}
                </div>

                <div className="mt-8 grid gap-6 xl:grid-cols-2">
                    <QuickCheckInCard />
                    <HabitTrackerCard />

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
