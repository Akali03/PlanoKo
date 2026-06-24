import { addTask, removeTask } from "../controllers/task.controller.js";
import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";

const TaskRoute = Router();

TaskRoute.post('/addtask', protect, addTask);
TaskRoute.delete('/:id', protect, removeTask);

export default TaskRoute;