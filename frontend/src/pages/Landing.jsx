import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
function Landing(){
    const navigate = useNavigate();
    //import useGoogleOneTapLogin
    // useGoogleOneTapLogin({onSuccess:(credentialResponse)=>{
    //     console.log(credentialResponse);
        
    // }})

    const handleSuccess = async(credentialResponse)=> {
        try {
            const token = credentialResponse.credential;
               const res = await fetch("http://localhost:3000/api/auth/google", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                credentials: "include", // IMPORTANT (this replaces withCredentials)
                body: JSON.stringify({ token }),
            });
         const data = await res.json();
      console.log("Login success:", data);

      navigate("/home");
        } catch (error) {
                  console.log("Login failed:", error);

        }
    }

    return(
        <div className="w-40">
            <h1>Google Login</h1>
            <GoogleLogin
                onSuccess={handleSuccess} 
                onError={()=>console.log('login failed')
                
                }
            />
            
        </div>
    )
}

export default Landing;