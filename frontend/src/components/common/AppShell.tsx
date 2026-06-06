import { type ReactNode, useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface AppShellProps {
    children: ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar
                onMenuClick={() =>
                    setSidebarOpen((prev) => !prev)
                }
            />

            <Sidebar isOpen={sidebarOpen} />

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <main className="p-6 lg:ml-64">
                {children}
            </main>
        </div>
    );
};

export default AppShell;