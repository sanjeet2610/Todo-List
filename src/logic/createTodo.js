class Todo {
  #title;
  #description;
  #dueDate;
  #priority;
  #completed;
  #id;
  constructor(title, description, dueDate, priority) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#completed = false;
    this.#id = crypto.randomUUID();
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
}

export { Todo };
