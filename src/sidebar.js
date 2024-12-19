import { projects } from "./central.js";

const projSubmitBtn = document.querySelector(".newProjDialog .submitBtn");
const allProjectsDiv = document.querySelector(".sidebar .allProjects");

projSubmitBtn.addEventListener("click", () => {
  allProjectsDiv.innerHTML = "";
  let p;
  for (let i = 0; i < projects.length; i++) {
    p = document.createElement("p");
    p.innerText = projects[i];
    allProjectsDiv.appendChild(p);
  }
});
