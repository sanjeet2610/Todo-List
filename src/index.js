import { renderProjects, setUpProjectModal } from "./dom/projectDom";
import { renderTodos, setUpTodoModal } from "./dom/todoDom";
import { ProjectManager } from "./logic/ProjectManager";
import "./style.css";

const manager = new ProjectManager();

renderProjects(manager, () => renderTodos(manager));
renderTodos(manager);
setUpTodoModal(manager);
setUpProjectModal(manager, () => renderTodos(manager));
