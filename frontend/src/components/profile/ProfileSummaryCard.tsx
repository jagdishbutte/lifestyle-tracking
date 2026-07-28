import { Activity, Briefcase, Target, User } from "lucide-react";

import type { UserResponse } from "../../types/profile";

interface ProfileSummaryCardProps {
    profile: UserResponse;
}

const ProfileSummaryCard = ({ profile }: ProfileSummaryCardProps) => {
    const age = profile.dateOfBirth
        ? new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear()
        : "-";

    const initials = `${profile.firstName[0]}${profile.lastName[0]}`;

    return (
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-teal-500 to-cyan-500 p-8 text-white shadow-sm">
            <div className="flex flex-col items-center gap-6 md:flex-row">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-3xl font-bold">
                    {initials}
                </div>

                <div className="flex-1">
                    <h2 className="text-3xl font-bold">
                        {profile.firstName} {profile.lastName}
                    </h2>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <div className="flex items-center gap-2">
                            <Briefcase size={18} />

                            <span>{profile.occupation || "Not specified"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <User size={18} />

                            <span>
                                {profile.gender} • {age} years
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Target size={18} />

                            <span>
                                {profile.weight} kg → {profile.targetWeight} kg
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Activity size={18} />

                            <span>
                                {profile.activityLevel?.replaceAll("_", " ")}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSummaryCard;
