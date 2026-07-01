import { summarizeTasks } from "../services/ai.service.js"
import { errorHandler } from "../utils/errorHandler.js"
import { taskModel } from "../models/task.model.js";

const summarizeTasksController = async(req, res) => {
    try {
      
        const tasks = await taskModel.find({ userId: req.userId});
        console.log(tasks);
        
        const summary = await summarizeTasks(tasks);

        res.status(200).json({
            success: true,
            summary
        })
        
    } catch (error) {
        errorHandler(res, error);
    }
}

export{
    summarizeTasksController
}