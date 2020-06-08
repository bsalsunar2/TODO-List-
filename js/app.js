console.log("this is todo script");

// Selection
const todoinput = document.querySelector(".todo-input");
const todoadd = document.querySelector(".todo-add");
const todolist = document.querySelector(".todo-list");
const todofilter = document.querySelector(".todo-filter");
const tododate = document.querySelector(".todo-date");
// function
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
tododate.innerHTML = today.toLocaleDateString("en-US", options);

todoadd.addEventListener("click", (e) => {
  e.preventDefault();

  if (todoinput.value) {
    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");

    const todoli = document.createElement("li");
    todoli.textContent = todoinput.value;
    todoli.classList.add("todotext");
    tododiv.appendChild(todoli);
    savelocal(todoinput.value);
    const completebutton = document.createElement("button");
    completebutton.innerHTML = '<i class="fas fa-check-square"></i>';
    completebutton.classList.add("complete-btn");
    tododiv.appendChild(completebutton);

    const deletebutton = document.createElement("button");
    deletebutton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deletebutton.classList.add("delete-btn");
    tododiv.appendChild(deletebutton);

    todoinput.value = "";

    todolist.appendChild(tododiv);
  }
});

todolist.addEventListener("click", (event) => {
  const parent = event.target.parentNode;
  if (event.target.classList[0] === "delete-btn") {
    parent.remove();
    removelocal(parent);
  }
  if (event.target.classList[0] === "complete-btn") {
    parent.classList.toggle("complete");
  }
});

todofilter.addEventListener("click", (e) => {
  const todos = todolist.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList[1] === "complete") {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (todo.classList[1] !== "complete") {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
});

savelocal = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

removelocal = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todotxt = todo.children[0].textContent;
  todos.splice(todos.indexOf(todotxt), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};

document.addEventListener("DOMContentLoaded", () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");

    const todoli = document.createElement("li");
    todoli.textContent = todo;
    todoli.classList.add("todotext");
    tododiv.appendChild(todoli);
    const completebutton = document.createElement("button");
    completebutton.innerHTML = '<i class="fas fa-check-square"></i>';
    completebutton.classList.add("complete-btn");
    tododiv.appendChild(completebutton);

    const deletebutton = document.createElement("button");
    deletebutton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deletebutton.classList.add("delete-btn");
    tododiv.appendChild(deletebutton);

    todolist.appendChild(tododiv);
  });
});
