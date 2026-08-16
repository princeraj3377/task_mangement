


let allTasks = [];

let currentFilter = "all";



const taskList =
    document.getElementById("taskList");

const emptyState =
    document.getElementById("emptyState");

const totalTasks =
    document.getElementById("totalTasks");

const pendingTasks =
    document.getElementById("pendingTasks");

const completedTasks =
    document.getElementById("completedTasks");

const addTaskBtn =
    document.getElementById("addTaskBtn");

const emptyAddBtn =
    document.getElementById("emptyAddBtn");

const taskModal =
    document.getElementById("taskModal");

const closeTaskModal =
    document.getElementById("closeTaskModal");

const cancelTaskBtn =
    document.getElementById("cancelTaskBtn");

const taskForm =
    document.getElementById("taskForm");



async function loadTasks() {

    try {

        const response = await fetch(
            API.ALL_TASKS,
            {
                method: "GET",

                headers: getAuthHeaders()
            }
        );


        if (response.status === 401) {

            removeToken();

            window.location.href = "index.html";

            return;
        }


        if (!response.ok) {

            throw new Error(
                "Tasks load nahi ho pa rahe."
            );
        }


        const data = await response.json();

        console.log("Tasks from backend:", data);



        if (Array.isArray(data)) {

            allTasks = data;

        } else if (Array.isArray(data.tasks)) {

            allTasks = data.tasks;

        } else if (Array.isArray(data.data)) {

            allTasks = data.data;

        } else {

            allTasks = [];

        }


        updateStatistics();


        renderTasks();


    } catch (error) {

        console.error(
            "Load tasks error:",
            error
        );

        showTaskError(
            "Tasks load nahi ho pa rahe."
        );

    }
}



function updateStatistics() {

    const total = allTasks.length;


    const completed =
        allTasks.filter(
            task => task.is_completed === true
        ).length;


    const pending =
        total - completed;


    totalTasks.textContent = total;

    pendingTasks.textContent = pending;

    completedTasks.textContent = completed;
}



function renderTasks() {

    taskList.innerHTML = "";


    let filteredTasks = allTasks;


    if (currentFilter === "pending") {

        filteredTasks =
            allTasks.filter(
                task => task.is_completed === false
            );

    }


    if (currentFilter === "completed") {

        filteredTasks =
            allTasks.filter(
                task => task.is_completed === true
            );

    }


    if (filteredTasks.length === 0) {

        taskList.appendChild(
            createEmptyState()
        );

        return;
    }


    filteredTasks.forEach(task => {

        const card =
            createTaskCard(task);

        taskList.appendChild(card);

    });
}



function createTaskCard(task) {

    const card =
        document.createElement("div");


    card.className = "task-card";


    if (task.is_completed === true) {

        card.classList.add("completed");

    }



    const title =
        task.tittle || "Untitled Task";


    const description =
        task.discription || "No description";


    const taskId =
        task.id ||
        task.task_id ||
        task.taskId;


    card.innerHTML = `

        <input
            type="checkbox"
            class="task-checkbox"
            ${task.is_completed ? "checked" : ""}
            data-id="${taskId}"
            title="Mark task as completed"
        >


        <div class="task-content">

            <div class="task-title">
                ${escapeHTML(title)}
            </div>

            <div class="task-description">
                ${escapeHTML(description)}
            </div>

            <div class="task-date">
                ${task.is_completed ? "Completed" : "Pending"}
            </div>

        </div>


        <div class="task-actions">

            <button
                class="task-action-btn edit-task-btn"
                data-id="${taskId}"
                title="Edit Task"
            >
                ✎
            </button>


            <button
                class="task-action-btn task-delete-btn delete-task-btn"
                data-id="${taskId}"
                title="Delete Task"
            >
                🗑
            </button>

        </div>

    `;


    const checkbox =
        card.querySelector(".task-checkbox");


    checkbox.addEventListener(
        "change",
        function () {

            toggleTaskStatus(
                taskId,
                checkbox.checked
            );

        }
    );


    const editButton =
        card.querySelector(".edit-task-btn");


    editButton.addEventListener(
        "click",
        function () {

            openEditTask(task);

        }
    );


    const deleteButton =
        card.querySelector(".delete-task-btn");


    deleteButton.addEventListener(
        "click",
        function () {

            deleteTask(taskId);

        }
    );


    return card;
}



