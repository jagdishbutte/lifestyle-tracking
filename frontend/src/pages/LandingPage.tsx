import { Link } from "react-router-dom";
import { features } from "../data/landing.ts";

const sleepData = [
    { day: "Mon", hours: 6.5 },
    { day: "Tue", hours: 7.2 },
    { day: "Wed", hours: 5.8 },
    { day: "Thu", hours: 8.1 },
    { day: "Fri", hours: 7.4 },
    { day: "Sat", hours: 8.8 },
    { day: "Sun", hours: 7.9 },
];

const avgSleep = (
    sleepData.reduce((sum, d) => sum + d.hours, 0) / sleepData.length
).toFixed(1);

const maxSleep = Math.max(...sleepData.map((d) => d.hours));

const SleepChart = () => (
    <div className="flex h-full w-full flex-col rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">
                    Sleep This Week
                </p>
                <p className="mt-1 text-3xl font-bold text-slate-900">
                    {avgSleep}
                    <span className="ml-1 text-base font-medium text-slate-400">
                        avg hrs
                    </span>
                </p>
            </div>

            <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
                +12% vs last week
            </span>
        </div>

        <div className="mt-6 flex flex-1 items-end justify-between gap-3">
            {sleepData.map((d) => (
                <div
                    key={d.day}
                    className="group flex flex-1 flex-col items-center gap-2"
                >
                    <span className="text-xs font-medium text-slate-400 opacity-0 transition group-hover:opacity-100">
                        {d.hours}h
                    </span>

                    <div className="flex h-36 w-full items-end overflow-hidden rounded-md bg-slate-100">
                        <div
                            className="w-full rounded-md bg-gradient-to-t from-teal-600 to-teal-400 transition-all group-hover:from-teal-700 group-hover:to-teal-500"
                            style={{
                                height: `${(d.hours / (maxSleep + 1)) * 100}%`,
                            }}
                        />
                    </div>

                    <span className="text-xs font-medium text-slate-500">
                        {d.day}
                    </span>
                </div>
            ))}
        </div>
    </div>
);

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
                <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
                    <h1 className="text-xl font-bold text-teal-600">
                        LifeTrack.AI
                    </h1>

                    <div className="flex gap-3">
                        <Link to="/login">
                            <button className="rounded-lg border border-slate-300 px-4 py-1.5 text-sm">
                                Login
                            </button>
                        </Link>

                        <Link to="/register">
                            <button className="rounded-lg bg-teal-500 px-4 py-1.5 text-sm text-white hover:bg-teal-600">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="mx-auto max-w-7xl px-6 pb-10 pt-8">
                <div className="grid items-center gap-10 lg:grid-cols-2">
                    <div>
                        <span className="rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-700">
                            AI Lifestyle Intelligence Platform
                        </span>

                        <h1 className="mt-4 text-4xl font-bold leading-tight lg:text-5xl">
                            Transform Your Lifestyle Through Data & AI
                        </h1>

                        <p className="mt-4 max-w-xl text-lg text-slate-600">
                            Track habits, expenses, sleep, goals, and journals
                            while receiving intelligent insights to improve
                            your daily life.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-4">
                            <Link to="/login">
                                <button className="rounded-xl bg-teal-500 px-6 py-3 font-medium text-white hover:bg-teal-600">
                                    Start Tracking
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="h-[320px]">
                        <SleepChart />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="mx-auto max-w-7xl px-6 py-10">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Everything You Need</h2>

                    <p className="mt-2 text-slate-600">
                        A single platform for wellness, productivity, and
                        financial awareness.
                    </p>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <h3 className="text-lg font-semibold">
                                {feature.title}
                            </h3>

                            <p className="mt-2 text-sm text-slate-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-6xl px-6 pb-10">
                <div className="rounded-3xl bg-teal-500 p-10 text-center text-white">
                    <h2 className="text-3xl font-bold">
                        Start Building Better Habits Today
                    </h2>

                    <p className="mt-3 text-teal-50">
                        Take control of your lifestyle, finances, and personal
                        growth.
                    </p>

                    <Link to="/login">
                        <button className="mt-6 rounded-xl bg-white px-6 py-3 font-medium text-teal-600">
                            Get Started
                        </button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-200 py-5 text-center text-sm text-slate-500">
                © 2026 Lifestyle Intelligence Platform
            </footer>
        </div>
    );
};

export default LandingPage;