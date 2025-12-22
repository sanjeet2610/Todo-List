import { renderProjects } from "./dom/projectDom";
import { renderTodos, setUpTodoModal } from "./dom/todoDom";
import { ProjectManager } from "./logic/ProjectManager";
import { Todo } from "./logic/createTodo";
import "./style.css";

const manager = new ProjectManager();
manager.addProject("one");
manager.addProject("two");
renderProjects(manager, () => renderTodos(manager));

const todo1 = new Todo("xyz", "qec", 22, "high");
manager.getCurrentProject().addTodo(todo1);
renderTodos(manager);
setUpTodoModal(manager);
