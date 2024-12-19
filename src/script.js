export const projects = [];
export const todos = {};


function addToProjects(project) {
  projects.push(project);
}


class todoGenerator {
  constructor(description, category, dueTime, dueDate, priority, project) {
    this.description = description;
    this.category = category
    this.dueTime = dueTime;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = "not-completed";
    this.project = project;
  }
}


function addToTodos(todo) {
  for (let i = 0; i < todo["project"].length; i++) {
    if (todos[todo["project"][i]] == undefined) {
      todos[todo["project"][i]] = [];
    }
    todos[todo["project"][i]].push(todo);
  }
}


export { addToProjects, todoGenerator, addToTodos };