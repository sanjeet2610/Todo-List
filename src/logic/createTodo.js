class Todo {
  #title;
  #description;
  #dueDate;
  #priority;
  #completed;
  #id;
  constructor(title, description, dueDate, priority, id = null) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#completed = false;
    this.#id = id ?? crypto.randomUUID();
  }

  getTitle() {
    return this.#title;
  }

  getDescription() {
    return this.#description;
  }

  getDate() {
    return this.#dueDate;
  }

  getPriority() {
    return this.#priority;
  }

  getId() {
    return this.#id;
  }

  markComplete() {
    this.#completed = true;
  }

  markUncomplete() {
    this.#completed = false;
  }

  isCompleted() {
    return this.#completed;
  }

  update({ title, description, dueDate, priority }) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
  }

  toJSON() {
    return {
      title: this.#title,
      id: this.#id,
      dueDate: this.#dueDate,
      priority: this.#priority,
      description: this.#description,
      completed: this.#completed,
    };
  }
}

export { Todo };
