import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

interface NavbarProps {
    onMenuClick?: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
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

                <div className="flex items-center gap-4">
                    <button className="rounded-full bg-slate-100 px-3 py-2 text-sm">
                        Jagdish
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
