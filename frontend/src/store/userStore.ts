import { create } from "zustand";
import { getProfile } from "../services/profileService";
import type { UserResponse } from "../types/profile";

interface UserState {
    user: UserResponse | null;
    loading: boolean;
    fetchUser: () => Promise<void>;
    setUser: (user: UserResponse) => void;
    updateUser: (user: UserResponse) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    loading: false,

    fetchUser: async () => {
        try {
            set({
                loading: true,
            });

            const response = await getProfile();

            if (response.success) {
                set({
                    user: response.data,
                });
            }
        } finally {
            set({
                loading: false,
            });
        }
    },

    setUser: (user) =>
        set({
            user,
        }),

    updateUser: (user) =>
        set({
            user,
        }),

    clearUser: () =>
        set({
            user: null,
        }),
}));
