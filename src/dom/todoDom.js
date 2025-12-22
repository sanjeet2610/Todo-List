import { Todo } from "../logic/createTodo";

function renderTodos(manager) {
  const container = document.querySelector(".container");
  container.textContent = "";
  const allTodos = manager.getCurrentProject().getTodos();
  const addTodo = document.createElement("button");
  addTodo.textContent = "New Todo";
  container.appendChild(addTodo);

  addTodo.addEventListener("click", () => {
    const modal = document.querySelector(".modal");
    modal.showModal();
  });

  allTodos.forEach((todo) => {
    const title = todo.getTitle();
    const dueDate = todo.getDate();
    const priority = todo.getPriority();
    const id = todo.getId();

    const row = document.createElement("div");

    const name = document.createElement("p");
    name.textContent = title;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isCompleted();
    if (checkbox.checked) {
      name.style.textDecoration = "line-through";
    }

    const date = document.createElement("p");
    date.textContent = dueDate;

    const urgency = document.createElement("p");
    urgency.textContent = priority;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      manager.getCurrentProject().deleteTodo(id);
      renderTodos(manager);
    });

    row.append(checkbox, name, date, urgency, deleteBtn);
    container.appendChild(row);

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        todo.markComplete();
      } else {
        todo.markUncomplete();
      }
      renderTodos(manager);
    });
  });
}

function setUpTodoModal(manager) {
  const modal = document.querySelector(".modal");
  const submitBtn = document.querySelector(".submit");
  const cancelBtn = document.querySelector(".cancel");

  submitBtn.addEventListener("click", () => {
    const title = document.querySelector("#title");
    const desc = document.querySelector("#description");
    const dueDate = document.querySelector("#dueDate");
    const priority = document.querySelector("#priority");

    const todo = new Todo(
      title.value,
      desc.value,
      dueDate.value,
      priority.value
    );

    manager.getCurrentProject().addTodo(todo);
    renderTodos(manager);
    modal.close();
  });

  cancelBtn.addEventListener("click", () => {
    modal.close();
  });
}

export { renderTodos, setUpTodoModal };
