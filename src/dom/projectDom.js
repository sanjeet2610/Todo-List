function renderProjects(manager, onProjectChange) {
  const sidebar = document.querySelector(".sidebar");
  sidebar.textContent = "";
  const container = document.querySelector(".container");
  container.textContent = "";
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

export { renderProjects };
