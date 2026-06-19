import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRoute from "./routes/auth.route.js";
import cookieParser  from "cookie-parser";
import { protect } from "./middleware/auth.middleware.js";
dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("running...");
})
app.get('/test',protect,(req, res)=>{
     res.json({
    message: "Protected route accessed",
    userId: req.userId,
  });
})
app.use('/api/auth',AuthRoute)

export default app;
