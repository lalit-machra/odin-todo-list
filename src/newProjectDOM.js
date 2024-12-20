// Handle creating new projects
import { projects, addToProjects } from "./central.js";


const addNewProject = document.querySelector(".newProjBtn");
const newProjectDialog = document.querySelector("dialog.newProjDialog");
const submitBtn = document.querySelector(".newProjDialog .submitBtn");
const closeBtn = document.querySelector(".newProjDialog .closeBtn");
const input = document.querySelector("input#project-name");
const projectSection = document.querySelector(".projects");
let div, h2, newTodoBtn, todosDiv;


addNewProject.addEventListener("click", () => {
  newProjectDialog.showModal();
  input.value = "";
});


submitBtn.addEventListener("click", () => {
  if (input.value != undefined && input.value != "") {
    const projectName = input.value;
    addToProjects(projectName);
    // Display the projects
    projectSection.innerHTML = "";
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
      div.appendChild(h2);
      div.appendChild(todosDiv);
      div.appendChild(newTodoBtn);
    }
  } 
});


closeBtn.addEventListener("click", () => {
  newProjectDialog.close();
});