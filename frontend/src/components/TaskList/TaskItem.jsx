import { Circle, CheckCircle2, Trash2 } from "lucide-react";

const PRIORITY_STYLES = {
    high: "bg-red-500/10 text-red-400 border-red-500/20",
    medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    low: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

function TaskItem({ taskItem, onToggle, onDelete }) {
    const { task, priority, tags = [], completed } = taskItem;

    return (
        <div className="group flex items-start gap-3 px-4 py-3 rounded-lg border transition-all duration-150 bg-card border-border hover:border-primary/30 hover:bg-card/80">
            <button
                onClick={onToggle}
                className="mt-0.5 shrink-0 text-slate-500 hover:text-primary transition-colors"
                aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
            >
                {completed ? (
                    <CheckCircle2 size={20} className="text-primary" strokeWidth={2} />
                ) : (
                    <Circle size={20} strokeWidth={2} />
                )}
            </button>

            <div className="flex-1 min-w-0">
                <p
                    className={`text-sm font-medium truncate ${
                        completed ? "text-slate-500 line-through" : "text-dark"
                    }`}
                >
                    {task}
                </p>

                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {tags.map(tag => (
                            <span
                                key={tag}
                                className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
                <span
                    className={`text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full border ${
                        PRIORITY_STYLES[priority] || PRIORITY_STYLES.low
                    }`}
                >
                    {priority}
                </span>

                <button
                    onClick={onDelete}
                    className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-colors"
                    aria-label="Delete task"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
}

export default TaskItem;