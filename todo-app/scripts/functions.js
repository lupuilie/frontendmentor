import {
  todos,
  setTodos,
  todoInputValue,
  todoList,
  currentFilter,
  setCurrentFilter,
  todoLeft,
  todoClearBtn,
} from "./script.js";

export function darkModeToggle() {
  if (
    document.body.classList.contains("light") ||
    !document.body.classList.contains("dark")
  ) {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
  }
}

export function addTodo(todo) {
  const newTodo = {
    id: todo ? todo.id : todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
    text: todo ? todo.text : todoInputValue,
    checked: todo ? todo.checked : false,
    order: todo ? todo.order : todos.length,
  };
  const duplicate = todos.find((el) => el.text === newTodo.text);
  if (duplicate) {
    alert("This item is already in the list.");
    return;
  }
  todos.push(newTodo);

  addTodoItem(newTodo);
}

function addTodoItem(todo) {
  const todoListItem = document.createElement("li");
  todoListItem.dataset.index =
    document.querySelectorAll(".todo-list li").length;

  const todoItem = document.createElement("div");
  const checkBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  checkBtn.addEventListener("click", (e) => todoCheck(e.target));
  deleteBtn.addEventListener("click", (e) => deleteTodo(e.target));

  const span = document.createElement("span");
  const txt = document.createTextNode(todo.text);

  todoItem.classList.add("todo-item");
  if (todo.checked) todoItem.classList.add("checked");
  todoItem.dataset.todoId = todo.id;
  todoItem.setAttribute("draggable", true);
  checkBtn.classList.add("todo-check-btn");
  deleteBtn.classList.add("delete");
  span.classList.add("text");

  span.appendChild(txt);
  todoItem.appendChild(checkBtn);
  todoItem.appendChild(span);
  todoItem.appendChild(deleteBtn);

  todoListItem.appendChild(todoItem);
  todoList.appendChild(todoListItem);
}

function deleteTodo(clickedBtn) {
  const todoId = parseInt(clickedBtn.parentNode.dataset.todoId);
  const todoItem = clickedBtn.parentNode;
  const todosUpdated = todos.filter((todo) => todo.id !== todoId);

  setTodos(todosUpdated);
  todoItem.remove();
  todosUpdate();
}

function todoCheck(clickedBtn) {
  const todoId = parseInt(clickedBtn.parentNode.dataset.todoId);
  const todoItem = clickedBtn.parentNode;

  let clickedTodo = todos.find((todo) => todo.id === todoId);
  clickedTodo.checked = !clickedTodo.checked;

  setTodos(
    todos.map((todo) => (todo.id === clickedTodo.id ? clickedTodo : todo))
  );

  todoItem.classList.toggle("checked");
  todosUpdate();
}

export const localStorageTodos = JSON.parse(localStorage.getItem("todos"));

export function todosUpdate() {
  // Run on each todo update
  updateStats();
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function updateStats() {
  const activeTodos = todos.filter((todo) => todo.checked === false).length;
  const completedTodos = todos.filter((todo) => todo.checked === true).length;
  todoLeft.innerText =
    activeTodos > 0 ? `${activeTodos} items left.` : `Todo list complete`;
  if (completedTodos > 0) {
    todoClearBtn.classList.remove("hide");
  } else {
    todoClearBtn.classList.add("hide");
  }
}

export function filterTodoList(filter) {
  if (filter === currentFilter) return; // if selected filter is already applied
  todoList.querySelectorAll(".todo-item").forEach((item) => item.remove()); // remove all todos from list

  const activeTodos = todos.filter((todo) => {
    if (!todo.checked) return todo;
  });
  const completedTodos = todos.filter((todo) => todo.checked);

  switch (filter) {
    case "all":
      todos.forEach((todo) => addTodoItem(todo));
      break;
    case "active":
      activeTodos.forEach((todo) => addTodoItem(todo));
      break;
    case "completed":
      completedTodos.forEach((todo) => addTodoItem(todo));
      break;
    default:
      todos.forEach((todo) => addTodoItem(todo));
  }

  setCurrentFilter(filter);
  todosUpdate();
}

export function clearCompleted() {
  setTodos(todos.filter((todo) => todo.checked === false));
  const todoItems = todoList.querySelectorAll(".todo-item");
  todoItems.forEach((item) => {
    if (item.classList.contains("checked")) item.remove();
  });
  todosUpdate();
}

// Drag & Drop functions
let dragStartIndex; // index of (.list-items li)
export function dragStart(e) {
  // console.log("dragStart", e);
  dragStartIndex = this.closest("li").dataset.index;
}
export function dragOver(e) {
  // console.log("dragOver", e.offsetY);

  e.preventDefault();
}
export function dragEnter(e) {
  // console.log("dragEnter", e);

  e.preventDefault();
  this.classList.add("dragover");
}
export function dragLeave(e) {
  // console.log("dragLeave", e);

  if (e.offsetY == this.offsetHeight || e.offsetY < 0)
    this.classList.remove("dragover");
}
export function dragDrop(e) {
  // console.log("drop", e);

  this.classList.remove("dragover");
  const dragDropIndex = +this.dataset.index;
  swapItems(dragStartIndex, dragDropIndex);
}

function swapItems(fromIndex, toIndex) {
  const listItems = todoList.querySelectorAll("li");
  const itemOne = listItems[fromIndex].querySelector(".todo-item");
  const itemTwo = listItems[toIndex].querySelector(".todo-item");

  const id1 = +itemOne.dataset.todoId;
  const id2 = +itemTwo.dataset.todoId;

  setTodos(
    todos.map((todo) => {
      if (todo.id === id1) todo.order = +toIndex;
      if (todo.id === id2) todo.order = +fromIndex;
      return todo;
    })
  );

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);

  todosUpdate();
}
