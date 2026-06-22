import { addTask } from "../controllers/task.controller.js";
import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";

const TaskRoute = Router();

TaskRoute.post('/addtask', protect, addTask);

export default TaskRoute;