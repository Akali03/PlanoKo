import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRoute from "./routes/auth.route.js";
import TaskRoute from "./routes/task.route.js";
import AIRoute from "./routes/ai.route.js";
import cookieParser  from "cookie-parser";
import { protect } from "./middleware/auth.middleware.js";
dotenv.config();

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://planoko.vercel.app"
  ],
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
app.use('/api/tasks', TaskRoute)
app.use('/api/ai', AIRoute);

export default app;
