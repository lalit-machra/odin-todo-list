import { projects, todos, todoGenerator, addToTodos, assignPriorityClass, rearrangeTodos, addToStorage } from "./central.js"


const newTodoDialog = document.querySelector("dialog.newTodoDialog");
const projSubmitBtn = document.querySelector(".newProjDialog .submitBtn");


projSubmitBtn.addEventListener("click", () => {
  generateCheckboxes();
  // After fetching the projects, load their todos as well
  displayTodos();
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
  
  if (description != undefined && description != "" &&
      category != undefined && category != "" &&
      dueTime != undefined && category != "" &&
      dueDate != undefined && dueDate != "" &&
      priority != undefined && priority != "" &&
      project != undefined && project != ""
  ) {
    // Rearrange todos according to priority
    for (let i = 0; i < project.length; i++) {
      let todo = new todoGenerator(description, category, dueTime, dueDate, priority, project[i]);
      addToTodos(todo);
      rearrangeTodos(project[i]);
    }
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
        h3.innerText = currTodo["description"];

        p1 = document.createElement("p");
        p1.innerText = currTodo["category"];
        p1.classList.add("category");

        p2 = document.createElement("p");
        p2.innerText = currTodo["dueTime"];
        p2.classList.add("dueTime");

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
        div.appendChild(p2);
        div.appendChild(p3);
        div.appendChild(deleteTodo);
        currProjTodosDiv.appendChild(div);
      }
    }
  }
}


// In the dialog for adding a new todo, generate checkboxes for every project
export function generateCheckboxes() {
  const projectCheckbox = document.querySelector(".projectCheckbox");
  projectCheckbox.innerHTML = "";
  let input, label, checkboxDiv;
  for (let i = 0; i < projects.length; i++) {
    checkboxDiv = document.createElement("div");
    input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", `project${i}`);
    input.setAttribute("name", "projectName");
    input.setAttribute("value", projects[i]);
    label = document.createElement("label");
    label.innerText = projects[i];
    label.setAttribute("for", `project${i}`);
    checkboxDiv.appendChild(input);
    checkboxDiv.appendChild(label);
    projectCheckbox.appendChild(checkboxDiv);
  }
}