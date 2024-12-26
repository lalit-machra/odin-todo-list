import { projects } from "./central";

function showAllProjects(viewAllProjsBtn) {
  let projDiv;
  viewAllProjsBtn.addEventListener("click", () => {
    for (let i = 0; i < projects.length; i++) {
      projDiv = document.querySelector(`.project${i + 1}`);
      if (projDiv.hasAttribute("hidden")) {
        projDiv.removeAttribute("hidden");
      }
    }
  });
}

function showProject(viewProjectBtn, projectIndex) {
  let projDiv;
  viewProjectBtn.addEventListener("click", () => {
    for (let i = 0; i < projects.length; i++) {
      projDiv = document.querySelector(`.project${i + 1}`);
      if (i === projectIndex) {
        // Make the project visible that was clicked
        if (projDiv.hasAttribute("hidden")) {
          projDiv.removeAttribute("hidden");
        }
      } else {
        // Hide all other projects
        if(!projDiv.hasAttribute("hidden")) {
          projDiv.setAttribute("hidden", true);
        }
      }
    }
  });
}

export default function loadSidebar() {
  const allProjectsDiv = document.querySelector(".sidebar .allProjects");
  allProjectsDiv.innerHTML = "";
  let allProjectsBtn, projectBtn;

  // Add a "All Projects" button
  allProjectsBtn = document.createElement("button");
  allProjectsBtn.innerText = "All Projects";
  allProjectsBtn.classList.add("viewAllProjsBtn");
  allProjectsDiv.appendChild(allProjectsBtn);
  showAllProjects(allProjectsBtn);

  // Add individual buttons for all the projects
  for (let i = 0; i < projects.length; i++) {
    projectBtn = document.createElement("button");
    projectBtn.innerText = projects[i];
    projectBtn.classList.add("viewProjectBtn");
    allProjectsDiv.appendChild(projectBtn);
    showProject(projectBtn, i);
  }
}

const projSubmitBtn = document.querySelector(".newProjDialog .submitBtn");
projSubmitBtn.addEventListener("click", () => {
  loadSidebar();
});
