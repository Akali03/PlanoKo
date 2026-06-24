import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/nav/Navbar";

const TAGS = ["school", "work", "personal", "health", "finance"];

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("medium");
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/auth/me", { credentials: "include" })
            .then(res => res.json())
            .then(data => setUser(data.user));
    }, []);

    const handleLogout = async () => {
        await fetch("http://localhost:3000/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        googleLogout();
        navigate('/');
    };

    const handleTagChange = (e) => {
        setTags([...e.target.selectedOptions].map(o => o.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:3000/api/tasks/addtask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ task, priority, tags }),
        });
        setTask("");
        setPriority("medium");
        setTags([]);
    };

    return (
        <div className="min-h-screen bg-main font-sans">
            <Navbar user={user} />

            <div className="max-w-3xl mx-auto mt-10 p-6 rounded-2xl shadow bg-secondary">
                <h2 className="text-lg font-semibold text-dark mb-4">Add Task</h2>
                <form onSubmit={handleSubmit} className="flex flex-row flex-1 gap-4">
                    <input
                        type="text" 
                        placeholder="Task name..."
                        value={task}
                        onChange={e => setTask(e.target.value)}
                        className="bg-secondary border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
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

                    <button type="submit" className="bg-primary text-white rounded-lg py-2 text-sm font-medium hover:opacity-90">
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Dashboard;
