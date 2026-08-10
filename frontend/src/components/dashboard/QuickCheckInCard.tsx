import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HeartPulse } from "lucide-react";

import type {
    DailyCheckInRequest,
    DailyCheckInResponse,
} from "../../types/checkin";

import { getErrorMessage } from "../../utils/errorHandler";
import {
    getTodayCheckIn,
    saveTodayCheckIn,
} from "../../services/checkInService";
import { useDashboardStore } from "../../store/dashboardStore";
import { useInsightStore } from "../../store/insightStore";

const wellbeingOptions = [
    { score: 1, emoji: "😞", label: "Bad" },
    { score: 2, emoji: "😕", label: "Low" },
    { score: 3, emoji: "😐", label: "Okay" },
    { score: 4, emoji: "😊", label: "Good" },
    { score: 5, emoji: "😁", label: "Great" },
];

const QuickCheckInCard = () => {
    const defaultCheckIn: DailyCheckInResponse = {
        id: 0,
        date: "",

        sleepHours: 0,
        waterGlasses: 0,
        stepsWalked: 0,
        caloriesConsumed: 0,
        wellbeingScore: 3,

        sleepGoalHours: 8,
        waterGoalGlasses: 8,
        stepsGoal: 8000,
        dailyCalorieGoal: 2200,
    };
    const [checkIn, setCheckIn] =
        useState<DailyCheckInResponse>(defaultCheckIn);
    const [processing, setProcessing] = useState(false);
    const { triggerRefresh } = useDashboardStore();
    const { insights, insightsLoading } = useInsightStore();

    const handleSave = async () => {
        if (!checkIn) return;

        const request: DailyCheckInRequest = {
            sleepHours: checkIn.sleepHours,
            waterGlasses: checkIn.waterGlasses,
            stepsWalked: checkIn.stepsWalked,
            wellbeingScore: checkIn.wellbeingScore,
        };

        try {
            setProcessing(true);
            const response = await saveTodayCheckIn(request);

            if (response.success) {
                setCheckIn(response.data);
                toast.success(response.message);
                triggerRefresh();
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setProcessing(false);
        }
    };

    useEffect(() => {
        const loadCheckIn = async () => {
            try {
                const response = await getTodayCheckIn();

                if (response.success && response.data) {
                    setCheckIn(response.data);
                }
            } catch (error) {
                toast.error(getErrorMessage(error));
            }
        };

        loadCheckIn();
    }, []);

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="overflow-hidden rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 via-white to-cyan-50 shadow-[0_4px_20px_rgba(20,184,166,0.08)]">
                <div className="flex items-start gap-3 border-l-4 border-teal-500 px-4 py-3">
                    <span className="mt-0.5 shrink-0 text-xl text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.9)]">
                        ✨
                    </span>

                    {insightsLoading ? (
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-full animate-pulse rounded-md bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
                            <div className="h-4 w-5/6 animate-pulse rounded-md bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
                        </div>
                    ) : (
                        <p className="text-md leading-6 tracking-tight text-slate-800">
                            {insights?.insights.checkins ??
                                "No insights available yet. Keep logging your activities consistently to unlock personalized AI insights."}
                        </p>
                    )}
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-teal-100 p-3">
                        <HeartPulse size={22} className="text-teal-600" />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">
                            Today's Check-In
                        </h2>

                        <p className="text-sm text-slate-500">
                            Update today's wellness metrics
                        </p>
                    </div>
                </div>

                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-600">
                    Daily
                </span>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <label className="font-medium text-slate-700">
                            😴 Sleep Hours
                        </label>

                        <span className="text-sm text-slate-500">
                            Goal: {checkIn.sleepGoalHours} hrs
                        </span>
                    </div>

                    <div className="flex overflow-hidden rounded-xl border border-slate-200">
                        <button
                            type="button"
                            onClick={() =>
                                setCheckIn({
                                    ...checkIn,
                                    sleepHours: Math.max(
                                        0,
                                        Number(
                                            (checkIn.sleepHours - 0.5).toFixed(
                                                1,
                                            ),
                                        ),
                                    ),
                                })
                            }
                            className="flex h-12 w-12 items-center justify-center border-r border-slate-200 bg-slate-50 text-lg font-semibold transition hover:bg-slate-100"
                        >
                            −
                        </button>

                        <div className="flex flex-1 flex-col items-center justify-center bg-white">
                            <span className="text-2xl font-semibold text-slate-900">
                                {checkIn.sleepHours}
                            </span>

                            <span className="text-xs text-slate-500">
                                hours
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setCheckIn({
                                    ...checkIn,
                                    sleepHours: Math.min(
                                        24,
                                        Number(
                                            (checkIn.sleepHours + 0.5).toFixed(
                                                1,
                                            ),
                                        ),
                                    ),
                                })
                            }
                            className="flex h-12 w-12 items-center justify-center border-l border-slate-200 bg-slate-50 text-lg font-semibold transition hover:bg-slate-100"
                        >
                            +
                        </button>
                    </div>
                </div>

                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <label className="font-medium text-slate-700">
                            💧 Water Glasses
                        </label>

                        <span className="text-sm text-slate-500">
                            Goal: {checkIn.waterGoalGlasses} glasses
                        </span>
                    </div>

                    <div className="flex overflow-hidden rounded-xl border border-slate-200">
                        <button
                            type="button"
                            onClick={() =>
                                setCheckIn({
                                    ...checkIn,
                                    waterGlasses: Math.max(
                                        0,
                                        checkIn.waterGlasses - 1,
                                    ),
                                })
                            }
                            className="flex h-12 w-12 items-center justify-center border-r border-slate-200 bg-slate-50 text-lg font-semibold transition hover:bg-slate-100"
                        >
                            −
                        </button>

                        <div className="flex flex-1 flex-col items-center justify-center bg-white">
                            <span className="text-2xl font-semibold text-slate-900">
                                {checkIn.waterGlasses}
                            </span>

                            <span className="text-xs text-slate-500">
                                glasses
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setCheckIn({
                                    ...checkIn,
                                    waterGlasses: checkIn.waterGlasses + 1,
                                })
                            }
                            className="flex h-12 w-12 items-center justify-center border-l border-slate-200 bg-slate-50 text-lg font-semibold transition hover:bg-slate-100"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                    <label className="font-medium text-slate-700">
                        🙂 Today's Mood
                    </label>

                    <span className="text-sm text-slate-500">Select One</span>
                </div>

                <div className="flex justify-between">
                    {wellbeingOptions.map((item) => (
                        <button
                            key={item.score}
                            type="button"
                            title={item.label}
                            onClick={() =>
                                setCheckIn({
                                    ...checkIn,
                                    wellbeingScore: item.score,
                                })
                            }
                            className={`group relative flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-200
                ${
                    checkIn.wellbeingScore === item.score
                        ? "scale-105 border-teal-500 bg-teal-50 shadow-sm"
                        : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                }`}
                        >
                            <span className="text-2xl">{item.emoji}</span>

                            {/* Tooltip */}
                            <span
                                className="
                        pointer-events-none
                        absolute
                        -bottom-8
                        whitespace-nowrap
                        rounded-md
                        bg-slate-800
                        px-2
                        py-1
                        text-xs
                        text-white
                        opacity-0
                        transition-opacity
                        group-hover:opacity-100
                    "
                            >
                                {item.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                    <label className="font-medium text-slate-700">
                        👟 Steps Walked
                    </label>

                    <span className="text-sm text-slate-500">Goal: 10,000</span>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <div className="mb-3 flex items-center justify-between">
                        <span className="text-2xl font-semibold text-slate-900">
                            {checkIn.stepsWalked.toLocaleString()}
                        </span>

                        <span className="text-sm font-medium text-teal-900">
                            {Math.round((checkIn.stepsWalked / 10000) * 100)}%
                        </span>
                    </div>

                    <input
                        type="range"
                        min={0}
                        max={10000}
                        step={100}
                        value={checkIn.stepsWalked}
                        onChange={(e) =>
                            setCheckIn({
                                ...checkIn,
                                stepsWalked: Number(e.target.value),
                            })
                        }
                        className="mt-1 h-2 w-full cursor-pointer accent-teal-700"
                    />

                    <div className="mt-2 flex justify-between text-xs text-slate-500">
                        <span>0</span>
                        <span>10k</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-center">
                <button
                    onClick={handleSave}
                    className="rounded-xl bg-teal-500 px-8 py-3 font-medium text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {processing ? "Saving..." : "Save Check-In"}
                </button>
            </div>
        </div>
    );
};

export default QuickCheckInCard;
