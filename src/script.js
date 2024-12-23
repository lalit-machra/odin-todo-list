export const projects = [];
export const todos = {};


export function assignToProjects(data) {
  for (let i = 0; i < data.length; i++) {
    projects.push(data[i]);
  }
}


export function assignToTodos(data) {
  for (let key in data) {
    todos[key] = data[key];
  }
}


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
  if (todos[todo["project"]] == undefined) {
    todos[todo["project"]] = [];
  }
  todos[todo["project"]].push(todo);
}


export { addToProjects, todoGenerator, addToTodos };