import type { Dispatch, SetStateAction } from "react";

import type { ActivityLevel, UserResponse } from "../../types/profile";

import { formatEnum } from "../../utils/enumFormatter";

interface BodyInfoCardProps {
    profile: UserResponse;
    setProfile: Dispatch<SetStateAction<UserResponse | null>>;
}

const activityLevels: ActivityLevel[] = [
    "SEDENTARY",
    "LIGHT",
    "MODERATE",
    "ACTIVE",
    "VERY_ACTIVE"
];

const BodyInfoCard = ({ profile, setProfile }: BodyInfoCardProps) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">💪 Body Information</h2>

            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Height
                    </label>

                    <div className="relative">
                        <input
                            type="number"
                            value={profile.height}
                            onChange={(e) =>
                                setProfile((prev) => ({
                                    ...prev!,
                                    height: Number(e.target.value),
                                }))
                            }
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 focus:border-teal-500 focus:outline-none"
                        />

                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                            cm
                        </span>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Weight
                    </label>

                    <div className="relative">
                        <input
                            type="number"
                            value={profile.weight}
                            onChange={(e) =>
                                setProfile((prev) => ({
                                    ...prev!,
                                    weight: Number(e.target.value),
                                }))
                            }
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 focus:border-teal-500 focus:outline-none"
                        />

                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                            kg
                        </span>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Target Weight
                    </label>

                    <div className="relative">
                        <input
                            type="number"
                            value={profile.targetWeight}
                            onChange={(e) =>
                                setProfile((prev) => ({
                                    ...prev!,
                                    targetWeight: Number(e.target.value),
                                }))
                            }
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 focus:border-teal-500 focus:outline-none"
                        />

                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                            kg
                        </span>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Activity Level
                    </label>

                    <select
                        value={profile.activityLevel}
                        onChange={(e) =>
                            setProfile((prev) => ({
                                ...prev!,
                                activityLevel: e.target.value as ActivityLevel,
                            }))
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                    >
                        {activityLevels.map((level) => (
                            <option key={level} value={level}>
                                {formatEnum(level)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default BodyInfoCard;
