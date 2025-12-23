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

  deleteProject(id) {
    if (id == this.#default.getProjectId()) return;

    const wasCurrent = id === this.#current.getProjectId();

    this.#allProjects = this.#allProjects.filter(
      (project) => project.getProjectId() !== id
    );

    if (wasCurrent) {
      this.#current = this.#default;
    }
  }

  getAllProjects() {
    return this.#allProjects;
  }

  clearProjects() {
    this.#allProjects = [];
  }

  addExistingProject(project) {
    this.#allProjects.push(project);
  }
}

export { ProjectManager };
