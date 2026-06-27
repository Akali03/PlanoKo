import { useNavigate } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";

function Navbar({ user, onMenuToggle, menuOpen }) {
    const navigate = useNavigate();

    return (
        <nav className="flex items-center justify-between px-4 md:px-6 py-3 bg-light shadow-sm border-b border-slate-500">
            <div className="flex items-center gap-3">
                <button
                    className="md:hidden text-slate-400 hover:text-primary"
                    onClick={onMenuToggle}
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
                <h1 className="text-sm font-bold text-primary md:text-xl">PlanoKo</h1>
            </div>

            <div className="relative w-full max-w-md hidden md:block mx-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full border border-primary bg-main rounded-3xl pl-9 pr-4 py-2 focus:outline-none focus:border-primary text-sm"
                />
            </div>
         {/* Mobile Search */}
            <div className="md:hidden px-4 py-3 bg-ligh">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full border border-primary bg-main rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none"
                    />
                </div>
            </div>
            <img
                src={user?.picture}
                alt={user?.name}
                onClick={() => navigate("/profile")}
                className="w-9 h-9 rounded-full cursor-pointer hover:ring-2 hover:ring-primary shrink-0"
            />
        
        </nav>
    );
}

export default Navbar;
