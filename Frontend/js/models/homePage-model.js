class ModelHomePage {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  }

  addTask(tagPriority, title, descriptionTask, time, stateTask) {
    let newId;

    // Gestion des ID pour les tâches en fonction de la disponibilité dans le localstorage
    if (this.tasks.length === 0) {
      newId = 1;
    } else {
      const existingIds = this.tasks.map((task) => task.id);
      newId = 1;
      while (existingIds.includes(newId)) {
        newId++;
      }
    }

    // Créer l'objet de la nouvelle tâches
    const newTask = {
      id: newId,
      priority: tagPriority,
      title: title,
      description: descriptionTask,
      time: time,
      state: stateTask
    };

    // Ajouter l'objet de la tâches à la liste
    this.tasks.push(newTask);

    // Sauvegarder l'objet de la tâches dans le localstorage
    this.saveTasks();
  }

  // Sauvegarder dans le localstorage
  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  // Récupérer toutes les tâches dans le localstorage
  getTasks() {
    return this.tasks;
  }
}

export default ModelHomePage;
