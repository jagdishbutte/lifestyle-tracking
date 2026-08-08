import {
    Brain,
    ChartColumn,
    CircleDollarSign,
    LayoutDashboard,
    NotebookPen,
    Target,
    Salad,
    User,
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
    Diet: Salad,
    Expenses: CircleDollarSign,
    Journal: NotebookPen,
    Analytics: ChartColumn,
    "AI Assistant": Brain,
    Profile: User,
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    return (
        <aside
            className={`
                fixed left-0 top-16 z-40
                h-[calc(100vh-64px)]
                w-64
                overflow-y-auto
                border-r border-slate-200
                bg-slate-50
                transition-transform duration-300
                lg:translate-x-0
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}
        >
            <div className="p-4 space-y-5">
                {navigationGroups.map((group) => (
                    <section key={group.title}>
                        <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            {group.title}
                        </p>

                        <div className="space-y-1 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-200">
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
                                            group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200
                                            ${
                                                isActive
                                                    ? "bg-teal-500 text-white shadow-sm"
                                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                            }
                                            `
                                        }
                                    >
                                        <Icon
                                            size={19}
                                            className="shrink-0 transition-transform group-hover:scale-105"
                                        />

                                        <span className="truncate">
                                            {item.label}
                                        </span>
                                    </NavLink>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
