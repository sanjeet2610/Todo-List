class Project {
  #name;
  #todos;
  #id;
  constructor(name, id = null) {
    this.#name = name;
    this.#todos = [];
    this.#id = id ?? crypto.randomUUID();
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

  toJSON() {
    return {
      name: this.#name,
      id: this.#id,
      todos: this.#todos.map((todo) => todo.toJSON()),
    };
  }
}

export { Project };
