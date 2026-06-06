import type { Habit } from "../../types/habit.types";

interface HabitCardProps {
    habit: Habit;
    onToggle: (id: number) => void;
}

const HabitCard = ({
    habit,
    onToggle,
}: HabitCardProps) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold">
                        {habit.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        🔥 {habit.streak} day streak
                    </p>
                </div>

                <button
                    onClick={() =>
                        onToggle(habit.id)
                    }
                    className={`rounded-xl px-4 py-2 text-sm font-medium
                    ${
                        habit.completedToday
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-700"
                    }`}
                >
                    {habit.completedToday
                        ? "Completed"
                        : "Mark Done"}
                </button>
            </div>
        </div>
    );
};

export default HabitCard;