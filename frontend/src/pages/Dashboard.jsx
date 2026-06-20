import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/auth/me", { credentials: "include" })
            .then(res => res.json())
            .then(data => setUser(data.user));
    }, []);

    const handleLogout = async () => {
        await fetch("http://localhost:3000/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        googleLogout();
        navigate('/');
    };

    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            {user ? (
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <img src={user.picture} alt={user.name} style={{ width: 48, height: 48, borderRadius: "50%" }} />
                    <div>
                        <h2 style={{ margin: 0 }}>{user.name}</h2>
                        <p style={{ margin: 0, color: "gray" }}>{user.email}</p>
                    </div>
                    <button onClick={handleLogout} className="bg-red-500 rounded-l" style={{ marginLeft: "auto", padding: "0.5rem 1rem", cursor: "pointer" }}>Logout</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Dashboard;