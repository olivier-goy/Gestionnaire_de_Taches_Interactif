class ModelHomePage {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  }

  // Méthode pour la création d'un identifiant unique et l'ajout d'une tâche sous forme d'objet dans un tableau stocké dans le localStorage,
  // prend comme paramètres toutes les valeurs provenant de la méthode handleAddTask du contrôleur.
  addTask(priorityTaskTag, titleTask, descriptionTask, timeTask, stateTask) {
    let newId;

    // Gestion des identifiants des tâches en fonction de leur disponibilité dans le localStorage,
    // vérifie si un ID existe déjà et attribue un nouveau ID ou récupère le dernier ID utilisé.
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

  // Méthode pour retourner l'objet d'une tâche en fonction de son ID, prend comme paramètre l'ID d'une tâche
  // provenant de la méthode openModificationTask du controller.
  getTaskId (taskId) {
   return this.tasks.find(task => task.id == taskId);
  }

  // Méthode pour modifier l'objet d'une tâche, l'injecter dans le tableau et sauvegarder le nouveau tableau dans le localStorage.
  // Prend comme paramètre l'ID ainsi que les différentes valeurs provenant de la méthode handleModifiedTask du controller.
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

  // Méthode pour supprimer l'objet d'une tâche du tableau grâce à son ID et sauvegarder le tableau modifié dans le localStorage.
  // Prend comme paramètre l'ID de la tâche provenant de la méthode handleDeletedTask du controller.
  deleteTask(taskId) {
    const index = this.tasks.findIndex((task) => task.id == taskId);

    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    }
  }
}

export default ModelHomePage;
