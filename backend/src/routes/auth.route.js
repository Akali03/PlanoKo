import { Router } from "express";
import googleAuth from "../controllers/auth.controller.js";

const AuthRoute = Router();

AuthRoute.post('/google', googleAuth);

export default AuthRoute;