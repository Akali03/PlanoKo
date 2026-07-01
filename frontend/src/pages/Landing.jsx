import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Landing() {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const API_URL = `${import.meta.env.VITE_API_URL}`;
    const handleSuccess = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;
            const res = await fetch(`${API_URL}/api/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ token }),
            });
            const data = await res.json();
            setUser(data.user);
            navigate("/dashboard");
        } catch (error) {
            console.log("Login failed:", error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-main">
            <div className="bg-light p-12 rounded-2xl shadow-lg text-center w-full max-w-sm">
              <h1 className="text-4xl font-bold mb-2 text-center">
                    PlanoKo
              </h1>
                <p className="text-sm mb-8 text-primary text-center">
                    AI-Powered Task & Planning Assistant
                </p>         
                 <div className="flex justify-center w-full">
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={() => console.log("login failed")}
                    />
                </div>
            </div>
        </div>
    );
}

export default Landing;
