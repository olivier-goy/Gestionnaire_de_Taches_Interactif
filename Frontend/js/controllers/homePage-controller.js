import ModelHomePage from "../models/homePage-model.js";
import ViewHomePage from "../views/homePage-view.js";

class ControllerHomePage {
  constructor() {
    this.viewHomePage = new ViewHomePage();
    this.modelHomePage = new ModelHomePage();

    this.viewHomePage.renderTasks(this.modelHomePage.getTasks());
    this.viewHomePage.bindAddTask(this.handleAddTask.bind(this));
    this.viewHomePage.searchBarTask(this.searchTasks.bind(this));
    this.viewHomePage.filterTask(this.modelHomePage.getTasks());
    this.viewHomePage.sortFilterTask(this.sortTask.bind(this));
    this.calPercentageTask();
    this.viewHomePage.bindModalModifiedTask(this.openModifiedTask.bind(this));
    this.viewHomePage.bindModifiedTask(this.handleModifiedTask.bind(this));
    this.viewHomePage.bindDeletedTask(this.handleDeletedTask.bind(this));
    this.viewHomePage.modalTask();
  }

  // Méthode pour gérer l'ajout d'une tâches qui prend comme paramètres les veleur pour une nouvelle tâches provenant de la méthode bindAddTask du fichier homePage-view.js et qui les envoyer à la méthode addTask du fichier homePage-model.js.
  handleAddTask(priorityTask, titleTask, descriptionTask, dateTask, stateTask) {
    this.modelHomePage.addTask(
      priorityTask,
      titleTask,
      descriptionTask,
      dateTask,
      stateTask
    );

    // Mise à jour l'affichage
    this.viewHomePage.renderTasks(this.modelHomePage.getTasks());
    this.viewHomePage.bindDeletedTask(this.handleDeletedTask.bind(this));
    this.viewHomePage.bindModalModifiedTask(this.openModifiedTask.bind(this));
    this.viewHomePage.bindModifiedTask(this.handleModifiedTask.bind(this));
    this.calPercentageTask();
  }

