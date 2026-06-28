import { addTask, removeTask, getTasks,updateTask } from "../controllers/task.controller.js";
import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";

const TaskRoute = Router();

TaskRoute.post('/addtask', protect, addTask);
TaskRoute.get('/alltasks', protect, getTasks);
TaskRoute.delete('/:id', protect, removeTask);
TaskRoute.patch('/update/:id', protect, updateTask);

export default TaskRoute;