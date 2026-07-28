import type { Dispatch, SetStateAction } from "react";

import type { CurrencyType, UserResponse } from "../../types/profile";

interface LifestyleCardProps {
    profile: UserResponse;
    setProfile: Dispatch<SetStateAction<UserResponse | null>>;
}

const currencies: CurrencyType[] = ["INR", "USD", "EUR", "GBP"];

const LifestyleCard = ({ profile, setProfile }: LifestyleCardProps) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">💼 Lifestyle</h2>

            <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium">
                        Occupation
                    </label>

                    <input
                        value={profile.occupation ?? ""}
                        onChange={(e) =>
                            setProfile((prev) => ({
                                ...prev!,
                                occupation: e.target.value,
                            }))
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Monthly Income
                    </label>

                    <div className="relative">
                        <input
                            type="number"
                            value={profile.monthlyIncome}
                            onChange={(e) =>
                                setProfile((prev) => ({
                                    ...prev!,
                                    monthlyIncome: Number(e.target.value),
                                }))
                            }
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 focus:border-teal-500 focus:outline-none"
                        />

                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                            {profile.currency}
                        </span>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Currency
                    </label>

                    <select
                        value={profile.currency}
                        onChange={(e) =>
                            setProfile((prev) => ({
                                ...prev!,
                                currency: e.target.value as CurrencyType,
                            }))
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                    >
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default LifestyleCard;
