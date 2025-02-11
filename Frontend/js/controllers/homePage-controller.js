import ModelHomePage from "../models/homePage-model.js";
import ViewHomePage from "../views/homePage-view.js";

class ControllerHomePage {
  constructor() {
    this.viewHomePage = new ViewHomePage();
    this.modelHomePage = new ModelHomePage();

    this.viewHomePage.bindAddTask(this.handleAddTask.bind(this));
    this.viewHomePage.renderTasks(this.modelHomePage.getTasks());
  }

  // Ajouter la tâche au modèle
  handleAddTask(priorityTask, titleTask, descriptionTask, dateTask, stateTask) {
    this.modelHomePage.addTask(
      priorityTask,
      titleTask,
      descriptionTask,
      dateTask,
      stateTask
    );
    this.viewHomePage.renderTasks(this.modelHomePage.getTasks()); // Mettre à jour l'affichage
  }
}

export default ControllerHomePage;