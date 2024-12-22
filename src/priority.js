import { projects, todos } from "./central.js";

export function assignPriorityClass(todoDiv, priority) {
  if (priority == 1 ) {
    todoDiv.classList.add("priority1");
  }
  else if (priority == 2) {
    todoDiv.classList.add("priority2");
  }
  else if (priority == 3) {
    todoDiv.classList.add("priority3");
  }
  else if (priority == 4) {
    todoDiv.classList.add("priority4");
  }
  else if (priority == 5) {
    todoDiv.classList.add("priority5");
  }
}


function rearrangeTodos() {
  
}
