import { useEffect, useState } from "react";

import { type Profile } from "../../types/profile.types";

interface ProfileModalProps {
    isOpen: boolean;

    profile: Profile;

    onClose: () => void;

    onSave: (profile: Profile) => void;
}

const ProfileModal = ({
    isOpen,
    profile,
    onClose,
    onSave,
}: ProfileModalProps) => {
    const [formData, setFormData] =
        useState(profile);

    useEffect(() => {
        setFormData(profile);
    }, [profile]);

    if (!isOpen) return null;

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } =
            e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "number"
                    ? Number(value)
                    : value,
        }));
    };

    const handleCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, checked } =
            e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleSubmit = (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        onSave(formData);

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">
                        Edit Profile
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-slate-500"
                    >
                        ✕
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >
                    {/* Personal */}

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">
                            Personal Information
                        </h3>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm">
                                    Name
                                </label>

                                <input
                                    name="name"
                                    value={
                                        formData.name
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full rounded-xl border px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm">
                                    Email
                                </label>

                                <input
                                    name="email"
                                    value={
                                        formData.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full rounded-xl border px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm">
                                    Age
                                </label>

                                <input
                                    type="number"
                                    name="age"
                                    value={
                                        formData.age
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full rounded-xl border px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm">
                                    Gender
                                </label>

                                <select
                                    name="gender"
                                    value={
                                        formData.gender
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full rounded-xl border px-4 py-3"
                                >
                                    <option>
                                        Male
                                    </option>

                                    <option>
                                        Female
                                    </option>

                                    <option>
                                        Other
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Fitness */}

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">
                            Fitness Profile
                        </h3>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm">
                                    Height (cm)
                                </label>

                                <input
                                    type="number"
                                    name="height"
                                    value={
                                        formData.height
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full rounded-xl border px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm">
                                    Weight (kg)
                                </label>

                                <input
                                    type="number"
                                    name="weight"
                                    value={
                                        formData.weight
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full rounded-xl border px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm">
                                    Target Weight
                                </label>

                                <input
                                    type="number"
                                    name="targetWeight"
                                    value={
                                        formData.targetWeight
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full rounded-xl border px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm">
                                    Activity Level
                                </label>

                                <select
                                    name="activityLevel"
                                    value={
                                        formData.activityLevel
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full rounded-xl border px-4 py-3"
                                >
                                    <option value="Sedentary">
                                        Sedentary
                                    </option>

                                    <option value="Light">
                                        Light
                                    </option>

                                    <option value="Moderate">
                                        Moderate
                                    </option>

                                    <option value="Active">
                                        Active
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Finance */}

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">
                            Financial Profile
                        </h3>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm">
                                    Monthly Income
                                </label>

                                <input
                                    type="number"
                                    name="monthlyIncome"
                                    value={
                                        formData.monthlyIncome
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full rounded-xl border px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm">
                                    Savings Goal
                                </label>

                                <input
                                    type="number"
                                    name="savingsGoal"
                                    value={
                                        formData.savingsGoal
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full rounded-xl border px-4 py-3"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">
                            Preferences
                        </h3>

                        <div className="space-y-4">
                            <label className="flex items-center justify-between">
                                <span>
                                    Enable AI Insights
                                </span>

                                <input
                                    type="checkbox"
                                    name="aiInsightsEnabled"
                                    checked={
                                        formData.aiInsightsEnabled
                                    }
                                    onChange={
                                        handleCheckboxChange
                                    }
                                />
                            </label>

                            <label className="flex items-center justify-between">
                                <span>
                                    Enable Notifications
                                </span>

                                <input
                                    type="checkbox"
                                    name="notificationsEnabled"
                                    checked={
                                        formData.notificationsEnabled
                                    }
                                    onChange={
                                        handleCheckboxChange
                                    }
                                />
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border px-5 py-3"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl bg-teal-500 px-5 py-3 text-white"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileModal;