import { Todo } from "../logic/createTodo";
import { saveState } from "../storage";
import { format, parseISO } from "date-fns";

let editingTodo = null;

function renderTodos(manager) {
  const container = document.querySelector(".container");
  container.textContent = "";
  const allTodos = manager.getCurrentProject().getTodos();
  const addTodo = document.createElement("button");
  addTodo.textContent = "New Todo";
  addTodo.classList.add("new-todo");
  container.appendChild(addTodo);
  const modal = document.querySelector(".modal");

  addTodo.addEventListener("click", () => {
    editingTodo = null;
    document.querySelector(".todo-form").reset();
    modal.showModal();
  });

  allTodos.forEach((todo) => {
    const title = todo.getTitle();
    const dueDate = todo.getDate();
    const priority = todo.getPriority();
    const id = todo.getId();

    const row = document.createElement("div");
    row.classList.add("row");

    const name = document.createElement("p");
    name.textContent = title;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.checked = todo.isCompleted();

    const date = document.createElement("p");
    const formattedDate = format(parseISO(dueDate), "dd MMM yyyy");
    date.textContent = formattedDate;

    const urgency = document.createElement("p");
    urgency.textContent = priority;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      manager.getCurrentProject().deleteTodo(id);
      saveState(manager);

      renderTodos(manager);
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit/View";
    editBtn.addEventListener("click", () => {
      modal.showModal();
      document.querySelector(".todo-form").reset();

      const title = document.querySelector("#title");
      const desc = document.querySelector("#description");
      const dueDate = document.querySelector("#dueDate");
      const priority = document.querySelector("#priority");

      title.value = todo.getTitle();
      desc.value = todo.getDescription();
      dueDate.value = todo.getDate();
      priority.value = todo.getPriority();
      editingTodo = todo;
    });

    if (checkbox.checked) {
      row.style.textDecoration = "line-through";
    }

    row.append(checkbox, name, date, urgency, deleteBtn, editBtn);
    container.appendChild(row);

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        todo.markComplete();
      } else {
        todo.markUncomplete();
      }
      renderTodos(manager);
      saveState(manager);
    });
  });
}

function setUpTodoModal(manager) {
  const modal = document.querySelector(".modal");
  const submitBtn = document.querySelector(".submit");
  const cancelBtn = document.querySelector(".cancel");
  const form = document.querySelector(".todo-form");

  submitBtn.addEventListener("click", () => {
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#dueDate");
    const priority = document.querySelector("#priority");

    if (editingTodo) {
      editingTodo.update({
        title: title.value,
        description: description.value,
        dueDate: dueDate.value,
        priority: priority.value,
      });
      saveState(manager);
    } else {
      const todo = new Todo(
        title.value,
        description.value,
        dueDate.value,
        priority.value
      );
      manager.getCurrentProject().addTodo(todo);
      saveState(manager);
    }

    editingTodo = null;
    renderTodos(manager);
    form.reset();
    modal.close();
  });

  cancelBtn.addEventListener("click", () => {
    modal.close();
  });
}

export { renderTodos, setUpTodoModal };
