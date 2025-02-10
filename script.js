const taskInput = document.querySelector("#new-task");
const addButton = document.querySelector("#addButton");
const incompleteTasks = document.querySelector("#incomplete-tasks");
const completedTasks = document.querySelector("#completed-tasks");
const clearButton = document.querySelector("#clear");

function getInputValues() {
    const taskElement = document.querySelector("#new-task");
    const task = taskElement.value;
    taskElement.value = "";
    return [task];
}

function saveTask() {
    const tasks = getInputValues();
    const taskValue = localStorage.getItem("MyTaskList");
    const taskList = taskValue === null ? [] : JSON.parse(taskValue);
    taskList.push(tasks);
    localStorage.setItem("MyTaskList", JSON.stringify(taskList));
    createNewTask();
}

const createNewTask = function(taskName) {
    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    checkBox.type = "checkBox";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    label.innerText = taskName;
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
};

const addTask = function() {
    if (taskInput.value == "") {
        alert ("Task should not be empty!");
        return;
    }
    const listItem = createNewTask(taskInput.value);
    incompleteTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
}

let editTask = function() {

    let listItem = this.parentNode;
    let editInput = listItem.querySelector("input[type=text]");
    let label = listItem.querySelector("label");
    let containsClass = listItem.classList.contains("editMode");
    if (containsClass) {
        label.innerText = editInput.value;
    } else {
        editInput.value = label.innerText;
    }
    listItem.classList.toggle("editMode");
}
let deleteTask = function() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
}
let taskCompleted = function() {
    let listItem = this.parentNode;
    completedTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

let taskIncomplete = function() {
    let listItem = this.parentNode;
    incompleteTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

let bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    let checkBox = taskListItem.querySelector('input[type="checkbox"]');
    let editButton = taskListItem.querySelector("button.edit");
    let deleteButton = taskListItem.querySelector("button.delete");
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

let clear = function() {
    incompleteTasks.innerHTML = "";
    completedTasks.innerHTML = "";
}
clearButton.addEventListener('click', clear);