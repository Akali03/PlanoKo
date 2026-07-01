import { Router } from "express";
import { summarizeTasksController } from "../controllers/ai.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const AIRoute = Router();

AIRoute.get("/summarize", protect, summarizeTasksController);

export default AIRoute;