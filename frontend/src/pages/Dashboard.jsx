import { useState, useEffect } from "react";
import Navbar from "../components/nav/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import RightSidebar from "../components/RightSidebar/RightSidebar";
import { Circle, Trash } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { formattedDate } from "../utils/formatDate";

const TAGS = ["school", "work", "personal", "health", "finance"];

function Dashboard() {
    const { user } = useAuth();
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("medium");
    const [tags, setTags] = useState("school");
    const [activeView, setActiveView] = useState("all");
    const [menuOpen, setMenuOpen] = useState(false);
    const [taskItems, setTaskItems] = useState([]);


    const handleTagChange = (e) => {
        setTags(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
           const res = await fetch("http://localhost:3000/api/tasks/addtask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ task, priority, tags: tags ? [tags] : [] }),
            });

        const data = await res.json();

        setTaskItems(prev => [data.task, ...prev]);
        setTask("");
        setPriority("medium");
        setTags("school");
    };
    useEffect(() => {
        const fetchTaskItem = async() =>{
            try {
                const res = await fetch("http://localhost:3000/api/tasks/alltasks", {
                credentials: "include",
            });
            const taskData = await res.json();
            console.log(taskData.tasks);
            
            setTaskItems(taskData.tasks ?? []);
            } catch (err) {
                console.error("Failed to fetch tasks:", err);

            }
        
        }
        fetchTaskItem();
    }, []);

    const handleDelete = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!res.ok) {
            console.error("Failed to delete task:", await res.json().catch(() => null));
            return;
        }

        setTaskItems(prev => prev.filter(taskItem => taskItem._id !== id));
    } catch (err) {
        console.error("Delete task request failed:", err);
    }
};

    return (
        <div className="min-h-screen bg-main font-sans">
            <Navbar user={user} onMenuToggle={() => setMenuOpen(p => !p)} menuOpen={menuOpen} />

            <div className="flex gap-3">
                <Sidebar
                    activeView={activeView}
                    onViewChange={setActiveView}
                    isOpen={menuOpen}
                    onClose={() => setMenuOpen(false)}
                />

                <div className="flex-1 px-4 md:px-6 pb-24 md:pb-0">
                    <div className="max-w-3xl mt-10 p-4 md:p-6 rounded-2xl shadow bg-secondary">
                        <h2 className="text-lg font-semibold text-dark mb-4">Add Task</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
                            <input
                                type="text"
                                placeholder="Task name..."
                                value={task}
                                onChange={e => setTask(e.target.value)}
                                className="flex-1 bg-secondary border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                                required
                            />
                            <select
                                value={priority}
                                onChange={e => setPriority(e.target.value)}
                                className="bg-secondary border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <select
                                value={tags}
                                onChange={handleTagChange}
                                className="bg-secondary border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                            >
                                {TAGS.map(tag => (
                                    <option key={tag} value={tag}>{tag}</option>
                                ))}
                            </select>
                            <button type="submit" className="bg-primary text-white rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90">
                                Add Task
                            </button>
                        </form>
                    </div>
                    {/* Task list 
                    sample completed task item 
                    <p
                        className={`text-[13px] leading-relaxed ${
                        todo.completed ? "line-through text-muted-foreground" : "text-foreground"
                        }`}
                    >
                        {todo.text}
                    </p>
                    */}
                    {/*Task Items */}
                  
                   <div className="space-y-3 mt-4">
                     {
                    taskItems.map((taskItem)=>(
                  <div key={taskItem._id}
                        className="flex 
                              items-start gap-3 
                              px-4 py-3 mt-4 rounded-lg 
                              border transition-all duration-150 
                              bg-card border-border hover:border-primary/30 
                              hover:bg-card/80">
                        <button>
                            <Circle />
                         </button>
                        <div className="flex-1 min-w-0">
                    <p className="text-[13px] leading-relaxed text-foreground">
                        {taskItem.task}
                    </p>

                    <div
                        className="flex items-center gap-2 mt-1.5 flex-wrap"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-red-500" />
                        <span className="text-[10px] capitalize text-red-500">
                        {taskItem.priority}
                        </span>

                        <span className="text-[10px] text-muted-foreground">·</span>

                        <span className="text-[10px] text-muted-foreground">
                        {taskItem.tags}
                        </span>

                        <span className="text-[10px] text-muted-foreground">·</span>

                        <span className="text-[10px] text-muted-foreground">
                        {
                          formattedDate(taskItem.createdAt.slice(0, 10))
                        }
                        </span>
                    </div>
                    </div>
                    <button>
                         <Trash size={10} onClick={()=>handleDelete(taskItem._id)}/>   
                    </button>
                 
                    </div>
                    ))
                   }
                 
                    </div>
                </div>

                <RightSidebar />
            </div>
        </div>
    );
}

export default Dashboard;
