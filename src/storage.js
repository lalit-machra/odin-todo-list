import { projects, displayProjects, assignToProjects, todos, generateCheckboxes, displayTodos, assignToTodos, loadSidebar } from "./central.js";

// When the window loads, check for existing resources or load new
window.addEventListener("load", () => {
  let storage = window.localStorage;
  const projSubmitBtn = document.querySelector(".newProjDialog .submitBtn");
  // Load resources from localStorage if they exist
  if (storage["projects"]) {
    assignToProjects(JSON.parse(storage["projects"]));
    displayProjects();
    loadSidebar();
    generateCheckboxes();
    if (storage["todos"]) {
      assignToTodos(JSON.parse(storage["todos"]));
      displayTodos();
    }
  }
  else {
    // Stimulate clicking on the project submit button with the input value "Starter Project"
    let clickEvent = new Event("click");
    const input = document.querySelector("input#project-name");
    input.value = "Starter Project";
    projSubmitBtn.dispatchEvent(clickEvent);
  }
});


function addToStorage(data) {
  let storage = window.localStorage;
  if (data === projects) {
    storage["projects"] = JSON.stringify(data);
  }
  else if (data === todos) {
    storage["todos"] = JSON.stringify(data);
  }
}

export { addToStorage };