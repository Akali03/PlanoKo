import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { LogOut, Mail, Calendar, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Profile() {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const API_URL = `${import.meta.env.VITE_API_URL}`;
    const handleLogout = async () => {
        try {
            await fetch(`${API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            googleLogout();
            setUser(null);
            navigate("/");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const joinedDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : null;

    return (
        <div className="min-h-screen bg-main font-sans">
            <div className="max-w-lg mx-auto pt-16 px-6">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary mb-6 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </button>

                <div className="bg-light rounded-2xl shadow-lg p-8 text-center">
                    <img
                        src={user?.picture}
                        alt={user?.name}
                        className="w-24 h-24 rounded-full mx-auto ring-4 ring-primary/20"
                    />

                    <h1 className="text-2xl font-bold mt-4 text-dark">
                        {user?.name}
                    </h1>

                    <div className="flex items-center justify-center gap-2 text-sm text-primary mt-1">
                        <Mail size={14} />
                        <span>{user?.email}</span>
                    </div>

                    {joinedDate && (
                        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-3">
                            <Calendar size={13} />
                            <span>Joined {joinedDate}</span>
                        </div>
                    )}

                    <div className="border-t border-slate-200 mt-8 pt-6">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg py-2.5 text-sm font-semibold transition-colors"
                        >
                            <LogOut size={16} />
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
