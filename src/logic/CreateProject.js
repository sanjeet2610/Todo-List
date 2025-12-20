class Project {
  #name;
  #todos;
  constructor(name) {
    this.#name = name;
    this.#todos = [];
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
