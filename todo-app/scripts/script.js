const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
// prefersDarkScheme.matches === true -> obviously

// Straight from the DOM
const darkModeSwitch = document.querySelector("#dark-mode-switch");
const todoInput = document.querySelector("#todo-input");
const todoForm = document.querySelector("#todo-form");
export const todoList = document.querySelector(".todo-list");
export const todoLeft = document.querySelector("#todo-left");
const todoFilter = document.querySelectorAll(".filter button");
export const todoClearBtn = document.querySelector("#todo-clear");

// Import functions
import {
  darkModeToggle,
  addTodo,
  todosUpdate,
  localStorageTodos,
  filterTodoList,
  clearCompleted,
  updateStats,
  dragStart,
  dragEnter,
  dragDrop,
  dragLeave,
  dragOver,
} from "./functions.js";
import dummyTodos from "./dummyTodos.js";
// App State
export let todoInputValue;
export let todos = [];
export let currentFilter = "all"; // show all todos by default

// setState
function setInputValue(value) {
  todoInputValue = value;
}
export function setTodos(value) {
  todos = value;
}
export function setCurrentFilter(filter) {
  currentFilter = filter;
}
export function setFilteredTodos(items) {
  filteredTodos = items;
}

// Event Listeners
window.onload = onDocumentLoad;
darkModeSwitch.addEventListener("click", () => darkModeToggle());
todoInput.addEventListener("change", (e) => setInputValue(e.target.value));
todoInput.addEventListener("keyup", (e) => setInputValue(e.target.value));
todoForm.addEventListener("submit", (e) => onFormSubmit(e));
todoClearBtn.addEventListener("click", () => clearCompleted());

todoFilter.forEach((button) => {
  if (button.dataset.filter === currentFilter) button.classList.add("active");

  button.addEventListener("click", (e) => {
    const clickedBtn = e.target;
    const filter = clickedBtn.dataset.filter;
    todoFilter.forEach((btn) => {
      if (btn.classList.contains("active")) btn.classList.remove("active");
    });
    clickedBtn.classList.add("active");
    filterTodoList(filter);
  });
});

// Functions
function onFormSubmit(e) {
  e.preventDefault();
  if (todoInputValue.length < 2) return;

  addTodo();
  todosUpdate();
  todoInput.value = "";
}

function onDocumentLoad() {
  console.log("document load");

  if (!localStorageTodos || localStorageTodos.length === 0) {
    localStorage.setItem("todos", JSON.stringify(dummyTodos));
    dummyTodos.forEach((todo) => addTodo(todo));
    console.log("Added dummy data");
  } else {
    console.log("Load data from localStorage");
    localStorageTodos
      .sort((a, b) => a.order - b.order)
      .forEach((todo) => addTodo(todo));
  }
  updateStats();
  dragDropListeners();
}

function dragDropListeners() {
  const draggables = document.querySelectorAll(".todo-item[draggable]");
  const dragListItems = document.querySelectorAll(".todo-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragover", dragOver);
    item.addEventListener("dragleave", dragLeave);
    item.addEventListener("drop", dragDrop);
  });
}
