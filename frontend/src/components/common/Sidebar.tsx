import {
    Brain,
    ChartColumn,
    CircleDollarSign,
    LayoutDashboard,
    NotebookPen,
    Target,
    User,
    Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { navigationGroups } from "../../data/navigation";

interface SidebarProps {
    isOpen: boolean;
    onClose?: () => void;
}

const iconMap = {
    Dashboard: LayoutDashboard,
    Habits: Target,
    Goals: Target,
    Expenses: CircleDollarSign,
    Journal: NotebookPen,
    Analytics: ChartColumn,
    "AI Assistant": Brain,
    Profile: User,
    Settings: Settings,
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    return (
        <aside
            className={`
                fixed top-16 left-0 z-40
                h-[calc(100vh-64px)]
                w-64
                overflow-y-auto
                border-r border-slate-200
                bg-white
                transition-transform
                lg:translate-x-0
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}
        >
            <div className="p-4">
                {navigationGroups.map((group) => (
                    <div key={group.title} className="mb-6">
                        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                            {group.title}
                        </p>

                        {group.items.map((item) => {
                            const Icon =
                                iconMap[item.label as keyof typeof iconMap];

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={onClose}
                                    className={({ isActive }) =>
                                        `
                                        mb-1 flex items-center gap-3 rounded-xl px-4 py-3 transition
                                        ${
                                            isActive
                                                ? "bg-teal-50 text-teal-700"
                                                : "text-slate-700 hover:bg-slate-100"
                                        }
                                    `
                                    }
                                >
                                    <Icon size={18} />

                                    {item.label}
                                </NavLink>
                            );
                        })}
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
