import { features } from "../data/landing.ts";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <h1 className="text-xl font-bold text-teal-600">
                        LifestyleAI
                    </h1>

                    <div className="flex gap-3">
                        <button className="rounded-lg border border-slate-300 px-4 py-2">
                            Login
                        </button>

                        <button className="rounded-lg bg-teal-500 px-4 py-2 text-white hover:bg-teal-600">
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    <div>
                        <span className="rounded-full bg-teal-100 px-4 py-2 text-sm font-medium text-teal-700">
                            AI Lifestyle Intelligence Platform
                        </span>

                        <h1 className="mt-6 text-5xl font-bold leading-tight lg:text-6xl">
                            Transform Your Lifestyle Through Data & AI
                        </h1>

                        <p className="mt-6 max-w-xl text-lg text-slate-600">
                            Track habits, expenses, sleep, goals, and journals
                            while receiving intelligent insights to improve your
                            daily life.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <button className="rounded-xl bg-teal-500 px-6 py-3 font-medium text-white hover:bg-teal-600">
                                Start Tracking
                            </button>
                        </div>
                    </div>

                    {/* Image Placeholder */}
                    <div className="flex h-[300px] md:h-[450px] items-center justify-center rounded-3xl bg-white shadow-sm">
                        <img
                            src="/images/hero.jpg"
                            alt="hero-image"
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="mx-auto max-w-7xl px-6 py-12">
                <div className="text-center">
                    <h2 className="text-4xl font-bold">Everything You Need</h2>

                    <p className="mt-4 text-slate-600">
                        A single platform for wellness, productivity, and
                        financial awareness.
                    </p>
                </div>

                <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <h3 className="text-xl font-semibold">
                                {feature.title}
                            </h3>

                            <p className="mt-3 text-slate-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-6xl px-6 py-12">
                <div className="rounded-3xl bg-teal-500 p-12 text-center text-white">
                    <h2 className="text-4xl font-bold">
                        Start Building Better Habits Today
                    </h2>

                    <p className="mt-4 text-teal-50">
                        Take control of your lifestyle, finances, and personal
                        growth.
                    </p>

                    <button className="mt-8 rounded-xl bg-white px-6 py-3 font-medium text-teal-600">
                        Get Started
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-200 py-8 text-center text-slate-500">
                © 2026 Lifestyle Intelligence Platform
            </footer>
        </div>
    );
};

export default LandingPage;
