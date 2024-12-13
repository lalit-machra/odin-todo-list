import "./style.css"

class projectGenerator {
  constructor(name) {
    this.name = name;
  }
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

const todo2 = new todoItemGenerator("Wash clothes", "Home","10:00AM", "25/10/2024", "2");
console.log(todo2);