import { saveState } from "../storage";

function renderProjects(manager, onProjectChange) {
  const sidebar = document.querySelector(".sidebar");
  sidebar.textContent = "";

  const newProject = document.createElement("button");
  newProject.textContent = "New Project";
  newProject.classList.add("newProject");
  const modal = document.querySelector(".project-modal");
  newProject.addEventListener("click", () => {
    modal.showModal();
  });
  sidebar.appendChild(newProject);

  const allProjects = manager.getAllProjects();

  allProjects.forEach((project) => {
    const projectRow = document.createElement("div");
    projectRow.classList.add("projectRow");
    const name = project.getProjectName();
    const projectElement = document.createElement("p");
    projectElement.textContent = name;
    projectElement.dataset.id = project.getProjectId();

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    if (project.getProjectName() === "default") {
      deleteBtn.disabled = true;
      deleteBtn.style.visibility = "hidden";
    }

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      manager.deleteProject(project.getProjectId());
      saveState(manager);
      renderProjects(manager, onProjectChange);
      onProjectChange();
    });

    projectRow.append(projectElement, deleteBtn);
    sidebar.appendChild(projectRow);

    if (manager.getCurrentProject().getProjectId() === project.getProjectId()) {
      projectRow.style.backgroundColor = "red";
    }
    projectRow.addEventListener("click", (e) => {
      manager.setCurrentProject(project.getProjectId());
      saveState(manager);

      renderProjects(manager, onProjectChange);
      onProjectChange();
    });
  });
}

function setUpProjectModal(manager, onProjectChange) {
  const modal = document.querySelector(".project-modal");
  const submitBtn = document.querySelector(".submit-button");
  const projectName = document.querySelector("#projectName");

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const project = document.querySelector("#projectName");
    manager.addProject(project.value);
    saveState(manager);
    renderProjects(manager, onProjectChange);
    onProjectChange();
    projectName.value = "";
    modal.close();
  });
}

export { renderProjects, setUpProjectModal };
