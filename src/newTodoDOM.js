import { projects, todos, todoGenerator, addToTodos, assignPriorityClass, rearrangeTodos, addToStorage } from "./central.js"


const newTodoDialog = document.querySelector("dialog.newTodoDialog");
const projSubmitBtn = document.querySelector(".newProjDialog .submitBtn");


projSubmitBtn.addEventListener("click", () => {
  generateDropdown();
  // After fetching the projects, load their todos as well
  displayTodos();
});


// Generate new todos using todoGenerator class
const todoSubmitBtn = document.querySelector(".newTodoDialog .submitBtn");
const todoForm = document.querySelector(".newTodoDialog .todoForm");


let title, description, dueDate, priority, project;
todoSubmitBtn.addEventListener("click", () => {
  const formData = new FormData(todoForm);
  title = formData.get("title");
  description = formData.get("description");
  dueDate = formData.get("dueDate");
  priority = formData.get("priority");
  project = formData.get("projectName");
  
  if (
    title != undefined && title != "" &&
    description != undefined && description != "" &&
    dueDate != undefined && dueDate != "" &&
    priority != undefined && priority != "" &&
    project != undefined && project != ""
  ) {
    // Rearrange todos according to priority
    let todo = new todoGenerator(title, description, dueDate, priority, project);
    addToTodos(todo);
    rearrangeTodos(project);
    // Add to localStorage
    addToStorage(todos);

    // Display todos
    displayTodos();
  }
});


const closeBtn = document.querySelector(".newTodoDialog .closeBtn");
closeBtn.addEventListener("click", () => {
  newTodoDialog.close();
});


export function displayTodos() {
  let currProjTodosDiv, div, currTodo, checkbox, h3, p1, p2, p3, deleteTodo;
  for (let i = 0; i < projects.length; i++) {
    currProjTodosDiv = document.querySelector(`div.project${i + 1} .allTodos`);
    currProjTodosDiv.innerHTML = "";
    if (todos[projects[i]] != undefined) {
      for (let j = 0; j < todos[projects[i]].length; j++) {
        currTodo = todos[projects[i]][j];

        div = document.createElement("div");
        div.classList.add("todo");

        checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.addEventListener("change", (e) => {
          e.target.parentNode.classList.toggle("checked");
          if (e.target.parentNode.classList.contains("checked")) {
            todos[projects[i]][j]["status"] = "completed";
          }
          else {
            todos[projects[i]][j]["status"] = "not-completed";
          }
          addToStorage(todos);
        });

        // Check if the todo was completed
        if (currTodo["status"] === "completed") {
          div.classList.add("checked");
          checkbox.setAttribute("checked", true);
        }

        h3 = document.createElement("h3");
        h3.innerText = currTodo["title"];

        p1 = document.createElement("p");
        p1.innerText = currTodo["description"];
        p1.classList.add("description");

        p3 = document.createElement("p");
        p3.innerText = currTodo["dueDate"];
        p3.classList.add("dueDate");

        deleteTodo = document.createElement("button");
        deleteTodo.innerText = "Delete";
        deleteTodo.classList.add("deleteTodo");
        // Delete a todo
        deleteTodo.addEventListener("click", (e) => {
          if (todos[projects[i]].length > 1) {
            todos[projects[i]].splice(j, 1);
          }
          else {
            // Remove the entire project from todo list
            delete todos[projects[i]];
          }
          e.target.parentNode.parentNode.removeChild(e.target.parentNode);
          addToStorage(todos);
        });

        /* Add required class according to priority for styling */
        assignPriorityClass(div, currTodo["priority"]);
  
        div.appendChild(checkbox);
        div.appendChild(h3);
        div.appendChild(p1);
        div.appendChild(p3);
        div.appendChild(deleteTodo);
        currProjTodosDiv.appendChild(div);
      }
    }
  }
}


// In the dialog for adding a new todo, generate checkboxes for every project
export function generateDropdown() {
  const projectDropdown = document.querySelector(".projectDropdown");
  projectDropdown.innerHTML = "";

  let select, defaultOption, option;

  select = document.createElement("select");
  select.setAttribute("name", "projectName");
  projectDropdown.appendChild(select);

  defaultOption = document.createElement("option");
  defaultOption.innerText = 'Select a project';
  defaultOption.setAttribute("disabled", "true");
  defaultOption.setAttribute("selected", "true");
  defaultOption.setAttribute("value", "");
  select.appendChild(defaultOption);

  for (let i = 0; i < projects.length; i++) {
    option = document.createElement("option");
    option.innerText = projects[i];
    option.setAttribute("value", projects[i]);
    select.appendChild(option);
  }
}