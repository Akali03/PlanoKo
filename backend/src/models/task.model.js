import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    task: {
        type: String,
        required: true,
        trim: true,
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
        required: true
    },
    tags: {
        type: [String],
        default: [],
    },
    completed: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true
    }
);

export const taskModel = mongoose.model("Task", taskSchema);