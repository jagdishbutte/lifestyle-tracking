export interface NavigationItem {
    label: string;
    path: string;
}

export interface NavigationGroup {
    title: string;
    items: NavigationItem[];
}

export const navigationGroups: NavigationGroup[] = [
    {
        title: "Overview",
        items: [
            {
                label: "Dashboard",
                path: "/dashboard",
            },
        ],
    },

    {
        title: "Lifestyle",
        items: [
            {
                label: "Habits",
                path: "/habits",
            },
            {
                label: "Goals",
                path: "/goals",
            },
        ],
    },

    {
        title: "Finance",
        items: [
            {
                label: "Expenses",
                path: "/expenses",
            },
        ],
    },

    {
        title: "Personal",
        items: [
            {
                label: "Journal",
                path: "/journal",
            },
        ],
    },

    {
        title: "Insights",
        items: [
            {
                label: "Analytics",
                path: "/analytics",
            },
            {
                label: "AI Assistant",
                path: "/ai",
            },
        ],
    },

    {
        title: "Settings",
        items: [
            {
                label: "Profile",
                path: "/profile",
            },
        ],
    },
];