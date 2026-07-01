import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = `${import.meta.env.VITE_API_URL}`;
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${API_URL}/api/auth/me`, { credentials: "include" });
                const data = res.ok ? await res.json() : null;
                setUser(data?.user || null);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
