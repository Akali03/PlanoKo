import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRoute from "./routes/auth.route.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("running...");
})

app.use('/api/auth',AuthRoute)

export default app;
