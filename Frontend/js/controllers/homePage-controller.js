import ModelHomePage from "../models/homePage-model.js";
import ViewHomePage from "../views/homePage-view.js";

class ControllerHomePage {
  constructor() {
    this.viewHomePage = new ViewHomePage();
    this.modelHomePage = new ModelHomePage();

    this.viewHomePage.bindAddTask(this.handleAddTask.bind(this));
    this.viewHomePage.bindModalModifiedTask(this.openModifiedTask.bind(this));
    this.viewHomePage.bindModifiedTask(this.handleModifiedTask.bind(this))
    this.viewHomePage.sortFilterTask(this.sortTask.bind(this));
    this.viewHomePage.renderTasks(this.modelHomePage.getTasks());
    this.viewHomePage.searchBarTask(this.searchTasks.bind(this));
    this.viewHomePage.filterTask(this.modelHomePage.getTasks());
    this.viewHomePage.bindDeletedTask(this.handleDeltedTask.bind(this));
    this.viewHomePage.modalTask();

    this.calPercentageTask();
  }

  // Ajouter la tâche au modèle
  handleAddTask(priorityTask, titleTask, descriptionTask, dateTask, stateTask) {
    console.log('coucou')
    this.modelHomePage.addTask(
      priorityTask,
      titleTask,
      descriptionTask,
      dateTask,
      stateTask
    );

    // Mettre à jour l'affichage
    this.viewHomePage.renderTasks(this.modelHomePage.getTasks());
    this.viewHomePage.bindDeletedTask(this.handleDeltedTask.bind(this));
    this.viewHomePage.bindModalModifiedTask(this.openModifiedTask.bind(this));
    this.calPercentageTask();
  }

  // Méthode pour rechercher pas titre
  searchTasks(searchBar) {
    function normalizeText(textTitle) {
      return textTitle.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const searchBarValue = normalizeText(searchBar.toLowerCase());
    const tasks = this.modelHomePage.getTasks();

    if (searchBarValue.trim() === "") {
      this.viewHomePage.renderTasks(tasks);
      return;
    }

    const researchTitle = tasks.filter((task) =>
      normalizeText(task.title.toLowerCase()).includes(searchBarValue)
    );

    if (researchTitle.length === 0) {
      this.viewHomePage.renderTasks(tasks);
      alert("Aucune correspondance trouvée !");
      return;
    }
    // Mettre à jour l'affichage
    this.viewHomePage.renderTasks(researchTitle);
    this.viewHomePage.bindDeletedTask(this.handleDeltedTask.bind(this));
    this.viewHomePage.bindModalModifiedTask(this.openModifiedTask.bind(this));
  }

  // Méthode de calculer le pourcentage des tâches
  calPercentageTask() {
    const tasks = this.modelHomePage.getTasks();
    const numberTask = tasks.length;
    const numberCompletedTask = tasks.filter(
      (task) => task.state == "finish"
    ).length;
    if (numberTask) {
      this.viewHomePage.percentageTask(
        (numberCompletedTask * 100) / numberTask
      );
    } else {
      this.viewHomePage.percentageTask(0);
    }
    // Mettre à jour l'affichage
    this.viewHomePage.bindDeletedTask(this.handleDeltedTask.bind(this));
    this.viewHomePage.bindModalModifiedTask(this.openModifiedTask.bind(this));
  }

  //Méthode pour trier par date et priorité
  sortTask(filterPriorityTask) {
    const filterPriorityTaskValue = filterPriorityTask.value;
    const tasks = this.modelHomePage.getTasks();

    const priorityOrder = {
      Basse: 1,
      Moyenne: 2,
      Elevée: 3,
    };

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
      const sortedIncreasingTasks = tasks.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );
      this.viewHomePage.renderTasks(sortedIncreasingTasks);
    } else if (filterPriorityTaskValue == "top") {
      const sortedDecreaseTasks = tasks.sort(
        (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
      );
      this.viewHomePage.renderTasks(sortedDecreaseTasks);
    } else if (filterPriorityTaskValue == "lowPriority") {
      const filterLowPriority = tasks.filter(
        (task) => task.priority == "Basse"
      );
      this.viewHomePage.renderTasks(filterLowPriority);
    } else if (filterPriorityTaskValue == "mediumPriority") {
      const filterMediumPriority = tasks.filter(
        (task) => task.priority == "Moyenne"
      );
      this.viewHomePage.renderTasks(filterMediumPriority);
    } else if (filterPriorityTaskValue == "higtPriority") {
      const filterHigtPriority = tasks.filter(
        (task) => task.priority == "Elevée"
      );
      this.viewHomePage.renderTasks(filterHigtPriority);
    }
    // Mettre à jour l'affichage
    this.viewHomePage.bindDeletedTask(this.handleDeltedTask.bind(this));
    this.viewHomePage.bindModalModifiedTask(this.openModifiedTask.bind(this));
  }
  openModifiedTask(taskId) {
    const getTaskId = this.modelHomePage.getTaskId(taskId);

    // Mettre à jour l'affichage
    this.viewHomePage.renderTasks(this.modelHomePage.getTasks());
    this.viewHomePage.bindModalModifiedTask(this.openModifiedTask.bind(this));
    this.viewHomePage.bindDeletedTask(this.handleDeltedTask.bind(this));
    this.viewHomePage.bindModifiedTask(this.handleModifiedTask.bind(this), getTaskId);
  }

  handleModifiedTask(taskId, priorityTask, titleTask, descriptionTask, dateTask, stateTask) {
    this.modelHomePage.updateTask(
      taskId,
      priorityTask,
      titleTask,
      descriptionTask,
      dateTask,
      stateTask
    );

    this.viewHomePage.renderTasks(this.modelHomePage.getTasks());
    this.viewHomePage.bindDeletedTask(this.handleDeltedTask.bind(this));
    this.calPercentageTask();
  }

  handleDeltedTask(taskId) {
    this.modelHomePage.deleteTask(taskId);
    // Mettre à jour l'affichage
    this.viewHomePage.renderTasks(this.modelHomePage.getTasks());
    this.viewHomePage.bindDeletedTask(this.handleDeltedTask.bind(this));
    this.calPercentageTask();
  }
}

export default ControllerHomePage;
