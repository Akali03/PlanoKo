import { client } from "../config/google.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";


export const loginWithGoogle = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
        throw new Error("Invalid Google token");
    }

    const { sub, email, name, picture } = payload;
    //console.log(sub);

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
        { userId: user._id },
        process.env.SECRET,
        { expiresIn: "7d" }
    );

    return {
        user,
        jwtToken
    };
};

