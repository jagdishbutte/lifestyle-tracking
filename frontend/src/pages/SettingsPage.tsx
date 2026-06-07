import { useState } from "react";

import AppShell from "../components/common/AppShell";

const SettingsPage = () => {
    const [
        notificationsEnabled,
        setNotificationsEnabled,
    ] = useState(true);

    const [
        aiInsightsEnabled,
        setAiInsightsEnabled,
    ] = useState(true);

    const [
        emailReportsEnabled,
        setEmailReportsEnabled,
    ] = useState(false);

    const [
        profileVisibility,
        setProfileVisibility,
    ] = useState("Private");

    const handleSave = () => {
        alert("Settings saved successfully.");
    };

    return (
        <AppShell>
            <div>
                <div>
                    <h1 className="text-3xl font-bold">
                        Settings
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Manage your preferences,
                        privacy, and account settings.
                    </p>
                </div>

                {/* Notifications */}

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-xl font-semibold">
                        Notifications
                    </h2>

                    <div className="space-y-5">
                        <label className="flex items-center justify-between">
                            <span>
                                Enable Notifications
                            </span>

                            <input
                                type="checkbox"
                                checked={
                                    notificationsEnabled
                                }
                                onChange={(e) =>
                                    setNotificationsEnabled(
                                        e.target
                                            .checked
                                    )
                                }
                            />
                        </label>

                        <label className="flex items-center justify-between">
                            <span>
                                Weekly Email Reports
                            </span>

                            <input
                                type="checkbox"
                                checked={
                                    emailReportsEnabled
                                }
                                onChange={(e) =>
                                    setEmailReportsEnabled(
                                        e.target
                                            .checked
                                    )
                                }
                            />
                        </label>
                    </div>
                </div>

                {/* AI Preferences */}

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-xl font-semibold">
                        AI Preferences
                    </h2>

                    <div className="space-y-5">
                        <label className="flex items-center justify-between">
                            <span>
                                Enable AI Insights
                            </span>

                            <input
                                type="checkbox"
                                checked={
                                    aiInsightsEnabled
                                }
                                onChange={(e) =>
                                    setAiInsightsEnabled(
                                        e.target
                                            .checked
                                    )
                                }
                            />
                        </label>
                    </div>
                </div>

                {/* Privacy */}

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-xl font-semibold">
                        Privacy
                    </h2>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Profile Visibility
                        </label>

                        <select
                            value={
                                profileVisibility
                            }
                            onChange={(e) =>
                                setProfileVisibility(
                                    e.target.value
                                )
                            }
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 md:w-64"
                        >
                            <option>
                                Private
                            </option>

                            <option>
                                Friends
                            </option>

                            <option>
                                Public
                            </option>
                        </select>
                    </div>
                </div>

                {/* Data Management */}

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-xl font-semibold">
                        Data Management
                    </h2>

                    <div className="flex flex-wrap gap-4">
                        <button className="rounded-xl border border-slate-300 px-5 py-3">
                            Export Data
                        </button>

                        <button className="rounded-xl border border-slate-300 px-5 py-3">
                            Download Report
                        </button>
                    </div>
                </div>

                {/* Danger Zone */}

                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">
                    <h2 className="mb-6 text-xl font-semibold text-red-600">
                        Danger Zone
                    </h2>

                    <div className="flex flex-wrap gap-4">
                        <button className="rounded-xl bg-red-500 px-5 py-3 text-white">
                            Delete Account
                        </button>

                        <button className="rounded-xl border border-red-300 px-5 py-3 text-red-600">
                            Logout
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    className="mt-6 rounded-xl bg-teal-500 px-6 py-3 text-white hover:bg-teal-600"
                >
                    Save Settings
                </button>
            </div>
        </AppShell>
    );
};

export default SettingsPage;