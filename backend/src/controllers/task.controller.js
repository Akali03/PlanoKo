import { taskModel } from "../models/task.model.js";

function validatePriority(priority){
    return ["low", "medium", "high"].includes(priority);
}

function errorHandler(res, error) {
    console.error(error);

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
}

const addTask = async(req, res) => {
    try {
        const {task, priority, tags} = req.body;

        if(!task){
            return res.status(400).json({
                message: "Task is required"
            })
        }
        
        if(priority && !validatePriority(priority)){
            return res.status(400).json({
                message: "Invalid priority"
            })
        }

        if(tags && !Array.isArray(tags)){
            return res.status(400).json({
                message: "Tags must be an array"
            })
        }

        const newTask = await taskModel.create({
            task,
            priority,
            tags,
            userId: req.userId
        });

        res.status(201).json({
            success: true,
            task: newTask
        })

    } catch (error) {
        errorHandler(res, error);
    }
}

const getTasks = async(req, res) => {
    try {
        const tasks = await taskModel.find({userId: req.userId});

        res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
         errorHandler(res, error);
    }
}   

const updateTask = async(req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;

        if(completed !== undefined && typeof completed !== "boolean"){
            return res.status(400).json({
                message: "Completed must be a boolean"
            })
        }

        const updates = await taskModel.findOneAndUpdate(
            { _id: id, userId: req.userId },
            { completed },
            { returnDocument: "after" }); //Return the updated document after the update
            //console.log(updates);

            if(!updates) {
                return res.status(404).json({
                    success: false,
                    message: "Task not found"
                });
            }
            
            res.status(200).json({
                success: true,
                task: updates
            });
    } catch (error) {
           errorHandler(res, error);
    }
}

const removeTask = async(req, res) => {
    try {
        
            const { id } = req.params;

               const deleted = await taskModel.findByIdAndDelete({
                _id: id,
                userId: req.userId
            });

              if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }


            res.status(200).json({
                success: true,
                message: "Task deleted successfully"
            })

    
    } catch (error) {
         errorHandler(res, error);
    }
}

export {
    addTask,
    getTasks,
    removeTask,
    updateTask
}