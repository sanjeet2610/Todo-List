import { Todo } from "./logic/createTodo";
import { Project } from "./logic/CreateProject";

function saveState(manager) {
  const data = {
    projects: manager.getAllProjects().map((p) => p.toJSON()),
    currentProjectId: manager.getCurrentProject().getProjectId(),
  };

  localStorage.setItem("todoApp", JSON.stringify(data));
}

function loadState(manager) {
  const raw = localStorage.getItem("todoApp");
  if (!raw) return;

  const data = JSON.parse(raw);

  manager.clearProjects();

  data.projects.forEach((pData) => {
    const project = new Project(pData.name, pData.id);

    pData.todos.forEach((tData) => {
      const todo = new Todo(
        tData.title,
        tData.description,
        tData.dueDate,
        tData.priority,
        tData.id
      );
      if (tData.completed) todo.markComplete();
      project.addTodo(todo);
    });
    manager.addExistingProject(project);
  });
  manager.setCurrentProject(data.currentProjectId);
}

export { saveState, loadState };
