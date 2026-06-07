import { useState } from "react";

import AppShell from "../components/common/AppShell";

import { initialProfile } from "../data/profile";

import ProfileModal from "../components/profile/ProfileModal";

const ProfilePage = () => {
    const [profile, setProfile] =
        useState(initialProfile);

    const [showModal, setShowModal] =
        useState(false);

    return (
        <AppShell>
            <div>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Profile
                        </h1>

                        <p className="mt-2 text-slate-600">
                            Manage your personal information and preferences.
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            setShowModal(true)
                        }
                        className="rounded-xl bg-teal-500 px-5 py-3 text-white hover:bg-teal-600"
                    >
                        Edit Profile
                    </button>
                </div>

                {/* Personal Information */}

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-xl font-semibold">
                        Personal Information
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-slate-500">
                                Name
                            </p>

                            <p className="mt-1 font-medium">
                                {profile.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Email
                            </p>

                            <p className="mt-1 font-medium">
                                {profile.email}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Age
                            </p>

                            <p className="mt-1 font-medium">
                                {profile.age}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Gender
                            </p>

                            <p className="mt-1 font-medium">
                                {profile.gender}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Fitness */}

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-xl font-semibold">
                        Fitness Profile
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-slate-500">
                                Height
                            </p>

                            <p className="mt-1 font-medium">
                                {profile.height} cm
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Weight
                            </p>

                            <p className="mt-1 font-medium">
                                {profile.weight} kg
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Target Weight
                            </p>

                            <p className="mt-1 font-medium">
                                {profile.targetWeight} kg
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Activity Level
                            </p>

                            <p className="mt-1 font-medium">
                                {profile.activityLevel}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Financial */}

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-xl font-semibold">
                        Financial Profile
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-slate-500">
                                Monthly Income
                            </p>

                            <p className="mt-1 font-medium">
                                ₹{profile.monthlyIncome.toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Savings Goal
                            </p>

                            <p className="mt-1 font-medium">
                                ₹{profile.savingsGoal.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Preferences */}

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-xl font-semibold">
                        Preferences
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-slate-500">
                                AI Insights
                            </p>

                            <p className="mt-1 font-medium">
                                {profile.aiInsightsEnabled
                                    ? "Enabled"
                                    : "Disabled"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Notifications
                            </p>

                            <p className="mt-1 font-medium">
                                {profile.notificationsEnabled
                                    ? "Enabled"
                                    : "Disabled"}
                            </p>
                        </div>
                    </div>
                </div>

                <ProfileModal
                    isOpen={showModal}
                    profile={profile}
                    onClose={() =>
                        setShowModal(false)
                    }
                    onSave={setProfile}
                />
            </div>
        </AppShell>
    );
};

export default ProfilePage;