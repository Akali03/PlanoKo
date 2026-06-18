import { OAuth2Client } from "google-auth-library";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { sub, email, name, picture } = payload;
    console.log(sub);
    
      // check if user exists or not
        let user = await User.findOne({ googleId: sub });
       // console.log(user._id);
        
        if (!user) {
            user = await User.create({
                googleId: sub,
                email,
                name,
                picture,
            });
        }

    const jwtToken = jwt.sign(
        { userId: user.id },
        process.env.SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("token", jwtToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default googleAuth;