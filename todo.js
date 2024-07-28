const todoInput = document.querySelector(".todoChamp");
const todoAdd = document.querySelector(".todoAdd");
const todoItems = document.querySelector(".todo-items");
const todoSelect = document.querySelector(".selectTodo");

// Ecouteur
document.addEventListener("DOMContentLoaded", recupTodoLocal);
todoAdd.addEventListener("click", addTodo);
todoItems.addEventListener("click", btt);
todoSelect.addEventListener("click", addFilter);
// Function

function addTodo(e) {
  e.preventDefault();

  // DIV
  const newDiv = document.createElement("div");
  newDiv.classList.add("newDiv");

  // Li
  const newLi = document.createElement("li");
  newDiv.appendChild(newLi);
  newLi.innerText = todoInput.value;
  newLi.classList.add("newLi");

  // localstorage
  saveLocalTodos(todoInput.value);

  // Button-Check
  const bttCheck = document.createElement("button");
  newDiv.appendChild(bttCheck);
  bttCheck.innerHTML = `<i class="fa-solid fa-check"></i>`;
  bttCheck.classList.add("bttCheck");

  // Button-trash
  const bttTrash = document.createElement("button");
  newDiv.appendChild(bttTrash);
  bttTrash.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  bttTrash.classList.add("bttTrash");

  todoItems.appendChild(newDiv);
  todoInput.value = "";
}

function btt(e) {
  const item = e.target;

  if (item.classList[0] === "bttTrash") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocal(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  } else if (item.classList[0] === "bttCheck") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function addFilter(e) {
  const todos = todoItems.childNodes;

  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function recupTodoLocal() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // DIV
    const newDiv = document.createElement("div");
    newDiv.classList.add("newDiv");

    // Li
    const newLi = document.createElement("li");
    newDiv.appendChild(newLi);
    newLi.innerText = todo;
    newLi.classList.add("newLi");

    // Button-Check
    const bttCheck = document.createElement("button");
    newDiv.appendChild(bttCheck);
    bttCheck.innerHTML = `<i class="fa-solid fa-check"></i>`;
    bttCheck.classList.add("bttCheck");

    // Button-trash
    const bttTrash = document.createElement("button");
    newDiv.appendChild(bttTrash);
    bttTrash.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    bttTrash.classList.add("bttTrash");

    todoItems.appendChild(newDiv);
  });
}

function removeLocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIdex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIdex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
