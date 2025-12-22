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
    const name = project.getProjectName();
    const projectElement = document.createElement("p");
    projectElement.textContent = name;
    projectElement.dataset.id = project.getProjectId();

    sidebar.appendChild(projectElement);
    if (manager.getCurrentProject().getProjectId() === project.getProjectId()) {
      projectElement.style.backgroundColor = "red";
    }
    projectElement.addEventListener("click", (e) => {
      manager.setCurrentProject(project.getProjectId());
      renderProjects(manager, onProjectChange);
      onProjectChange();
    });
  });
}

function setUpProjectModal(manager, onProjectChange) {
  const modal = document.querySelector(".project-modal");
  const submitBtn = document.querySelector(".submit-button");
  submitBtn.addEventListener("click", () => {
    const project = document.querySelector("#projectName");
    manager.addProject(project.value);
    renderProjects(manager, onProjectChange);
    modal.close();
  });
}

export { renderProjects, setUpProjectModal };
