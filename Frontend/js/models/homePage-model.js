class ModelHomePage {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  }

  // Méthode pour la création d'un id et l'ajout d'une tâche sous forme d'objet dans un tableau du localstorage, prend comme paramêtre toutes les valeur provenant de la méthode handleAddTask du controller.
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

    const newTask = {
      id: newId,
      priority: priorityTaskTag,
      title: titleTask,
      description: descriptionTask,
      time: timeTask,
      state: stateTask,
    };

    this.tasks.push(newTask);
    this.saveTasks();
  }

  // Méthode pour sauvegarder dans le localstorage
  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  // Méthode pour retourner le tableau de toutes les tâches
  getTasks() {
    return this.tasks;
  }

  // Méthode pour Retourner l'objet d'une tâches par sont id, prend comme paramètre id d'une tache provenant de la méthode openModificationTask du controller.
  getTaskId (taskId) {
   return this.tasks.find(task => task.id == taskId);
  }

  // Méthode pour modifier l'objet d'une tâches l'injecter dans le tableau et sauvegarder le nouveau tableau dans le localstorage, prend comme paramètre l'id ainsi que les différentes valeur provenant de la méthode handleModifiedTask du controller.
  updateTask(taskId, priorityTask, titleTask, descriptionTask, dateTask, stateTask) {
    const modifiedTask= {
      id: taskId,
      priority: priorityTask,
      title: titleTask,
      description: descriptionTask,
      time: dateTask,
      state: stateTask
    }
    
    const index = this.tasks.findIndex(task => task.id == taskId);

    if(index !== -1) {
      this.tasks[index] = {...this.tasks[index], ...modifiedTask };
      this.saveTasks();
    }

  }

  // Méthode pour supprimer l'objet d'une tâches du tableau grace à sont id et sauvegarde le tableau modifier dans le localstorage, prend comme paramètre id de la tâche provenant de la méthode handleDeletedTask du controller.
  deleteTask(taskId) {
    const index = this.tasks.findIndex((task) => task.id == taskId);

    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    }
  }
}

export default ModelHomePage;
