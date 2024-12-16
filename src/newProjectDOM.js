// Handle creating new projects
import { projects, addToProjects } from "./script.js";

const addNewProject = document.querySelector(".newProjBtn");
const newProjectDialog = document.querySelector("dialog");
const submitBtn = document.querySelector(".submitBtn")
const closeBtn = document.querySelector(".closeBtn");
const input = document.querySelector("input#project-name");
const projectSection = document.querySelector(".projects");
let h1, newTodoBtn;

addNewProject.addEventListener("click", () => {
  newProjectDialog.showModal();
  input.value = "";
});

submitBtn.addEventListener("click", () => {
  const projectName = input.value;
  addToProjects(projectName);
  projectSection.innerHTML = "";
  for (let i = 0; i < projects.length; i++) {
    h1 = document.createElement("h2");
    h1.innerText = projects[i];
    newTodoBtn = document.createElement("button");
    newTodoBtn.innerText = "New Todo";
    projectSection.appendChild(h1);
    projectSection.appendChild(newTodoBtn);
  }
});

closeBtn.addEventListener("click", () => {
  newProjectDialog.close();
});

// Display the projects