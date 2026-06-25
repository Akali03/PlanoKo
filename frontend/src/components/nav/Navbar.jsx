import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function Navbar({ user }) {
    const navigate = useNavigate();

    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-light shadow-sm border-b border-slate-500">
            <h1 className="text-xl font-bold text-primary">PlanoKo</h1>

            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full border border-primary bg-main rounded-3xl pl-9 pr-4 py-2 focus:outline-none focus:border-primary text-sm"
                />
            </div>

            <img
                src={user?.picture}
                alt={user?.name}
                onClick={() => navigate("/profile")}
                className="w-9 h-9 rounded-full cursor-pointer hover:ring-2 hover:ring-primary"
            />
        </nav>
    );
}

export default Navbar;
