const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTaskHolder = document.getElementById("incomplete-section__tasks");
const completedTasksHolder = document.getElementById("completed-section__tasks");

const createListItem = () => {
  const listItem = document.createElement("li");
  listItem.className = "list-item";
  return listItem;
};
const createCheckBox = () => {
  const checkBox = document.createElement("input");
  checkBox.className = "checkbox-input";
  checkBox.type = "checkbox";
  return checkBox;
};
const createLabel = (taskString) => {
  const label = document.createElement("label");
  label.innerText = taskString;
  label.className = "task-label";
  return label;
};
const createInput = () => {
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "task-input";
  return editInput;
};
const createEditButton = () => {
  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "edit-button";
  return editButton;
};
const createDeleteButton = () => {
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");
  deleteButton.className = "delete-button";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "remove button";
  deleteButtonImg.className = "delete-button__img";
  deleteButton.appendChild(deleteButtonImg);
  return deleteButton;
};

const createNewTaskElement = function (taskString) {
  const listItem = createListItem();
  const checkBox = createCheckBox();
  const label = createLabel(taskString);
  const editInput = createInput();
  const editButton = createEditButton();
  const deleteButton = createDeleteButton();

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

const editTask = function () {
  let listItem = this.parentNode;
  let editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit-button");
  const containsClass = listItem.classList.contains("edit-mode");
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("edit-mode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const taskCompleted = function () {
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector(".edit-button");
  const deleteButton = taskListItem.querySelector(".delete-button");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
