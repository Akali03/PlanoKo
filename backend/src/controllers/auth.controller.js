import { loginWithGoogle } from "../services/auth.service.js";
import { User } from "../models/user.model.js";


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
          secure: process.env.NODE_ENV === "production",
          sameSite:"none"
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

const getMe = async (req, res) => {
  /*
  select("name") -> include only these fields
  select("-name") -> exclude this field
  prefer include-only for safety
  */ 
  const user = await User.findById(req.userId).select('name email picture'); 
  
   if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ user });
}

const logout = async (req, res) => {
  res.clearCookie("accessToken");

  res.json({ 
    message: "Logged out successfully"
   });
}

export{
  googleAuth,
  getMe,
  logout
};