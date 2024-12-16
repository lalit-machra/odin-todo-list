import "./style.css";


export const projects = [];
export const todos = {};


function addToProjects(project) {
  projects.push(project);
  console.log(projects);
}


class todoItemGenerator {
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
  console.log(todos);
}


export { addToProjects, todoItemGenerator, addToTodos };