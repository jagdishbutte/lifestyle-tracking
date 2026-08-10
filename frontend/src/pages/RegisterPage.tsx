import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { RegisterFormData, RegisterRequest } from "../types/auth";
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";
import { getErrorMessage } from "../utils/errorHandler";

const moodData = [
    { emoji: "😊", label: "Good", value: 72, color: "bg-white" },
    { emoji: "😌", label: "Calm", value: 54, color: "bg-teal-100" },
    { emoji: "😐", label: "Okay", value: 38, color: "bg-teal-200" },
];

const MoodPreview = () => (
    <div className="w-full">
        <div className="flex items-start justify-between gap-3">
            <div>
                <p className="text-xs font-medium text-teal-50/80">
                    Mood Check-In
                </p>
                <p className="mt-0.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Feeling good
                </p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white sm:text-xs">
                This week
            </span>
        </div>

        <div className="mt-5 space-y-3">
            {moodData.map((mood) => (
                <div key={mood.label} className="flex items-center gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 text-lg">
                        {mood.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                        <div className="mb-1 flex justify-between text-[11px] font-medium text-teal-50/75">
                            <span>{mood.label}</span>
                            <span>{mood.value}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                            <div
                                className={`h-full rounded-full ${mood.color}`}
                                style={{ width: `${mood.value}%` }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const RegisterPage = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        setFormData((previous) => ({
            ...previous,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            setProcessing(true);
            const request: RegisterRequest = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
            };

            const response = await registerUser(request);

            if (response.success) {
                toast.success(response.message);
                navigate("/login");
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
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
                            Your daily reflection
                        </span>
                        <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white lg:text-4xl">
                            Understand how you feel.
                        </h2>
                        <p className="mt-2 max-w-sm text-sm leading-6 text-teal-50/90 lg:text-base">
                            Notice patterns in your mood and build healthier
                            days, one check-in at a time.
                        </p>

                        <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md lg:mt-7 lg:p-5">
                            <MoodPreview />
                        </div>
                    </div>

                    <p className="relative text-xs text-teal-50/70 sm:text-sm">
                        © 2026 LifeTrack.AI
                    </p>
                </section>

                <section className="flex w-full items-center justify-center px-5 py-8 sm:px-8 sm:py-10 md:w-[54%] lg:px-12">
                    <div className="w-full max-w-md">
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
                            <p className="text-sm font-semibold text-teal-600">
                                Join LifeTrack.AI
                            </p>
                            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Create your account
                            </h1>
                            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                                Start your lifestyle improvement journey today.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 space-y-4 sm:mt-7 sm:space-y-5"
                        >
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="firstName"
                                        className="mb-1.5 block text-sm font-medium text-slate-700"
                                    >
                                        First name
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        autoComplete="given-name"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="lastName"
                                        className="mb-1.5 block text-sm font-medium text-slate-700"
                                    >
                                        Last name
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        autoComplete="family-name"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        required
                                    />
                                </div>
                            </div>

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

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="mb-1.5 block text-sm font-medium text-slate-700"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="mb-1.5 block text-sm font-medium text-slate-700"
                                    >
                                        Confirm password
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 py-3 text-sm font-semibold text-white shadow-md shadow-teal-500/25 transition duration-200 hover:-translate-y-0.5 hover:from-teal-600 hover:to-teal-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                {processing
                                    ? "Creating Account..."
                                    : "Create Account"}
                            </button>

                            <p className="text-center text-sm text-slate-600">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-semibold text-teal-600 transition hover:text-teal-700"
                                >
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default RegisterPage;
