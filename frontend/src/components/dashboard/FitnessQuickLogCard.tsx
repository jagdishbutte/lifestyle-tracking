import { useState } from "react";

import { workoutTypes } from "../../data/dashboard";

const FitnessQuickLogCard = () => {
    const [workoutType, setWorkoutType] =
        useState("Running");

    const [duration, setDuration] = useState("");

    const [caloriesBurned, setCaloriesBurned] =
        useState("");

    const [completed, setCompleted] =
        useState(true);

    const handleSave = () => {
        console.log({
            workoutType,
            duration,
            caloriesBurned,
            completed,
        });
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
                Workout Log
            </h2>

            <div className="mt-6 space-y-4">
                <select
                    value={workoutType}
                    onChange={(e) =>
                        setWorkoutType(
                            e.target.value
                        )
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                >
                    {workoutTypes.map((type) => (
                        <option
                            key={type}
                            value={type}
                        >
                            {type}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Duration (minutes)"
                    value={duration}
                    onChange={(e) =>
                        setDuration(
                            e.target.value
                        )
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                />

                <input
                    type="number"
                    placeholder="Calories Burned"
                    value={caloriesBurned}
                    onChange={(e) =>
                        setCaloriesBurned(
                            e.target.value
                        )
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                />

                <label className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={(e) =>
                            setCompleted(
                                e.target.checked
                            )
                        }
                    />

                    Workout Completed
                </label>

                <button
                    onClick={handleSave}
                    className="w-full rounded-xl bg-teal-500 py-3 text-white"
                >
                    Save Workout
                </button>
            </div>
        </div>
    );
};

export default FitnessQuickLogCard;