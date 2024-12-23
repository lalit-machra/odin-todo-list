// Handle creating new projects
import { projects, addToProjects, addToStorage } from "./central.js";


const addNewProject = document.querySelector(".newProjBtn");
const newProjectDialog = document.querySelector("dialog.newProjDialog");
const submitBtn = document.querySelector(".newProjDialog .submitBtn");
const closeBtn = document.querySelector(".newProjDialog .closeBtn");
const input = document.querySelector("input#project-name");


addNewProject.addEventListener("click", () => {
  newProjectDialog.showModal();
  input.value = "";
});


submitBtn.addEventListener("click", () => {
  if (input.value != undefined && input.value != "") {
    const projectName = input.value;
    addToProjects(projectName);
    // Display the projects
    displayProjects();
    addToStorage(projects);
  } 
});


closeBtn.addEventListener("click", () => {
  newProjectDialog.close();
});


export function displayProjects() {
  let div, h2, newTodoBtn, todosDiv;
  const projectSection = document.querySelector(".projects");
  projectSection.innerHTML = "";
  const newTodoDialog = document.querySelector("dialog.newTodoDialog");
  for (let i = 0; i < projects.length; i++) {
    div = document.createElement("div");
    div.classList.add(`project${i + 1}`);
    projectSection.appendChild(div);
    h2 = document.createElement("h2");
    h2.innerText = projects[i];
    todosDiv = document.createElement("div");
    todosDiv.classList.add("allTodos");
    newTodoBtn = document.createElement("button");
    newTodoBtn.innerText = "+ New Todo";
    newTodoBtn.classList.add("newTodoBtn");
    // When user clicks newTodoBtn, open the new todo dialog
    newTodoBtn.addEventListener("click", () => {
      newTodoDialog.showModal();
    });
    div.appendChild(h2);
    div.appendChild(todosDiv);
    div.appendChild(newTodoBtn);
  }
}