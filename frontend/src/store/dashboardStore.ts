import { create } from "zustand";

interface DashboardStore {
    statUpdate: number;
    triggerRefresh: () => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
    statUpdate: 0,
    triggerRefresh: () =>
        set((state) => ({
            statUpdate: state.statUpdate + 1,
        })),
}));
