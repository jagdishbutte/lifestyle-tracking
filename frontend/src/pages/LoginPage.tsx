import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { LoginRequest } from "../types/auth";
import toast from "react-hot-toast";
import { login } from "../services/authService";
import { getErrorMessage } from "../utils/errorHandler";
import { useAuthStore } from "../store/authStore";

const calorieData = [
    { day: "Mon", kcal: 2100 },
    { day: "Tue", kcal: 2400 },
    { day: "Wed", kcal: 1950 },
    { day: "Thu", kcal: 2600 },
    { day: "Fri", kcal: 2200 },
    { day: "Sat", kcal: 2800 },
    { day: "Sun", kcal: 2000 },
];

const goal = 2200;
const maxKcal = Math.max(...calorieData.map((day) => day.kcal), goal);
const avgKcal = Math.round(
    calorieData.reduce((sum, day) => sum + day.kcal, 0) / calorieData.length
);

const CalorieChart = () => (
    <div className="w-full">
        <div className="flex items-start justify-between gap-3">
            <div>
                <p className="text-xs font-medium text-teal-50/80">Calorie Intake</p>
                <p className="mt-0.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {avgKcal.toLocaleString()}
                    <span className="ml-1 text-xs font-medium text-teal-50/70 sm:text-sm">
                        avg kcal/day
                    </span>
                </p>
            </div>
            <span className="shrink-0 rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white sm:text-xs">
                Goal {goal.toLocaleString()}
            </span>
        </div>

        <div className="relative mt-5 flex h-28 items-end justify-between gap-1.5 sm:h-32 sm:gap-2">
            <div
                aria-hidden="true"
                className="absolute left-0 right-0 border-t border-dashed border-white/40"
                style={{ bottom: `${(goal / maxKcal) * 100}%` }}
            />

            {calorieData.map((day) => {
                const overGoal = day.kcal > goal;

                return (
                    <div
                        key={day.day}
                        className="group relative z-10 flex min-w-0 flex-1 flex-col items-center gap-1.5"
                    >
                        <span className="invisible text-[10px] font-medium text-white/90 group-hover:visible sm:text-[11px]">
                            {day.kcal}
                        </span>
                        <div className="flex h-20 w-full items-end overflow-hidden rounded-md bg-white/10 sm:h-24">
                            <div
                                className={`w-full rounded-md transition-all duration-300 ${
                                    overGoal
                                        ? "bg-teal-900/70"
                                        : "bg-gradient-to-t from-white to-teal-100"
                                }`}
                                style={{ height: `${(day.kcal / maxKcal) * 100}%` }}
                            />
                        </div>
                        <span className="text-[10px] font-medium text-teal-50/65 sm:text-[11px]">
                            {day.day}
                        </span>
                    </div>
                );
            })}
        </div>
    </div>
);

const LoginPage = () => {
    const [formData, setFormData] = useState<LoginRequest>({
        email: "",
        password: "",
    });
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData((previous) => ({
            ...previous,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setProcessing(true);
            const response = await login(formData);

            if (response.success) {
                toast.success(response.message);
                useAuthStore.getState().login(response.data.token);
                navigate("/dashboard");
            }
        } catch (error) {
            if (getErrorMessage(error) === "Bad credentials") {
                toast.error("Invalid email or password");
            } else {
                toast.error(getErrorMessage(error));
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 sm:p-5 lg:p-6">
            <div className="mx-auto flex min-h-screen max-w-7xl overflow-hidden bg-white sm:min-h-[calc(100vh-2.5rem)] sm:rounded-3xl sm:border sm:border-slate-200 sm:shadow-xl sm:shadow-slate-300/20 lg:min-h-[calc(100vh-3rem)]">
                <section className="relative hidden w-[46%] flex-col justify-between overflow-hidden bg-gradient-to-br from-teal-500 to-teal-600 p-7 md:flex lg:p-9">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                    <Link
                        to="/"
                        className="relative w-fit text-xl font-bold tracking-tight text-white transition hover:text-teal-50"
                    >
                        LifeTrack.AI
                    </Link>

                    <div className="relative py-8">
                        <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-teal-50">
                            Your daily overview
                        </span>
                        <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white lg:text-4xl">
                            Track what fuels you.
                        </h2>
                        <p className="mt-2 max-w-sm text-sm leading-6 text-teal-50/90 lg:text-base">
                            See how your daily intake stacks up against your goals,
                            automatically, every day.
                        </p>

                        <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md lg:mt-7 lg:p-5">
                            <CalorieChart />
                        </div>
                    </div>

                    <p className="relative text-xs text-teal-50/70 sm:text-sm">
                        © 2026 LifeTrack.AI
                    </p>
                </section>

                <section className="flex w-full items-center justify-center px-5 py-8 sm:px-8 sm:py-10 md:w-[54%] lg:px-12">
                    <div className="w-full max-w-sm">
                        <Link
                            to="/"
                            className="absolute left-5 top-5 inline-flex items-center gap-2 text-lg font-bold tracking-tight text-teal-600 transition hover:text-teal-700 md:hidden"
                        >
                            <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-50 text-sm">
                                ✦
                            </span>
                            LifeTrack.AI
                        </Link>

                        <div className="text-center md:text-left">
                            <p className="text-sm font-semibold text-teal-600">Welcome back</p>
                            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Sign in to your account
                            </h1>
                            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                                Continue your lifestyle journey from where you left off.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:mt-7 sm:space-y-5">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                    required
                                />
                            </div>

                            <div>
                                <div className="mb-1.5 flex items-center justify-between gap-3">
                                    <label htmlFor="password" className="text-sm font-medium text-slate-700">
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        className="text-xs font-semibold text-teal-600 transition hover:text-teal-700 sm:text-sm"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 py-3 text-sm font-semibold text-white shadow-md shadow-teal-500/25 transition duration-200 hover:-translate-y-0.5 hover:from-teal-600 hover:to-teal-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                {processing ? "Signing In..." : "Sign In"}
                            </button>

                            <div className="relative py-1">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-white px-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                                        Or
                                    </span>
                                </div>
                            </div>

                            <p className="text-center text-sm text-slate-600">
                                Don&apos;t have an account?{" "}
                                <Link
                                    to="/register"
                                    className="font-semibold text-teal-600 transition hover:text-teal-700"
                                >
                                    Create Account
                                </Link>
                            </p>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default LoginPage;
