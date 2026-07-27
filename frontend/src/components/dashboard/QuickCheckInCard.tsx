import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import type {
    DailyCheckInRequest,
    DailyCheckInResponse,
} from "../../types/checkin";

import { getErrorMessage } from "../../utils/errorHandler";
import {
    getTodayCheckIn,
    saveTodayCheckIn,
} from "../../services/checkInService";

const wellbeingOptions = [
    { score: 2, emoji: "😞" },
    { score: 4, emoji: "😕" },
    { score: 6, emoji: "😐" },
    { score: 8, emoji: "🙂" },
    { score: 10, emoji: "😄" },
];

const QuickCheckInCard = () => {
    const userId = 6;

    const [checkIn, setCheckIn] = useState<DailyCheckInResponse>({
        id: 0,
        date: "",

        sleepHours: 0,
        waterGlasses: 0,
        stepsWalked: 0,
        caloriesConsumed: 0,
        wellbeingScore: 8,

        sleepGoalHours: 8,
        waterGoalGlasses: 8,
        stepsGoal: 8000,
        dailyCalorieGoal: 2200,
    });

    const handleSave = async () => {
        const request: DailyCheckInRequest = {
            userId,
            sleepHours: checkIn.sleepHours,
            waterGlasses: checkIn.waterGlasses,
            stepsWalked: checkIn.stepsWalked,
            wellbeingScore: checkIn.wellbeingScore,
        };

        try {
            const response = await saveTodayCheckIn(request);

            if (response.success) {
                setCheckIn(response.data);
                toast.success(response.message);
            }
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    useEffect(() => {
        const loadCheckIn = async () => {
            try {
                const response = await getTodayCheckIn(userId);
                if (response.success) {
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
            <h2 className="text-xl font-semibold">Today's Check-In</h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm text-slate-600">
                        Sleep Hours
                    </label>

                    <input
                        type="number"
                        step="0.5"
                        min="0"
                        max="24"
                        value={checkIn.sleepHours}
                        onChange={(e) =>
                            setCheckIn({
                                ...checkIn,
                                sleepHours: Number(e.target.value),
                            })
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm text-slate-600">
                        Water Glasses
                    </label>

                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={checkIn.waterGlasses}
                        onChange={(e) =>
                            setCheckIn({
                                ...checkIn,
                                waterGlasses: Number(e.target.value),
                            })
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                    />
                </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm text-slate-600">
                        Steps Walked
                    </label>

                    <input
                        type="number"
                        min="0"
                        value={checkIn.stepsWalked}
                        onChange={(e) =>
                            setCheckIn({
                                ...checkIn,
                                stepsWalked: Number(e.target.value),
                            })
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm text-slate-600">
                        How's your day going?
                    </label>

                    {wellbeingOptions.map((item) => (
                        <button
                            key={item.score}
                            type="button"
                            onClick={() =>
                                setCheckIn({
                                    ...checkIn,
                                    wellbeingScore: item.score,
                                })
                            }
                            className={`rounded-xl border px-4 py-3 text-2xl transition
                                ${
                                    checkIn.wellbeingScore === item.score
                                        ? "border-teal-500 bg-teal-50"
                                        : "border-slate-200 hover:bg-slate-50"
                                }`}
                        >
                            {item.emoji}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={handleSave}
                className="mt-6 rounded-xl bg-teal-500 px-6 py-3 text-white transition hover:bg-teal-600"
            >
                Save Check-In
            </button>
        </div>
    );
};

export default QuickCheckInCard;
