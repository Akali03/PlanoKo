import { GoogleLogin } from "@react-oauth/google";

function Landing() {

    const handleSuccess = async (credentialResponse) => {
        try {
            console.log(credentialResponse);
            
            const token = credentialResponse.credential;
            const res = await fetch("http://localhost:3000/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ token }),
            });
            const data = await res.json();
            console.log("Login success:", data);
       } catch (error) {
            console.log("Login failed:", error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-main">
            <div className="bg-light p-12 rounded-2xl shadow-lg text-center w-full max-w-sm">
                <h1 className="text-4xl font-bold mb-2">PlanoKo</h1>
                <p className="text-sm mb-8 text-primary">AI-Powered Task & Planning Assistant</p>
                <GoogleLogin
                    onSuccess={handleSuccess}   
                    onError={() => console.log('login failed')}
                />
            </div>
        </div>
    );
}

export default Landing;
