import ModelHomePage from "../models/homePage-model.js";
import ViewHomePage from "../views/homePage-view.js";

class ControllerHomePage {
  constructor() {
    this.viewHomePage = new ViewHomePage();
    this.modelHomePage = new ModelHomePage();

    this.viewHomePage.bindAddTask(this.handleAddTask.bind(this));
    this.viewHomePage.renderTasks(this.modelHomePage.getTasks());

    this.viewHomePage.filterTask(this.modelHomePage.getTasks());
    this.viewHomePage.modalCreateTask();
    this.viewHomePage.PercentageTask(this.modelHomePage.calPercentageTask());
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

    // Mettre à jour l'affichage
    this.viewHomePage.PercentageTask(this.modelHomePage.getTasks());
    this.viewHomePage.renderTasks(this.modelHomePage.getTasks());
}
}

export default ControllerHomePage;