function createEmptyState() {

    const div =
        document.createElement("div");


    div.className = "empty-state";


    div.innerHTML = `

        <div class="empty-icon">
            ✓
        </div>

        <h3>
            No tasks found
        </h3>

        <p>
            Create a task to get started.
        </p>

        <button
            class="empty-add-btn"
            id="dynamicEmptyAddBtn"
        >
            Create Task
        </button>

    `;


    const button =
        div.querySelector(
            "#dynamicEmptyAddBtn"
        );


    button.addEventListener(
        "click",
        openCreateModal
    );


    return div;
}



function openCreateModal() {

    taskForm.reset();


    taskForm.dataset.mode = "create";


    delete taskForm.dataset.taskId;


    taskModal.classList.add("show");
}



function closeModal() {

    taskModal.classList.remove("show");

    taskForm.reset();

    delete taskForm.dataset.mode;

    delete taskForm.dataset.taskId;
}



async function createTask() {

    const title =
        document.getElementById(
            "taskTitle"
        ).value.trim();


    const description =
        document.getElementById(
            "taskDescription"
        ).value.trim();


    const status =
        document.getElementById(
            "taskStatus"
        ).value;


    if (!title) {

        alert("Task title required.");

        return;

    }


    if (!description) {

        alert("Task description required.");

        return;

    }


    try {

        const response =
            await fetch(
                API.CREATE_TASK,
                {

                    method: "POST",

                    headers:
                        getAuthHeaders(),

                    body: JSON.stringify({

                        tittle: title,

                        discription:
                            description,

                        is_completed:
                            status === "true"

                    })

                }
            );


        if (response.status === 401) {

            removeToken();

            window.location.href =
                "index.html";

            return;

        }


        const data =
            await response.json();


        if (!response.ok) {

            console.error(
                "Create task error:",
                data
            );

            alert(
                data.detail ||
                "Task create nahi ho pa raha."
            );

            return;

        }


        console.log(
            "Task created:",
            data
        );


        closeModal();


        await loadTasks();


    } catch (error) {

        console.error(
            "Create task error:",
            error
        );

        alert(
            "Server se connection nahi ho pa raha."
        );

    }
}



function openEditTask(task) {

    document.getElementById(
        "taskTitle"
    ).value =
        task.tittle || "";


    document.getElementById(
        "taskDescription"
    ).value =
        task.discription || "";


    document.getElementById(
        "taskStatus"
    ).value =
        task.is_completed
            ? "true"
            : "false";


    const taskId =
        task.id ||
        task.task_id ||
        task.taskId;


    taskForm.dataset.mode = "edit";

    taskForm.dataset.taskId = taskId;


    taskModal.classList.add("show");
}



