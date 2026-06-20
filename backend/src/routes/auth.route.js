import { Router } from "express";
import { googleAuth,logout ,getMe} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const AuthRoute = Router();

AuthRoute.post('/google', googleAuth);
AuthRoute.post('/logout', logout);
AuthRoute.get('/me', protect, getMe);

export default AuthRoute;