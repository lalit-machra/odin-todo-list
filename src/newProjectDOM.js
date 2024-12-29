// Handle creating new projects
import { projects, addToProjects, todos, addToStorage, loadSidebar, generateDropdown } from "./central.js";


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
  let div, h2, newTodoBtn, todosDiv, collapseBtn, projectHead, projectContent, currProjContent, projDeleteBtn;
  const projectSection = document.querySelector(".projects");
  projectSection.innerHTML = "";
  const newTodoDialog = document.querySelector("dialog.newTodoDialog");
  for (let i = 0; i < projects.length; i++) {
    div = document.createElement("div");
    div.classList.add(`project${i + 1}`);
    // Add classes for styling
    if (i % 2 !== 0) {
      // Add oddStyle class if it doesn't exist
      if (!div.classList.contains("oddStyle")) {
        div.classList.add("oddStyle");
      }
      // Remove evenStyle class if it exists
      if (div.classList.contains("evenStyle")) {
        div.classList.remove("evenStyle");
      }
    }
    else {
      // Add evenStyle class if it doesn't exist
      if (!div.classList.contains("evenStyle")) {
        div.classList.add("evenStyle");
      }
      // Remove oddStyle class if it exists
      if (div.classList.contains("oddStyle")) {
        div.classList.remove("oddStyle");
      }
    }
    projectSection.appendChild(div);

    projectHead = document.createElement("div");
    projectHead.classList.add("projectHead");

    h2 = document.createElement("h2");
    h2.innerText = projects[i];

    collapseBtn = document.createElement("button");
    collapseBtn.classList.add("collapseBtn");
    collapseBtn.innerText = "~"
    collapseBtn.addEventListener("click", (e) => {
      currProjContent = document.querySelector(`.${e.target.parentNode.parentNode.classList[0]} .projectContent`);
      currProjContent.classList.toggle("collapsed");
    });

    div.appendChild(projectHead);
    projectHead.appendChild(h2);
    projectHead.appendChild(collapseBtn);

    projectContent = document.createElement("div");
    projectContent.classList.add("projectContent");

    todosDiv = document.createElement("div");
    todosDiv.classList.add("allTodos");

    newTodoBtn = document.createElement("button");
    newTodoBtn.innerText = "+ New Todo";
    newTodoBtn.classList.add("newTodoBtn");
    // When user clicks newTodoBtn, open the new todo dialog
    newTodoBtn.addEventListener("click", () => {
      newTodoDialog.showModal();
    });

    projDeleteBtn = document.createElement("button");
    projDeleteBtn.classList.add("deleteProjBtn");
    projDeleteBtn.innerText = "DELETE PROJECT";
    projDeleteBtn.addEventListener("click", (e) => {
      // Delete associated todos
      let currIndex = Array.from(e.target.parentNode.parentNode.parentNode.children).indexOf(e.target.parentNode.parentNode);
      console.log(currIndex);
      delete todos[projects[currIndex]];
      addToStorage(todos);
      // Delete from projects
      projects.splice(currIndex, 1);
      addToStorage(projects);
      // Remove from DOM
      projectSection.removeChild(e.target.parentNode.parentNode);
      console.log(projects);
      loadSidebar();
      // Generate new dropdown
      generateDropdown();
    });

    div.appendChild(projectContent);
    projectContent.appendChild(todosDiv);
    projectContent.appendChild(newTodoBtn);
    projectContent.appendChild(projDeleteBtn);
  }
}