import ModelHomePage from "../models/homePage-model.js";
import ViewHomePage from "../views/homePage-view.js";

class ControllerHomePage {
  constructor() {
    this.viewHomePage = new ViewHomePage();
    this.modelHomePage = new ModelHomePage();

    this.viewHomePage.bindAddTask(this.handleAddTask.bind(this));
    this.viewHomePage.sortFilterTask(this.sortTask.bind(this));
    this.viewHomePage.renderTasks(this.modelHomePage.getTasks());

    this.viewHomePage.filterTask(this.modelHomePage.getTasks());
    this.viewHomePage.modalCreateTask();

    this.calPercentageTask();
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
    this.viewHomePage.renderTasks(this.modelHomePage.getTasks());
    this.calPercentageTask();
  }

  // Méthode de calculer le pourcentage des tâches
  calPercentageTask() {
    const tasks = this.modelHomePage.getTasks();
    const numberTask = tasks.length;
    const numberCompletedTask = tasks.filter(
      (task) => task.state == "finish"
    ).length;
    this.viewHomePage.percentageTask((numberCompletedTask * 100) / numberTask);
  }

  //Méthode pour trier par date et priorité
  sortTask(filterPriorityTask) {
    const filterPriorityTaskValue = filterPriorityTask.value;
    const tasks = this.modelHomePage.getTasks();

/*     priorityOrder = {
        "Basse" : 0,
        "Moyenne" : 1,
        "Elevée" : 2
    } */
    if (filterPriorityTaskValue == "sort") {
      this.viewHomePage.renderTasks(tasks.sort((a, b) => a.id - b.id));
    } else if (filterPriorityTaskValue == "shorter") {
      this.viewHomePage.renderTasks(
        tasks.sort((a, b) => new Date(a.time) - new Date(b.time))
      );
    } else if (filterPriorityTaskValue == "longest") {
      this.viewHomePage.renderTasks(
        tasks.sort((a, b) => new Date(b.time) - new Date(a.time))
      );
    } else if (filterPriorityTaskValue == "low") {
    } else if (filterPriorityTaskValue == "top") {
    }
  }
}

export default ControllerHomePage;