  // Méthode pour rechercher des tâches par sont titre qui prend comme paramétre la valeur de la barre de recherche provenant de la méthode searchBarTask de homePage-view.js puis retourne le resultat a la vue.
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
    // Mise à jour l'affichage
    this.viewHomePage.renderTasks(researchTitle);
    this.viewHomePage.bindDeletedTask(this.handleDeletedTask.bind(this));
    this.viewHomePage.bindModalModifiedTask(this.openModifiedTask.bind(this));
    this.viewHomePage.bindModifiedTask(this.handleModifiedTask.bind(this));
  }

  //Méthode pour filtrer des tâches qui prend comme parametre la valeur du select de la vue pour trier par date ou priorité les tâches et qui retourne à la vue un nouveau tableau avec les élements dispoble en correspondance avec le filtre.
  sortTask(filterPriorityTask) {
    const filterPriorityTaskValue = filterPriorityTask.value;
    const tasks = this.modelHomePage.getTasks();

    const priorityOrder = {
      Basse: 1,
      Moyenne: 2,
      Elevée: 3,
    }

    if (filterPriorityTaskValue == "sort") {
      const sortReset = tasks.sort((a, b) => a.id - b.id); //Reset le filtre/trie
      this.viewHomePage.renderTasks(sortReset);
    } else if (filterPriorityTaskValue == "shorter") {
      const sortShorterDate = tasks.sort((a, b) => new Date(a.time) - new Date(b.time)); // Trier par date ordre croissant
      this.viewHomePage.renderTasks(sortShorterDate);
    } else if (filterPriorityTaskValue == "longest") {
      const sortLongestDate = tasks.sort((a, b) => new Date(b.time) - new Date(a.time)); // Trier pas date ordre decroissant
      this.viewHomePage.renderTasks(sortLongestDate);
    } else if (filterPriorityTaskValue == "low") {
      const sortedIncreasingTasks = tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]); // Trier par ordre de prioriter du la plus basse à la plus élevée
      this.viewHomePage.renderTasks(sortedIncreasingTasks);
    } else if (filterPriorityTaskValue == "top") {
      const sortedDecreaseTasks = tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]); // Trier par ordre de priorité de la plus élevée à la plus basse
      this.viewHomePage.renderTasks(sortedDecreaseTasks);
    } else if (filterPriorityTaskValue == "lowPriority") {
      const filterLowPriority = tasks.filter((task) => task.priority == "Basse"); // Filtrer que les tâches avec la priorité basse
      this.viewHomePage.renderTasks(filterLowPriority);
    } else if (filterPriorityTaskValue == "mediumPriority") {
      const filterMediumPriority = tasks.filter((task) => task.priority == "Moyenne"); // Filtrer que les tâches avec la priorité moyenne
      this.viewHomePage.renderTasks(filterMediumPriority);
    } else if (filterPriorityTaskValue == "higtPriority") {
      const filterHigtPriority = tasks.filter((task) => task.priority == "Elevée"); // Filtrer que les tâches avec la priorité élevée
      this.viewHomePage.renderTasks(filterHigtPriority);
    }
    // Mise à jour l'affichage
    this.viewHomePage.bindDeletedTask(this.handleDeletedTask.bind(this));
    this.viewHomePage.bindModalModifiedTask(this.openModifiedTask.bind(this));
    this.viewHomePage.bindModifiedTask(this.handleModifiedTask.bind(this))
  }

  // Méthode pour calculer le pourcentage de fin du projet en fonction des tâches terminer et en cours
  calPercentageTask() {
    const tasks = this.modelHomePage.getTasks();
    const numberTask = tasks.length;
    const numberCompletedTask = tasks.filter((task) => task.state == "finish").length;

    if (numberTask) {
      this.viewHomePage.percentageTask((numberCompletedTask * 100) / numberTask);
    } else {
      this.viewHomePage.percentageTask(0);
    }
    // Mise à jour l'affichage.
    this.viewHomePage.bindDeletedTask(this.handleDeletedTask.bind(this));
    this.viewHomePage.bindModalModifiedTask(this.openModifiedTask.bind(this));
    this.viewHomePage.bindModifiedTask(this.handleModifiedTask.bind(this));
  }

  // Méthode pour gérer la récupération d'une tâches qui prend comme paramètre l'id d'une tâche provenant de la méthode bindModalModifiedTask dans la vue, l'envoye à la méthode getTaskId dans le model, récupére le resultat de la méthode getTaskId et le retourne à la méthode bindModifiedTask de la vue.
  openModifiedTask(taskId) {
    const getTaskId = this.modelHomePage.getTaskId(taskId);

    // Mise à jour l'affichage
    this.viewHomePage.bindModifiedTask(this.handleModifiedTask.bind(this), getTaskId);
  }

  // Méthode pour gérer les modifications d'une tâches qui prend comme paramètres les valeurs provenant de la méthode bindModifiedTask de la vue puis les envoies à la méthode updateTask du model.
  handleModifiedTask(taskId, priorityTask, titleTask, descriptionTask, dateTask, stateTask) {
    this.modelHomePage.updateTask(
      taskId,
      priorityTask,
      titleTask,
      descriptionTask,
      dateTask,
      stateTask
    );

    // Mise a jour de l'affichage
    this.viewHomePage.renderTasks(this.modelHomePage.getTasks());
    this.viewHomePage.bindDeletedTask(this.handleDeletedTask.bind(this));
    this.calPercentageTask();
  }

  // Méthode pour gérer la supprimer une tâche qui prend comme paramètre l'id d'une tâches provenant de la méthode bindDeletedTask de la vue et l'envoie à la méthode deletetask du model.
  handleDeletedTask(taskId) {
    this.modelHomePage.deleteTask(taskId);

    // Mettre à jour l'affichage
    this.viewHomePage.renderTasks(this.modelHomePage.getTasks());
    this.viewHomePage.bindDeletedTask(this.handleDeletedTask.bind(this));
    this.viewHomePage.bindModifiedTask(this.handleModifiedTask.bind(this));
    this.calPercentageTask();
  }
}

export default ControllerHomePage;
