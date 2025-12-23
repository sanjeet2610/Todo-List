import { renderProjects, setUpProjectModal } from "./dom/projectDom";
import { renderTodos, setUpTodoModal } from "./dom/todoDom";
import { ProjectManager } from "./logic/ProjectManager";
import "./style.css";
import { loadState } from "./storage";

const manager = new ProjectManager();
loadState(manager);
renderProjects(manager, () => renderTodos(manager));
renderTodos(manager);
setUpTodoModal(manager);
setUpProjectModal(manager, () => renderTodos(manager));
