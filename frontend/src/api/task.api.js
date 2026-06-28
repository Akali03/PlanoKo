
export async function addTask(task, priority, tags){
      const res = await fetch("http://localhost:3000/api/tasks/addtask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ task, priority, tags: tags ? [tags] : [] }),
            });

        return await res.json();
}

export async function getTask(){
        const res = await fetch("http://localhost:3000/api/tasks/alltasks", {
                credentials: "include",
            });
            
        return await res.json();
}

export async function updateTask(id, completed){
    const res = await fetch(`http://localhost:3000/api/tasks/update/${id}`, {
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
         const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        return await res.json();
}