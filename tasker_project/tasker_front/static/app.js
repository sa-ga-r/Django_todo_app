const BaseURL="https://refactored-funicular-447j6q57q9p3jxxv-8000.app.github.dev/api/task/"

document.addEventListener("DOMContent Loaded", function (){
    fetchTasks();
});

function fetchTasks(){
    fetch(BaseURL)
    .then(respone => response.json())
    .then(data => updateTaskTable(data))
    .catch(error => console.error("Error fetching the tasks", error));
}

function updateTaskTable(tasks){
    let tableBody = getElimentById("task_table_body");
    tableBody.innerHTML="";
    if (tasks.length===0){
    tableBody.innerHTML = 
    '<tr><td colspan = "5" style="text-align:center";>No Tasks Available</tr></td>';
    return;
    }
    tasks.forEach((task, index)=>{
        let row = document.createElement("tr");
        row.innerHTML = 
        '<td>${index + 1}</td><td>${task.title}</td><td>${task.description}</td><td>${new Date(task.created_at).toLocalString()}</td><td><button onclick="updateTask(${task.id})">Update</button><button onclick="deleteTask(${task.id})"></button></td>';
        tableBody.appendChild(row);
    });
}

function deleteTask(taskId){
    if (!confirm("Are you sure, you want to delete the task???")) return;
    fetch('BaseURL/${taskId}/',
        {method:"DELETE"})
        .then(response => {
            if(response.ok){
                fetchTasks();
            }else{
                console.error("Failed to delete task");
            }
        })
        .catch(error=>console.error('Error deleting the task:', error));
    }

function updateTask(taskId){
    let newTitle = promt("Update new title:");
    let newDescription = promt("Enter new description:");
    if (!newTitle || !newDescription)
        return;
    fetch('BaseURL/${taskId}/', {
        method : 'PUT',
        headers : {
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            title:newTitle, description:newDescription
        }),
    })
    .then(response => {
        if (response.ok){
            fetchTasks();
        } else {
            console.error("Failed to update task");
        }
    })
    .catch(error=>console.error("Error updating task:", error));
}