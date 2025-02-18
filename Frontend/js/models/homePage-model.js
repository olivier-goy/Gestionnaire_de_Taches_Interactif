class ModelHomePage {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  }

  addTask(priorityTaskTag, titleTask, descriptionTask, timeTask, stateTask) {
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
      priority: priorityTaskTag,
      title: titleTask,
      description: descriptionTask,
      time: timeTask,
      state: stateTask,
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

  // Récupérer une tâches par sont id
  getTaskId (taskId) {
   return this.tasks.find(task => task.id == taskId);
  }

  updateTask(taskId, priorityTask, titleTask, descriptionTask, dateTask, stateTask) {
    const modifiedTask= {
      id: taskId,
      priority: priorityTask,
      title: titleTask,
      description: descriptionTask,
      time: dateTask,
      state: stateTask,
    }
    
    const index = this.tasks.findIndex(task => task.id == taskId);

    if(index !== -1) {
      this.tasks[index] = {...this.tasks[index], ...modifiedTask };
      localStorage.setItem("tasks", JSON.stringify(this.tasks))
    }

  }

  // Supprimer un tâches par sont id
  deleteTask(taskId) {
    const index = this.tasks.findIndex((task) => task.id == taskId);

    if (index !== -1) {
        this.tasks.splice(index, 1);

        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
  }
}

export default ModelHomePage;
