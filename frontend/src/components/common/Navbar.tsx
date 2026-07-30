import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { UserResponse } from "../../types/profile";
import { useEffect, useRef, useState } from "react";
import { getProfile } from "../../services/profileService";
import { useAuthStore } from "../../store/authStore";

interface NavbarProps {
    onMenuClick?: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    const initials = `${user?.firstName?.charAt(0) ?? ""}${
        user?.lastName?.charAt(0) ?? ""
    }`.toUpperCase();

    useEffect(() => {
        getProfile().then((response) => {
            setUser(response.data);
        });
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white">
            <div className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
                    >
                        <Menu size={20} />
                    </button>

                    <Link
                        to="/dashboard"
                        className="text-xl font-bold text-teal-600"
                    >
                        LifeLens
                    </Link>
                </div>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 font-semibold text-white transition hover:bg-teal-700"
                    >
                        {initials}
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg z-50">
                            <div className="border-b border-slate-100 px-4 py-3">
                                <p className="font-semibold text-slate-800">
                                    {user?.firstName} {user?.lastName}
                                </p>
                                <p className="text-sm text-slate-500 truncate">
                                    {user?.email}
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    navigate("/profile");
                                    setIsOpen(false);
                                }}
                                className="w-full px-4 py-3 text-left text-sm hover:bg-slate-100"
                            >
                                👤 My Profile
                            </button>

                            <button
                                onClick={() => {
                                    // Add functionality later
                                    setIsOpen(false);
                                }}
                                className="w-full px-4 py-3 text-left text-sm hover:bg-slate-100"
                            >
                                🎯 My Goals
                            </button>

                            <button
                                onClick={() => {
                                    // Add functionality later
                                    setIsOpen(false);
                                }}
                                className="w-full px-4 py-3 text-left text-sm hover:bg-slate-100"
                            >
                                📊 Analytics
                            </button>

                            <div className="border-t border-slate-100">
                                <button
                                    onClick={() => {
                                        logout();
                                        navigate("/login");
                                    }}
                                    className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                                >
                                    🚪 Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
