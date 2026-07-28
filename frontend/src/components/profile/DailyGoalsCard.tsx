import type { Dispatch, SetStateAction } from "react";
import type { UserResponse } from "../../types/profile";

interface DailyGoalsCardProps {
    profile: UserResponse;
    setProfile: Dispatch<SetStateAction<UserResponse | null>>;
}

const DailyGoalsCard = ({ profile, setProfile }: DailyGoalsCardProps) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">🎯 Daily Goals</h2>

            <div className="grid gap-5 md:grid-cols-2">
                {/* Sleep */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Sleep Goal
                    </label>

                    <div className="relative">
                        <input
                            type="number"
                            step="0.5"
                            value={profile.sleepGoalHours}
                            onChange={(e) =>
                                setProfile((prev) => ({
                                    ...prev!,
                                    sleepGoalHours: Number(e.target.value),
                                }))
                            }
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-16 focus:border-teal-500 focus:outline-none"
                        />

                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                            hrs
                        </span>
                    </div>
                </div>

                {/* Water */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Water Goal
                    </label>

                    <div className="relative">
                        <input
                            type="number"
                            value={profile.waterGoalGlasses}
                            onChange={(e) =>
                                setProfile((prev) => ({
                                    ...prev!,
                                    waterGoalGlasses: Number(e.target.value),
                                }))
                            }
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-20 focus:border-teal-500 focus:outline-none"
                        />

                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                            glasses
                        </span>
                    </div>
                </div>

                {/* Steps */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Daily Steps
                    </label>

                    <div className="relative">
                        <input
                            type="number"
                            value={profile.stepsGoal}
                            onChange={(e) =>
                                setProfile((prev) => ({
                                    ...prev!,
                                    stepsGoal: Number(e.target.value),
                                }))
                            }
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-20 focus:border-teal-500 focus:outline-none"
                        />

                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                            steps
                        </span>
                    </div>
                </div>

                {/* Calories */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Daily Calories
                    </label>

                    <div className="relative">
                        <input
                            type="number"
                            value={profile.dailyCalorieGoal}
                            onChange={(e) =>
                                setProfile((prev) => ({
                                    ...prev!,
                                    dailyCalorieGoal: Number(e.target.value),
                                }))
                            }
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-16 focus:border-teal-500 focus:outline-none"
                        />

                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                            kcal
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyGoalsCard;