async function updateTask(taskId) {

    const title =
        document.getElementById(
            "taskTitle"
        ).value.trim();


    const description =
        document.getElementById(
            "taskDescription"
        ).value.trim();


    const status =
        document.getElementById(
            "taskStatus"
        ).value;


    if (!title) {

        alert("Task title required.");

        return;

    }


    try {

        const response =
            await fetch(
                API.UPDATE_TASK(taskId),
                {

                    method: "PUT",

                    headers:
                        getAuthHeaders(),

                    body: JSON.stringify({

                        tittle: title,

                        discription:
                            description,

                        is_completed:
                            status === "true"

                    })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            console.error(
                "Update task error:",
                data
            );

            alert(
                data.detail ||
                "Task update nahi ho pa raha."
            );

            return;

        }


        closeModal();


        await loadTasks();


    } catch (error) {

        console.error(
            "Update task error:",
            error
        );

        alert(
            "Server se connection nahi ho pa raha."
        );

    }
}



async function deleteTask(taskId) {

    const confirmation =
        confirm(
            "Kya aap is task ko delete karna chahte hain?"
        );


    if (!confirmation) {

        return;

    }


    try {

        const response =
            await fetch(
                API.DELETE_TASK(taskId),
                {

                    method: "DELETE",

                    headers:
                        getAuthHeaders()

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            console.error(
                "Delete task error:",
                data
            );

            alert(
                data.detail ||
                "Task delete nahi ho pa raha."
            );

            return;

        }


        await loadTasks();


    } catch (error) {

        console.error(
            "Delete task error:",
            error
        );

        alert(
            "Server se connection nahi ho pa raha."
        );

    }
}



async function toggleTaskStatus(
    taskId,
    completed
) {

    const task =
        allTasks.find(
            item => {

                const id =
                    item.id ||
                    item.task_id ||
                    item.taskId;

                return String(id) ===
                    String(taskId);

            }
        );


    if (!task) {

        return;

    }


    try {

        const response =
            await fetch(
                API.UPDATE_TASK(taskId),
                {

                    method: "PUT",

                    headers:
                        getAuthHeaders(),

                    body: JSON.stringify({

                        tittle:
                            task.tittle,

                        discription:
                            task.discription,

                        is_completed:
                            completed

                    })

                }
            );


        if (!response.ok) {

            const data =
                await response.json();

            console.error(
                "Status update error:",
                data
            );

            alert(
                data.detail ||
                "Task status update nahi hua."
            );

            renderTasks();

            return;

        }


        await loadTasks();


    } catch (error) {

        console.error(
            "Toggle task error:",
            error
        );

        renderTasks();

    }
}



const filterAll =
    document.getElementById(
        "filterAll"
    );


if (filterAll) {

    filterAll.addEventListener(
        "click",
        function () {

            currentFilter = "all";

            setActiveFilter(
                filterAll
            );

            renderTasks();

        }
    );

}



const filterPending =
    document.getElementById(
        "filterPending"
    );


if (filterPending) {

    filterPending.addEventListener(
        "click",
        function () {

            currentFilter = "pending";

            setActiveFilter(
                filterPending
            );

            renderTasks();

        }
    );

}



const filterCompleted =
    document.getElementById(
        "filterCompleted"
    );


if (filterCompleted) {

    filterCompleted.addEventListener(
        "click",
        function () {

            currentFilter = "completed";

            setActiveFilter(
                filterCompleted
            );

            renderTasks();

        }
    );

}



function setActiveFilter(activeButton) {

    const buttons =
        document.querySelectorAll(
            ".filter-btn"
        );


    buttons.forEach(
        button => {

            button.classList.remove(
                "active"
            );

        }
    );


    activeButton.classList.add(
        "active"
    );
}



if (addTaskBtn) {

    addTaskBtn.addEventListener(
        "click",
        openCreateModal
    );

}


if (emptyAddBtn) {

    emptyAddBtn.addEventListener(
        "click",
        openCreateModal
    );

}


if (closeTaskModal) {

    closeTaskModal.addEventListener(
        "click",
        closeModal
    );

}


if (cancelTaskBtn) {

    cancelTaskBtn.addEventListener(
        "click",
        closeModal
    );

}


if (taskModal) {

    taskModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === taskModal
            ) {

                closeModal();

            }

        }
    );

}



if (taskForm) {

    taskForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const mode =
                taskForm.dataset.mode;


            if (mode === "create") {

                await createTask();

                return;

            }


            if (mode === "edit") {

                const taskId =
                    taskForm.dataset.taskId;


                await updateTask(
                    taskId
                );

            }

        }
    );

}




function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        value ?? "";

    return div.innerHTML;
}



function showTaskError(message) {

    taskList.innerHTML = `

        <div class="empty-state">

            <div class="empty-icon">
                !
            </div>

            <h3>
                Something went wrong
            </h3>

            <p>
                ${escapeHTML(message)}
            </p>

            <button
                class="empty-add-btn"
                onclick="loadTasks()"
            >
                Try Again
            </button>

        </div>

    `;

}



loadTasks();