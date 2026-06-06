import { useState } from "react";
import { Link } from "react-router-dom";
import type { LoginFormData } from "../types/auth.types";

const LoginPage = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        console.log("Login Data:", formData);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Sign in to continue your lifestyle journey.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="text-sm font-medium">
                                Password
                            </label>

                            <button
                                type="button"
                                className="text-sm text-teal-600 hover:text-teal-700"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-teal-500 py-3 font-medium text-white transition hover:bg-teal-600"
                    >
                        Sign In
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200" />
                        </div>

                        <div className="relative flex justify-center">
                            <span className="bg-white px-3 text-sm text-slate-500">
                                OR
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-full rounded-xl border border-slate-300 py-3 font-medium transition hover:bg-slate-50"
                    >
                        Continue with Google
                    </button>

                    <p className="text-center text-sm text-slate-600">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-medium text-teal-600 hover:text-teal-700"
                        >
                            Create Account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;