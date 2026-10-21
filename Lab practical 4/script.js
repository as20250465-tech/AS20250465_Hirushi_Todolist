const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const errorMessage = document.getElementById("errorMessage");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const filterButtons = document.querySelectorAll(".filter-btn");


let tasks = [];
let currentFilter = "all";


function addTask() {

    const taskText = taskInput.value.trim();

    
    if (taskText === "") {
        errorMessage.textContent = "Please enter a task!";
        return;
    }

    errorMessage.textContent = "";

    // Create a task object
    const task = {
        id: Date.now() + Math.random(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    renderTasks();
}


function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(function (task) {

        const li = document.createElement("li");

        li.className = "list-group-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.className = "form-check-input";

        checkbox.addEventListener("change", function () {

            task.completed = checkbox.checked;

            renderTasks();

        });

        
        const span = document.createElement("span");

        span.className = "task-text";
        span.textContent = task.text;

        
        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";
        deleteBtn.className = "btn btn-danger btn-sm";

        deleteBtn.addEventListener("click", function () {

            tasks = tasks.filter(function (item) {
                return item.id !== task.id;
            });

            renderTasks();

        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

    updateCounter();

}


function updateCounter() {

    const remainingTasks = tasks.filter(function (task) {
        return !task.completed;
    }).length;

    taskCounter.textContent = remainingTasks + " remaining";

}


filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        currentFilter = button.dataset.filter;

        filterButtons.forEach(function (btn) {

            btn.classList.remove("btn-primary");
            btn.classList.add("btn-outline-primary");

        });

        button.classList.remove("btn-outline-primary");
        button.classList.add("btn-primary");

        renderTasks();

    });

});


clearCompletedBtn.addEventListener("click", function () {

    tasks = tasks.filter(function (task) {
        return !task.completed;
    });

    renderTasks();

});


addTaskBtn.addEventListener("click", addTask);


taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});


renderTasks();