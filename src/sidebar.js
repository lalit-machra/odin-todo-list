import { projects } from "./central.js";

const projSubmitBtn = document.querySelector(".newProjDialog .submitBtn");
projSubmitBtn.addEventListener("click", () => {
  loadSidebar();
});

export function loadSidebar() {
  const allProjectsDiv = document.querySelector(".sidebar .allProjects");
  allProjectsDiv.innerHTML = "";
  let p;
  for (let i = 0; i < projects.length; i++) {
    p = document.createElement("p");
    p.innerText = projects[i];
    allProjectsDiv.appendChild(p);
  }
}
