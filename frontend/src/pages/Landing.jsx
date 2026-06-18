import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
function Landing(){
    const navigate = useNavigate();
    //import useGoogleOneTapLogin
    // useGoogleOneTapLogin({onSuccess:(credentialResponse)=>{
    //     console.log(credentialResponse);
        
    // }})
    return(
        <div className="w-40">
            <h1>Google Login</h1>
            <GoogleLogin
                onSuccess={(credentialResponse)=>{console.log(credentialResponse.credential)
                    navigate('/home')
                }
                } 
                onError={()=>console.log('login failed')
                
                }
            />
            
        </div>
    )
}

export default Landing;