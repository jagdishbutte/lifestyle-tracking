import AppShell from "../components/common/AppShell";
import AiInsightCard from "../components/dashboard/AiInsightCard";
import FitnessQuickLogCard from "../components/dashboard/FitnessQuickLogCard";
import HabitTrackerCard from "../components/dashboard/HabitTrackerCard";
import QuickCheckInCard from "../components/dashboard/QuickCheckInCard";
import QuickExpenseCard from "../components/dashboard/QuickExpenseCard";
import QuickJournalCard from "../components/dashboard/QuickJournalCard";
import StatCard from "../components/dashboard/StatCard";
import { dashboardStats } from "../data/dashboard";

const DashboardPage = () => {
    return (
        <AppShell>
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>

                <p className="mt-2 text-slate-600">Welcome back, Jagdish.</p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {dashboardStats.map((stat) => (
                        <StatCard
                            key={stat.title}
                            title={stat.title}
                            value={stat.value}
                            description={stat.description}
                            icon={stat.icon}
                            color={stat.color as "teal" | "green" | "amber"}
                        />
                    ))}
                </div>

                <div className="mt-8 grid gap-6 xl:grid-cols-2">
                    <QuickCheckInCard />
                    <HabitTrackerCard />

                    <QuickExpenseCard />
                    <FitnessQuickLogCard />

                    <QuickJournalCard />
                    <AiInsightCard />
                </div>
            </div>
        </AppShell>
    );
};

export default DashboardPage;
