const API_URL = "http://localhost:3000/api/tasks";
const AI_API_URL = "http://localhost:3000/api/ai";

export async function addTask(task, priority, tags){
      const res = await fetch(`${API_URL}/addtask`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ task, priority, tags: tags ? [tags] : [] }),
            });

        return await res.json();
}

export async function getTask(){
        const res = await fetch(`${API_URL}/alltasks`, {
                credentials: "include",
            });
            
        return await res.json();
}

export async function updateTask(id, completed){
    const res = await fetch(`${API_URL}/update/${id}`, {
        method: "PATCH", 
         headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ completed }),
    });
    return await res.json();
}

export async function deleteTask(id){
         const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        return await res.json();
}

export async function summarizeTasks(){
    const res = await fetch(`${AI_API_URL}/summarize`, {
        method: "GET",
        credentials: "include",
    });
    
    return await res.json();
}