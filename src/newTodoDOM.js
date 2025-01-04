import { projects, todos, todoGenerator, addToTodos, assignPriorityClass, rearrangeTodos, addToStorage } from "./central.js"


const newTodoDialog = document.querySelector("dialog.newTodoDialog");
const projSubmitBtn = document.querySelector(".newProjDialog .submitBtn");


projSubmitBtn.addEventListener("click", () => {
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
  priority = Number(formData.get("priority"));
  project = formData.get("projectName");
  
  if (
    title != undefined && title != "" &&
    description != undefined && description != "" &&
    dueDate != undefined && dueDate != "" &&
    priority != undefined && priority != "" &&
    project != undefined && project != ""
  ) {
    // if priority is not between 1 and 5, improve it
    if (priority < 1) {
      priority = 1;
    } else if (priority > 5) {
      priority = 5;
    }

    // Rearrange todos according to priority
    let todo = new todoGenerator(title, description, dueDate, priority, project);
    addToTodos(todo);
    rearrangeTodos(project);
    // Add to localStorage
    addToStorage(todos);

    // Display todos
    displayTodos();
  } else {
    alert("Something went wrong, please try again");
  }
});


const closeBtn = document.querySelector(".newTodoDialog .closeBtn");
closeBtn.addEventListener("click", () => {
  newTodoDialog.close();
});


export function displayTodos() {
  let currProjTodosDiv, div, currTodo, checkbox, h3, p1, p2, p3, deleteTodo, todoHeader, todoSection, todoFooter, todoButtons;
  for (let i = 0; i < projects.length; i++) {
    currProjTodosDiv = document.querySelector(`div.project${i + 1} .allTodos`);
    currProjTodosDiv.innerHTML = "";
    if (todos[projects[i]] != undefined) {
      for (let j = 0; j < todos[projects[i]].length; j++) {
        currTodo = todos[projects[i]][j];

        div = document.createElement("div");
        div.classList.add("todo");
        currProjTodosDiv.appendChild(div);

        // Todo Header
        todoHeader = document.createElement("div");
        todoHeader.classList.add("todoHeader");
        div.appendChild(todoHeader);

        checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("todoCheckbox");
        checkbox.addEventListener("change", (e) => {
          e.target.parentNode.parentNode.classList.toggle("checked");
          if (e.target.parentNode.parentNode.classList.contains("checked")) {
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
        h3.classList.add("title");

        todoHeader.appendChild(checkbox);
        todoHeader.appendChild(h3);

        // Todo Section
        todoSection = document.createElement("div");
        todoSection.classList.add("todoSection");
        div.appendChild(todoSection);

        p1 = document.createElement("p");
        p1.innerText = currTodo["description"];
        p1.classList.add("description");

        todoSection.appendChild(p1);

        // Todo Footer
        todoFooter = document.createElement("div");
        todoFooter.classList.add("todoFooter");
        div.appendChild(todoFooter);

        p2 = document.createElement("p");
        p2.innerText = currTodo["dueDate"];
        p2.classList.add("dueDate");

        p3 = document.createElement("p");
        p3.innerText = `Priority: ${currTodo["priority"]}`;
        p3.classList.add("priority");

        todoFooter.appendChild(p2);
        todoFooter.appendChild(p3);

        todoButtons = document.createElement("div");
        todoButtons.classList.add("todoButtons");
        div.appendChild(todoButtons);

        deleteTodo = document.createElement("button");
        deleteTodo.innerText = 'DEL';
        deleteTodo.classList.add("deleteTodoBtn");
        // Delete a todo
        (function(i) {
          deleteTodo.addEventListener("click", (e) => {
            if (todos[projects[i]].length > 1) {
              todos[projects[i]].splice(j, 1);
            }
            else {
              // Remove the entire project from todo list
              delete todos[projects[i]];
            }
            e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
            addToStorage(todos);
          });
        })(i);
        

        todoButtons.appendChild(deleteTodo);
        
        /* Add required class according to priority for styling */
        assignPriorityClass(div, currTodo["priority"]);        
      }
    }
  }
}


// In the dialog for adding a new todo, generate checkboxes for every project
export function generateDropdown(selectedIndex = 0) {
  const projectDropdown = document.querySelector(".projectDropdown");
  projectDropdown.innerHTML = "";

  let select, defaultOption, option;

  select = document.createElement("select");
  select.setAttribute("name", "projectName");
  projectDropdown.appendChild(select);

  defaultOption = document.createElement("option");
  defaultOption.innerText = 'Select a project';
  defaultOption.setAttribute("disabled", true);
  defaultOption.setAttribute("value", "");
  select.appendChild(defaultOption);

  for (let i = 0; i < projects.length; i++) {
    option = document.createElement("option");
    option.innerText = projects[i];
    option.setAttribute("value", projects[i]);
    if (i === selectedIndex) {
      option.setAttribute("selected", true);
    }
    select.appendChild(option);
  }
}