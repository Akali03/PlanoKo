import { taskModel } from "../models/task.model.js";

function validatePriority(priority){
    return ["low", "medium", "high"].includes(priority);
}

function errorHandler(){
    return
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
        res.status(500).json({
            message: "Internal server error"
        })
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
        res.status(500).json({
            message: "Internal server error"
        })
    }
}   

const updateTask = async(req, res) => {
    try {
        const { id } = req.params;
        const { task, priority, tags, completed } = req.body;

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

        if(completed !== undefined && typeof completed !== "boolean"){
            return res.status(400).json({
                message: "Completed must be a boolean"
            })
        }

        const updates = await taskModel.findOneAndUpdate({
            _id: id,
            userId: req.userId
        })
        
    } catch (error) {
        
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
        console.log(error);
        
         res.status(500).json({
            message: "Internal server error"
        })
    }
}

export {
    addTask,
    getTasks,
    removeTask
}