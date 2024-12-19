import { projects, todos, todoGenerator, addToTodos } from "./central.js"


const newTodoDialog = document.querySelector("dialog.newTodoDialog");
const projectCheckbox = document.querySelector(".projectCheckbox");
const projSubmitBtn = document.querySelector(".newProjDialog .submitBtn");


let newTodoBtn;


// In the dialog for adding a new todo, generate checkboxes for every project
projSubmitBtn.addEventListener("click", () => {
  projectCheckbox.innerHTML = "";
  newTodoBtn = document.querySelectorAll(".projects .newTodoBtn");
  let input, label;
  for (let i = 0; i < projects.length; i++) {
    input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", `project${i}`);
    input.setAttribute("name", "projectName");
    input.setAttribute("value", projects[i]);
    label = document.createElement("label");
    label.innerText = projects[i];
    label.setAttribute("for", `project${i}`);
    projectCheckbox.appendChild(input);
    projectCheckbox.appendChild(label);
  }

  newTodoBtn.forEach((button) => {
    button.addEventListener("click", () => {
      newTodoDialog.showModal();
    });
  });

  // After fetching the projects, load their todos as well
  displayTodos();
});


// When the page first loads, make sure everything is working fine then also
window.addEventListener("load", () => {
  let event = new Event("click", {
    bubbles: true,
  });
  const input = document.querySelector("input#project-name");
  input.value = "Starter Project";
  projSubmitBtn.dispatchEvent(event);
});


// Generate new todos using todoGenerator class
const todoSubmitBtn = document.querySelector(".newTodoDialog .submitBtn");
const todoForm = document.querySelector(".newTodoDialog .todoForm");


let description, category, dueTime, dueDate, priority, project;
todoSubmitBtn.addEventListener("click", () => {
  const formData = new FormData(todoForm);
  description = formData.get("description");
  category = formData.get("category");
  dueTime = formData.get("dueTime");
  dueDate = formData.get("dueDate");
  priority = formData.get("priority");
  project = formData.getAll("projectName");
  let todo = new todoGenerator(description, category, dueTime, dueDate, priority, project);
  addToTodos(todo);
  // Display todos
  displayTodos();
});


const closeBtn = document.querySelector(".newTodoDialog .closeBtn");
closeBtn.addEventListener("click", () => {
  newTodoDialog.close();
});

function displayTodos() {
  let currProjTodosDiv, div, currTodo, checkbox, h3, p1, p2, p3, p4;
  for (let i = 0; i < projects.length; i++) {
    currProjTodosDiv = document.querySelector(`div.project${i + 1} .allTodos`);
    currProjTodosDiv.innerHTML = "";
    if (todos[projects[i]] != undefined) {
      for (let j = 0; j < todos[projects[i]].length; j++) {
        div = document.createElement("div");
        div.classList.add("todo");
        currTodo = todos[projects[i]][j];
        checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        h3 = document.createElement("h3");
        h3.innerText = currTodo["description"];
        p1 = document.createElement("p");
        p1.innerText = currTodo["category"];
        p1.classList.add("todoData");
        p2 = document.createElement("p");
        p2.innerText = currTodo["dueTime"];
        p2.classList.add("todoData");
        p3 = document.createElement("p");
        p3.innerText = currTodo["dueDate"];
        p3.classList.add("todoData");
        p4 = document.createElement("p");
        p4.innerText = `Priority: ${currTodo["priority"]}`;
        p4.classList.add("todoData");
  
        div.appendChild(checkbox);
        div.appendChild(h3);
        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);
        div.appendChild(p4);
        currProjTodosDiv.appendChild(div);
      }
    }
  }
}