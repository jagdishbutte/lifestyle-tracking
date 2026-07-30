import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AppShell from "../components/common/AppShell";

import ProfileSummaryCard from "../components/profile/ProfileSummaryCard";
import BasicInfoCard from "../components/profile/BasicInfoCard";
import BodyInfoCard from "../components/profile/BodyInfoCard";
import LifestyleCard from "../components/profile/LifestyleCard";
import DailyGoalsCard from "../components/profile/DailyGoalsCard";
import SaveProfileBar from "../components/profile/SaveProfileBar";
import { getProfile, updateProfile } from "../services/profileService";
import type { UpdateProfileRequest, UserResponse } from "../types/profile";
import { getErrorMessage } from "../utils/errorHandler";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const loadProfile = async () => {
        try {
            setLoading(true);

            const response = await getProfile();

            if (response.success) {
                setProfile(response.data);
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const handleSave = async () => {
        if (!profile) return;

        const request: UpdateProfileRequest = {
            gender: profile.gender,
            dateOfBirth: profile.dateOfBirth,

            height: profile.height,
            weight: profile.weight,
            targetWeight: profile.targetWeight,

            activityLevel: profile.activityLevel,

            occupation: profile.occupation,

            monthlyIncome: profile.monthlyIncome,

            currency: profile.currency,

            sleepGoalHours: profile.sleepGoalHours,

            waterGoalGlasses: profile.waterGoalGlasses,

            stepsGoal: profile.stepsGoal,

            dailyCalorieGoal: profile.dailyCalorieGoal,
        };

        try {
            setSaving(true);

            const response = await updateProfile(request);

            toast.success(response.message);

            setProfile(response.data);
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <AppShell>
                <div className="py-20 text-center text-slate-500">
                    Loading profile...
                </div>
            </AppShell>
        );
    }

    if (!profile) {
        return (
            <AppShell>
                <div className="py-20 text-center text-red-500">
                    Failed to load profile.
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <div className="mx-auto max-w-6xl">
                {/* Header */}

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100"
                        >
                            <ArrowLeft size={20} />
                        </button>

                        <div>
                            <h1 className="text-3xl font-bold">My Profile</h1>

                            <p className="mt-1 text-slate-600">
                                Manage your personal information, lifestyle and
                                daily goals.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 space-y-6">
                    <ProfileSummaryCard profile={profile} />

                    <BasicInfoCard profile={profile} setProfile={setProfile} />

                    <BodyInfoCard profile={profile} setProfile={setProfile} />

                    <LifestyleCard profile={profile} setProfile={setProfile} />

                    <DailyGoalsCard profile={profile} setProfile={setProfile} />

                    <SaveProfileBar saving={saving} onSave={handleSave} />
                </div>
            </div>
        </AppShell>
    );
};

export default ProfilePage;
