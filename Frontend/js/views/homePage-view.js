class ViewHomePage {
  constructor() {
    this.form = document.getElementById("taskForm");
    this.taskListInProgress = document.getElementById("cardInTask");
    this.taskListCompleted = document.getElementById("cardCompleted");
    this.progressionBar = document.getElementById("progressionBar");
    this.btnSubmit = document.getElementById("btnSubmit");
  }

  // Visuel de la barre de progression
  percentageTask(percentageTask) {
    this.progressionBar.innerHTML = "";

    if (percentageTask) {
      const titleProgression = document.createElement("h3");
      titleProgression.innerText = `Progression à ${Math.round(
        percentageTask
      )}%`;
      const bar = document.createElement("progress");
      bar.max = 100;
      bar.value = percentageTask;
      bar.innerText = `${percentageTask}%`;

      this.progressionBar.appendChild(titleProgression);
      this.progressionBar.appendChild(bar);
    }
  }
  // Visuel de la carte des tâches
  renderTasks(tasks) {
    this.taskListInProgress.innerHTML = "";
    this.taskListCompleted.innerHTML = "";
    tasks.forEach((task) => {
      const divCardInProgress = document.createElement("div");
      divCardInProgress.classList = "cardTask";
      const divTagAndModificationCard = document.createElement("div");
      divTagAndModificationCard.classList = "tagAndModificationCard";
      const divTagsCard = document.createElement("div");
      divTagsCard.classList = "tagsCard";
      const tags = document.createElement("button");
      tags.textContent = task.priority;
      const divBtnModificationCard = document.createElement("div");
      divBtnModificationCard.classList = "modificationCard";

      const btnModificationCard = document.createElement("button");
      btnModificationCard.innerText = "Modifier";
      btnModificationCard.id = task.id;
      btnModificationCard.classList = "modifiedTask";
      const btnDeletedCard = document.createElement("button");
      btnDeletedCard.innerText = "Supprimer";
      btnDeletedCard.id = task.id;
      btnDeletedCard.classList = "deletedTask";

      const divTitleCard = document.createElement("div");
      divTitleCard.classList = "titleCard";
      const h3TitleCard = document.createElement("h3");
      h3TitleCard.textContent = task.title;
      const divDescriptionCard = document.createElement("div");
      divDescriptionCard.classList = "descriptionCard";
      divDescriptionCard.innerHTML = `<h3>Description :</h3> <p>${task.description}</p>`;
      const divDueDataCard = document.createElement("div");
      divDueDataCard.classList = "dueDataCard";
      const h3DueDataCard = document.createElement("h3");
      h3DueDataCard.textContent = `Date de fin: ${task.time}`;

      divTagsCard.appendChild(tags);

      divBtnModificationCard.appendChild(btnModificationCard);
      divBtnModificationCard.appendChild(btnDeletedCard);
      divTagAndModificationCard.appendChild(divTagsCard);
      divTagAndModificationCard.appendChild(divBtnModificationCard);
      divCardInProgress.appendChild(divTagAndModificationCard);
      divTitleCard.appendChild(h3TitleCard);
      divCardInProgress.appendChild(divTitleCard);
      divCardInProgress.appendChild(divDescriptionCard);
      divDueDataCard.appendChild(h3DueDataCard);
      divCardInProgress.appendChild(divDueDataCard);

      // Condition pour afficher les tâches soit dans en cours ou alors terminés
      if (task.state == "inProgress") {
        this.taskListInProgress.appendChild(divCardInProgress);
      } else {
        this.taskListCompleted.appendChild(divCardInProgress);
      }
    });
  }

  

  // Ecoute de la barre de recherche des Tâches
  searchBarTask(handler) {
    const btnSearchBar = document.getElementById("searchBar");
    btnSearchBar.addEventListener("click", () => {
      handler(document.getElementById("searchTitle").value);
    });
  }

  // Filtrer les Tâches pour toutes ou pour en cours ou terminée
  filterTask(tasks) {
    const btnFilterAllTask = document.getElementById("filterAllTask");
    btnFilterAllTask.addEventListener("click", () => {
      document.getElementById("cardInTask").style.display = "block";
      document.getElementById("cardCompleted").style.display = "block";
    });

    const btnFilterInProgressTask = document.getElementById(
      "filterInPorgressTask"
    );
    btnFilterInProgressTask.addEventListener("click", () => {
      tasks.forEach((task) => {
        if (task.state == "inProgress") {
          document.getElementById("cardCompleted").style.display = "none";
          document.getElementById("cardInTask").style.display = "block";
        }
      });
    });

    const btnFilterCompletedTask = document.getElementById(
      "filterCompletedTask"
    );
    btnFilterCompletedTask.addEventListener("click", () => {
      tasks.forEach((task) => {
        if (task.state == "finish") {
          document.getElementById("cardInTask").style.display = "none";
          document.getElementById("cardCompleted").style.display = "block";
        }
      });
    });
  }

  //Ecoute pour trier par date les tâches.
  sortFilterTask(handler) {
    const btnFilterPriorityTask = document.getElementById("filterPriorityTask");
    btnFilterPriorityTask.addEventListener("change", () => {
      handler(btnFilterPriorityTask);
    });
  }

  // Ecoute pour la modification d'une tâche
  bindModalModifiedTask(handler) {
    document.querySelectorAll(".modifiedTask").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        handler(event.currentTarget.id);
        document.getElementById("openModalCreateTask").style.display = "block"
      });
    }); 
  }
  
  bindModifiedTask(handler, task) {
    if(task) {
      this.form.querySelector('select[name="priorityTaskTag"]').value = task.priority;
      this.form.querySelector('input[name="titleTask"]').value = task.title;
      this.form.querySelector('textarea[name="descriptionTask"]').value = task.description;
      this.form.querySelector('input[name="timeTask"]').value = task.time;
      this.form.querySelector('select[name="stateTask"]').value = task.state;
    }

      this.btnSubmit.innerHTML = "";

      const addBtnSubmit = document.getElementById("btnSubmit");

      const btnModifiedTask = document.createElement("button");
      btnModifiedTask.innerText = "Modifier";
      btnModifiedTask.type = "submit";
      btnModifiedTask.id = "btnModifiedTask";

      addBtnSubmit.appendChild(btnModifiedTask)

      const modifiedTask = document.getElementById("btnModifiedTask");
      modifiedTask.addEventListener("click", () => {
        const priorityTaskTag = this.form.querySelector('select[name="priorityTaskTag"]').value;
        const titleTask = this.form.querySelector('input[name="titleTask"]').value;
        const descriptionTask = this.form.querySelector('textarea[name="descriptionTask"]').value;
        const dateTask = this.form.querySelector('input[name="timeTask"]').value;
        const stateTask = this.form.querySelector('select[name="stateTask"]').value;
  
        handler(
          task.id,
          priorityTaskTag,
          titleTask,
          descriptionTask,
          dateTask,
          stateTask
        );
      });
  }

  // Ecoute pour la suppression d'une tâche
  bindDeletedTask(handler) {
    document.querySelectorAll(".deletedTask").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        handler(event.currentTarget.id);
      });
    });
  }

  // Fermeture et initialisation de la modal de création et de modification des tâches
  modalTask() {
    document.getElementById("openModalCreateTask").style.display = "none";

    const modal = document.getElementById("openModalCreateTask");
    window.addEventListener("click", (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("taskForm").reset();
        document.getElementById("openModalCreateTask").style.display = "none";
        this.form.querySelector('select[name="priorityTaskTag"]').style.border = "solid 1px black";
        this.form.querySelector('input[name="titleTask"]').style.border = "solid 1px black";
        this.form.querySelector('input[name="timeTask"]').style.border = "solid 1px black";
        this.form.querySelector('select[name="stateTask"]').style.border = "solid 1px black";
      }
    });
  }

  // Visuel des données du form pour la création de tâches
  bindAddTask(handler) {
    const modal = document.getElementById("openModalCreateTask");

    const openAddModal = document.getElementById("createTaskButton");
    openAddModal.addEventListener("click", () => {
      modal.style.display = "block";
      this.btnSubmit.innerHTML = "";

      const addBtnSubmit = document.getElementById("btnSubmit");

      const btnAddTask = document.createElement("button");
      btnAddTask.innerText = "Valider";
      btnAddTask.type = "submit";
      btnAddTask.id = "btnAddTask";
      
      addBtnSubmit.appendChild(btnAddTask);

      const btnAddSubmit = document.getElementById("btnAddTask");
      btnAddSubmit.addEventListener("click", (event) => {
        event.preventDefault();
        const priorityTask = this.form.querySelector('select[name="priorityTaskTag"]').value;
        const titleTask = this.form.querySelector('input[name="titleTask"]').value;
        const descriptionTask = this.form.querySelector('textarea[name="descriptionTask"]').value;
        const dateTask = this.form.querySelector('input[name="timeTask"]').value;
        const stateTask = this.form.querySelector('select[name="stateTask"]').value;
  
        //condition pour la gestion des champs vide et les rendres obligatoire
        if (priorityTask && titleTask && dateTask && dateTask) {
          handler(
            priorityTask,
            titleTask,
            descriptionTask,
            dateTask,
            stateTask
          );
  
          this.form.reset();
  
          document.getElementById("openModalCreateTask").style.display = "none";
          this.form.querySelector('select[name="priorityTaskTag"]').style.border =
            "solid 1px black";
          this.form.querySelector('input[name="titleTask"]').style.border =
            "solid 1px black";
          this.form.querySelector('input[name="timeTask"]').style.border =
            "solid 1px black";
          this.form.querySelector('select[name="stateTask"]').style.border =
            "solid 1px black";
        } else {
          this.form.querySelector('select[name="priorityTaskTag"]').style.border =
            "solid red";
          this.form.querySelector('input[name="titleTask"]').style.border =
            "solid red";
          this.form.querySelector('input[name="timeTask"]').style.border =
            "solid red";
          this.form.querySelector('select[name="stateTask"]').style.border =
            "solid red";
          alert("les champs en rouge sont obligatoire");
        }
      });

    });
    
  }

  
}

export default ViewHomePage;
