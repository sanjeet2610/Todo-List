class Project {
  #name;
  #todos;
  #id;
  constructor(name) {
    this.#name = name;
    this.#todos = [];
    this.#id = crypto.randomUUID();
  }

  getProjectId() {
    return this.#id;
  }
  getProjectName() {
    return this.#name;
  }

  addTodo(todo) {
    this.#todos.push(todo);
  }

  deleteTodo(id) {
    this.#todos = this.#todos.filter((todo) => id != todo.getId());
  }

  getTodos() {
    return this.#todos;
  }
}

export { Project };
