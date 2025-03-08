document.addEventListener("DOMContent Loaded", fetchTasks());

function fetchTasks(){
    fetch('api/task')
    .then(response => response.json())
    .then(data => {updateTable(data);})
    .catch(error => alert("Error fetching the tasks", error));
}

function updateTable(data){
    const tableBody = document.getElementById("task_table_body");
    tableBody.innerHTML = "";
    data.forEach(task => {
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        idCell.textContent = task.id;
        const titleCell = document.createElement("td");
        titleCell.textContent = task.title;
        const descCell = document.createElement("td");
        descCell.textContent = task.description;
        const actCell = document.createElement("td");
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editTask(task.id);
        actCell.appendChild(editBtn);
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.style.marginLeft = "10px";
        delBtn.onclick = () => delTask(task.id);
        actCell.appendChild(delBtn);

        row.appendChild(idCell);
        row.appendChild(titleCell);
        row.appendChild(descCell);
        row.appendChild(actCell);
        tableBody.appendChild(row);
    });
}

function delTask(taskid){
    fetch(`api/task/${taskid}/`, {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json",
        },
    })
    .then(response => {
            fetchTasks();
    })
}

function createTask(){
    const title = document.getElementById("title_input").value.trim();
    const description = document.getElementById("desc_input").value.trim();
    const isComplited = document.getElementById("is_complited_chkbx").value;
    const taskData = {
        title : title,
        description : description,
        is_complited : isComplited,
    };
    fetch('api/task/', {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(taskData),
    })
    .then(response => response.json());
    document.getElementById("title_input").value = "";
    document.getElementById("desc_input").value = "";
    fetchTasks();
}