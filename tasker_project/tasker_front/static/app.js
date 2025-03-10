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
        const statusCell = document.createElement("td");
        statusCell.textContent = task.is_complited ? "DONE" : "PENDING";
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
        row.appendChild(statusCell);
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
    const taskid = document.getElementById("taskid").value;
    const title = document.getElementById("title_input").value.trim();
    const description = document.getElementById("desc_input").value.trim();
    const isComplited = document.getElementById("is_complited_chkbx").checked;
    console.log("ID before submitting:", taskid);

    const taskData = {
        title : title,
        description : description,
        is_complited : isComplited,
    };
    const url = taskid ? `api/task/${taskid}/` : "api/task/";
    const method = taskid ? "PATCH" : "POST";

    console.log("Method:", method);
    console.log("URL:", url);

    fetch(url, {
        method : method,
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(taskData),
    })
    .then(response => response.json());
    document.getElementById("taskid").value = "";
    document.getElementById("task_form").reset();
    document.getElementById("is_complited_chkbx").checked = false;
    fetchTasks();
}

function editTask(taskid){
    fetch(`api/task/${taskid}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("title_input").value=data.title;
        document.getElementById("desc_input").value=data.description;
        document.getElementById("taskid").value=data.id;
        document.getElementById("is_complited_chkbx").checked=data.is_complited;
    })
    .catch(error => console.error("Error fetching tasks:", error));
}