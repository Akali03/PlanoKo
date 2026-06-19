import { loginWithGoogle } from "../services/auth.service.js";


const googleAuth = async (req, res) => {
  try {
      const { token } = req.body;
      if(!token){
        return res.status(400).json({message:"Google token is required"
        });}

        const { user , jwtToken } = await loginWithGoogle(token);

        res.cookie("accessToken", jwtToken,{
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly:true,
          secure: false,
          sameSite:"lax"
        })

        res.status(200).json({
           user
        })
  } catch (error) {
      res.status(401).json({
        error: error.message,
      });
  }
};

export default googleAuth;