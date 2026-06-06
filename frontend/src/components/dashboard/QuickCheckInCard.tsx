import { useState } from "react";

import { todayCheckIn } from "../../data/dashboard";

const moods = [
    {
        label: "happy",
        emoji: "😊",
    },
    {
        label: "neutral",
        emoji: "😐",
    },
    {
        label: "sad",
        emoji: "😔",
    },
] as const;

const QuickCheckInCard = () => {
    const [sleepHours, setSleepHours] = useState(
        todayCheckIn.sleepHours
    );

    const [waterIntake, setWaterIntake] = useState(
        todayCheckIn.waterIntake
    );

    const [mood, setMood] = useState(todayCheckIn.mood);

    const handleSave = () => {
        console.log({
            sleepHours,
            waterIntake,
            mood,
        });
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
                Today's Check-In
            </h2>

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
                        value={sleepHours}
                        onChange={(e) =>
                            setSleepHours(
                                Number(e.target.value)
                            )
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm text-slate-600">
                        Water Intake (L)
                    </label>

                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={waterIntake}
                        onChange={(e) =>
                            setWaterIntake(
                                Number(e.target.value)
                            )
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                    />
                </div>
            </div>

            <div className="mt-6">
                <label className="mb-3 block text-sm text-slate-600">
                    Mood
                </label>

                <div className="flex gap-3">
                    {moods.map((item) => (
                        <button
                            key={item.label}
                            type="button"
                            onClick={() =>
                                setMood(item.label)
                            }
                            className={`rounded-xl border px-4 py-3 text-2xl transition
                                ${
                                    mood === item.label
                                        ? "border-teal-500 bg-teal-50"
                                        : "border-slate-200 hover:bg-slate-50"
                                }
                            `}
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