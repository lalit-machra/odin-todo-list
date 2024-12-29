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
  constructor(title, description, dueDate, priority, project) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.status = 'not-completed';
  }
}

function addToTodos(todo) {
  if (todos[todo.project] === undefined) {
    todos[todo.project] = [];
  }
  todos[todo.project].push(todo);
}

export { addToProjects, todoGenerator, addToTodos };
