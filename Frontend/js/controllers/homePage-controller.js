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
    this.viewHomePage.bindResetFilter(this.resetFilterAndSearch.bind(this));
    this.calPercentageTask();
    this.viewHomePage.bindModalModifiedTask(this.openModifiedTask.bind(this));
    this.viewHomePage.bindModifiedTask(this.handleModifiedTask.bind(this));
    this.viewHomePage.bindDeletedTask(this.handleDeletedTask.bind(this));
    this.viewHomePage.modalTask();
    this.alertDateTask();

    this.filteredBySearch = [...this.modelHomePage.getTasks()];
    this.filteredByFilter = [...this.filteredBySearch];

    this.currentSearch = "";
    this.currentFilter = "";
  }

  // Méthode pour gérer l'ajout d'une tâche, qui prend comme paramètres les valeurs d'une nouvelle tâche provenant de la méthode bindAddTask de la vue,
  // puis les envoie à la méthode addTask du modèle pour ajouter la tâche à la liste.
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

  // Méthode pour mettre à jour le critère de recherche (currentSearch)
  // et actualiser l'affichage en appliquant la recherche et les filtres.
  // Elle prend en paramètre la valeur de l'input de recherche des tâches,
  // qui provient de la méthode filterTask de la vue.
  searchTasks(searchBarValue) {
    this.currentSearch = searchBarValue;

    // Mise à jour l'affichage
    this.applySearchAndFilter();
  }

  // Méthode pour mettre à jour le critère de filtre (currentFilter)
  // et actualiser l'affichage en appliquant le tri/filtrage combiné
  // (affichage des tâches qui correspondent à la fois à la recherche et au filtre sélectionné).
  // Elle prend comme paramètre la valeur du select, qui provient de la méthode sortFilterTask de la vue.
  sortTask(filterPriorityTask) {
    this.currentFilter = filterPriorityTask;
    // Mise à jour de l'affichage avec les nouveaux critères
    this.applySearchAndFilter();
  }

  // Méthode pour réinitialiser les filtres et la recherche
  resetFilterAndSearch() {
    this.currentSearch = '';
    this.currentFilter = '';

    this.filteredBySearch = [...this.modelHomePage.getTasks()];
    this.filteredByFilter = [...this.filteredBySearch];

    this.viewHomePage.renderTasks(this.filteredByFilter);

  }

  // Méthode pour appliquer les critères de recherche et de filtre sur l'ensemble des tâches
  // et mettre à jour l'affichage avec l'intersection des deux conditions (recherche et filtre).
  applySearchAndFilter() {
    let tasks = [...this.modelHomePage.getTasks()]; // Toutes les tâches de départ

    // Appliquer la recherche (si un critère est présent)
    if (this.currentSearch.trim() !== "") {

      function normalizeText(text) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      }
      const searchText = normalizeText(this.currentSearch.toLowerCase());
      tasks = tasks.filter(task => normalizeText(task.title.toLowerCase()).includes(searchText));
    }

    // Appliquer le filtre (si un critère est présent)
    if (this.currentFilter) {
      const priorityOrder = { Basse: 1, Moyenne: 2, Elevée: 3 };
      switch (this.currentFilter) {
        case "sort":
          this.modelHomePage.getTasks();
          break;
        case "shorter":
          tasks.sort((a, b) => new Date(a.time) - new Date(b.time));
          break;
        case "longest":
          tasks.sort((a, b) => new Date(b.time) - new Date(a.time));
          break;
        case "low":
          tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
          break;
        case "top":
          tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
          break;
        case "lowPriority":
          tasks = tasks.filter(task => task.priority === "Basse");
          break;
        case "mediumPriority":
          tasks = tasks.filter(task => task.priority === "Moyenne");
          break;
        case "higtPriority":
          tasks = tasks.filter(task => task.priority === "Elevée");
          break;
        default:
          break;
      }
    }
    this.viewHomePage.renderTasks(tasks);
    this.viewHomePage.bindDeletedTask(this.handleDeletedTask.bind(this));
    this.viewHomePage.bindModalModifiedTask(this.openModifiedTask.bind(this));
    this.viewHomePage.bindModifiedTask(this.handleModifiedTask.bind(this));
  }

  // Méthode pour calculer le pourcentage d'avancement du projet en fonction des tâches terminées et en cours.
  calPercentageTask() {
    const tasks = this.modelHomePage.getTasks();
    const numberTask = tasks.length;
    const numberCompletedTask = tasks.filter((task) => task.state == "finish").length;

    if (numberTask) {
      this.viewHomePage.percentageTask((numberCompletedTask * 100) / numberTask);
    } else if (numberTask == 0) {
      this.viewHomePage.percentageTask(null);
    } else {
      this.viewHomePage.percentageTask(0);
    }
    // Mise à jour l'affichage.
    this.viewHomePage.bindDeletedTask(this.handleDeletedTask.bind(this));
    this.viewHomePage.bindModalModifiedTask(this.openModifiedTask.bind(this));
    this.viewHomePage.bindModifiedTask(this.handleModifiedTask.bind(this));
  }

  // Méthode pour récupérer une tâche spécifique en utilisant son id, passé en paramètre depuis la méthode bindModalModifiedTask dans la vue,
  // elle appelle la méthode getTaskId dans le modèle, récupère le résultat et le retourne à la méthode bindModifiedTask de la vue.

  openModifiedTask(taskId) {
    const getTaskId = this.modelHomePage.getTaskId(taskId);

    // Mise à jour l'affichage
    this.viewHomePage.bindModifiedTask(this.handleModifiedTask.bind(this), getTaskId);
  }

  // Méthode pour gérer les modifications d'une tâche, prenant comme paramètres les valeurs provenant de la méthode bindModifiedTask dans la vue,
  // et les envoyant à la méthode updateTask dans le modèle pour mettre à jour la tâche.
  handleModifiedTask(taskId, priorityTask, titleTask, descriptionTask, dateTask, stateTask, selectFilter, searchFilter) {
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
    this.viewHomePage.bindModalModifiedTask(this.openModifiedTask.bind(this));
    this.viewHomePage.bindModifiedTask(this.handleModifiedTask.bind(this));
    selectFilter ? this.sortTask(selectFilter) : "";
    searchFilter ? this.searchTasks(searchFilter) : "";
    this.calPercentageTask();
  }

  // Méthode pour gérer la suppression d'une tâche, prenant comme paramètre l'id d'une tâche provenant de la méthode bindDeletedTask dans la vue,
  // et l'envoyant à la méthode deleteTask dans le modèle pour supprimer la tâche.
  handleDeletedTask(taskId, selectFilter, searchFilter) {
    this.modelHomePage.deleteTask(taskId);

    // Mettre à jour l'affichage
    this.viewHomePage.renderTasks(this.modelHomePage.getTasks());
    this.viewHomePage.bindDeletedTask(this.handleDeletedTask.bind(this));
    this.viewHomePage.bindModifiedTask(this.handleModifiedTask.bind(this));
    selectFilter ? this.sortTask(selectFilter) : "";
    searchFilter ? this.searchTasks(searchFilter) : "";
    this.calPercentageTask();
  }

  // Méthode pour gérer les alertes des tâches qui doivent être terminées aujourd'hui ou qui ont une date dépassée,
  // en ne prenant en compte que celles qui sont actuellement en cours.
  alertDateTask() {
    const tasks = this.modelHomePage.getTasks()

    const conpletedTasks = tasks.filter(task => task.state == "inProgress");
    const todaysDate = conpletedTasks.some(task => new Date().toLocaleDateString('fr-FR') == new Date(task.time).toLocaleDateString('fr-FR'));
    const pastDate = conpletedTasks.some(task => new Date().toLocaleDateString('fr-FR') > new Date(task.time).toLocaleDateString('fr-FR'));

    todaysDate ? alert("Attention une ou plusieurs tâches sont à finir aujourd'hui") : "";
    pastDate ? alert("Attention la date de une ou plusieurs tâches sont dépasser") : "";
  }
}

export default ControllerHomePage;
