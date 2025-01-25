/**
  Problem: User interaction does not provide the correct results.
  Solution: Add interactivity so the user can manage daily tasks.
  Break things down into smaller steps and take each step at a time.
*/
const NEW_TASK_INPUT_ID = "new-task";
const BUTTON_TAG = "button";
const INCOMPLETE_TASKS_ID = "incomplete-tasks";
const COMPLETED_TASKS_ID = "completed-tasks";
const LI_TAG = "li";
//class names:
const CLASS_TASK_INPUT = "task-input";
const CLASS_TASK_LABEL = "task-label";

const CLASS_EDIT_BUTTON = "edit";
const CLASS_EDIT_MODE = "edit-mode";
const CLASS_CHECKBOX = "checkbox";
const CLASS_DELETE_BUTTON = "delete";
//inner texts:
const BUTTON_LABEL_EDIT = "Edit";
const BUTTON_LABEL_SAVE = "Save";

const taskInput = document.getElementById(NEW_TASK_INPUT_ID);
const addButton = document.getElementsByTagName(BUTTON_TAG)[0];
const incompleteTaskHolder = document.getElementById(INCOMPLETE_TASKS_ID);
const completedTasksHolder = document.getElementById(COMPLETED_TASKS_ID);

const createLabel = (className, innerText) => {
  const label = document.createElement("label");
  label.innerText = innerText;
  label.className = className;
  return label;
};
const createInput = (type, className) => {
  const input = document.createElement("input");
  input.type = type;
  if (className) {
    input.className = className;
  }
  return input;
};
const createButton = (className, innerText) => {
  const button = document.createElement("button");
  if (innerText) {
    button.innerText = innerText;
  }
  button.className = className;
  return button;
};
const createDeleteButton = () => {
  const deleteButton = createButton("delete");
  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "delete";
  deleteButtonImg.className = "delete__img";
  deleteButton.appendChild(deleteButtonImg);
  return deleteButton;
};
const createNewTaskElement = (taskString) => {
  const listItem = document.createElement("li");
  listItem.className = "li";
  const checkBox = createInput("checkbox", "checkbox");
  const label = createLabel(CLASS_TASK_LABEL, taskString);
  const editInput = createInput("text", CLASS_TASK_INPUT);
  const editButton = createButton(CLASS_EDIT_BUTTON, "Edit");
  const deleteButton = createDeleteButton();

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = () => {
  console.log("Add Task...");
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

const enterEditMode = (input, label, button) => {
  label.innerText = input.value;
  button.innerText = BUTTON_LABEL_EDIT;
};
const exitEditMode = (input, label, button) => {
  input.value = label.innerText;
  button.innerText = BUTTON_LABEL_SAVE;
};
function editTask() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");
  let listItem = this.parentNode;
  let editInput = listItem.getElementsByClassName(CLASS_TASK_INPUT)[0];
  let label = listItem.getElementsByClassName(CLASS_TASK_LABEL)[0];
  let editBtn = listItem.getElementsByClassName(CLASS_EDIT_BUTTON)[0];
  const containsClass = listItem.classList.contains(CLASS_EDIT_MODE);
  if (containsClass) {
    enterEditMode(editInput, label, editBtn);
  } else {
    exitEditMode(editInput, label, editBtn);
  }
  listItem.classList.toggle(CLASS_EDIT_MODE);
}

function deleteTask() {
  console.log("Delete Task...");
  let listItem = this.closest(LI_TAG);
  listItem.remove();
}

function taskCompleted() {
  console.log("Complete Task...");
  const listItem = this.parentNode;
  listItem.classList.toggle("task-label_completed");
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  console.log("Incomplete Task...");
  const listItem = this.parentNode;
  listItem.classList.toggle("task-label_completed");
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  let checkBox = taskListItem.getElementsByClassName(CLASS_CHECKBOX)[0];
  let editButton = taskListItem.getElementsByClassName(CLASS_EDIT_BUTTON)[0];
  let deleteButton =
    taskListItem.getElementsByClassName(CLASS_DELETE_BUTTON)[0];

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
