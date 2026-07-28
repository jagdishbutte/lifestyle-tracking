import type { Dispatch, SetStateAction } from "react";

import type { Gender, UserResponse } from "../../types/profile";

interface BasicInfoCardProps {
    profile: UserResponse;
    setProfile: Dispatch<SetStateAction<UserResponse | null>>;
}

const genders: Gender[] = ["MALE", "FEMALE", "OTHER"];

const BasicInfoCard = ({ profile, setProfile }: BasicInfoCardProps) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">👤 Basic Information</h2>

            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        First Name
                    </label>

                    <input
                        value={profile.firstName}
                        disabled
                        className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Last Name
                    </label>

                    <input
                        value={profile.lastName}
                        disabled
                        className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium">
                        Email
                    </label>

                    <input
                        value={profile.email}
                        disabled
                        className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Gender
                    </label>

                    <select
                        value={profile.gender}
                        onChange={(e) =>
                            setProfile((prev) => ({
                                ...prev!,
                                gender: e.target.value as Gender,
                            }))
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                    >
                        {genders.map((gender) => (
                            <option key={gender} value={gender}>
                                {gender
                                    .replaceAll("_", " ")
                                    .toLowerCase()
                                    .replace(/^\w/, (c) => c.toUpperCase())}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Date of Birth
                    </label>

                    <input
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) =>
                            setProfile((prev) => ({
                                ...prev!,
                                dateOfBirth: e.target.value,
                            }))
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-teal-500 focus:outline-none"
                    />
                </div>
            </div>
        </div>
    );
};

export default BasicInfoCard;
