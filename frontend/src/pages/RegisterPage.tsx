import { useState } from "react";
import { Link } from "react-router-dom";
import type { RegisterFormData } from "../types/auth.types";

const RegisterPage = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",

        age: "",
        gender: "",

        heightCm: "",
        weightKg: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        console.log("Registration Data:", formData);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-10">
            <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
                <h1 className="text-3xl font-bold text-center">
                    Create Account
                </h1>

                <p className="mt-2 text-center text-slate-600">
                    Start your lifestyle improvement journey.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={formData.age}
                            onChange={handleChange}
                            className="rounded-xl border border-slate-300 px-4 py-3"
                        />

                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="rounded-xl border border-slate-300 px-4 py-3"
                        >
                            <option value="">
                                Select Gender
                            </option>

                            <option value="MALE">
                                Male
                            </option>

                            <option value="FEMALE">
                                Female
                            </option>

                            <option value="OTHER">
                                Other
                            </option>
                        </select>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <input
                            type="number"
                            name="heightCm"
                            placeholder="Height (cm)"
                            value={formData.heightCm}
                            onChange={handleChange}
                            className="rounded-xl border border-slate-300 px-4 py-3"
                        />

                        <input
                            type="number"
                            name="weightKg"
                            placeholder="Weight (kg)"
                            value={formData.weightKg}
                            onChange={handleChange}
                            className="rounded-xl border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-teal-500 py-3 font-medium text-white hover:bg-teal-600"
                    >
                        Create Account
                    </button>

                    <p className="text-center text-sm text-slate-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-teal-600"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;