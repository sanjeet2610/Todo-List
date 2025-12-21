import { Project } from "./CreateProject";

class ProjectManager {
  #default;
  #current;
  #allProjects;
  constructor() {
    this.#default = new Project("default");
    this.#allProjects = [this.#default];
    this.#current = this.#default;
  }

  addProject(projectName) {
    const project = new Project(projectName);
    this.#allProjects.push(project);
  }

  getProject(id) {
    return this.#allProjects.find((project) => id === project.getProjectId());
  }

  getCurrentProject() {
    return this.#current;
  }

  setCurrentProject(id) {
    const project = this.#allProjects.find(
      (project) => id === project.getProjectId()
    );
    if (project) this.#current = project;
  }

  getAllProjects() {
    return this.#allProjects;
  }
}

export { ProjectManager };
