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

// Sort in order of decreasing priority
export function rearrangeTodos(reqProject) {
  let currProj, prevPriority, currPriority, smallest, dummy;
  currProj = todos[reqProject];
  for (let j = 0; j < currProj.length - 1; j++) {
    prevPriority = currProj[j]["priority"];
    smallest = j;
    for (let k = j + 1; k < currProj.length; k++) {
      currPriority = currProj[k]["priority"];
      if (currPriority < currProj[smallest]["priority"]) {
        smallest = k;
      }
    }
    dummy = currProj[j];
    currProj[j] = currProj[smallest];
    currProj[smallest] = dummy;
  }
}
