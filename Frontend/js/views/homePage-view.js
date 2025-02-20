class ViewHomePage {
  constructor() {
    this.form = document.getElementById("taskForm");
    this.taskListInProgress = document.getElementById("cardInTask");
    this.taskListCompleted = document.getElementById("cardCompleted");
    this.progressionBar = document.getElementById("progressionBar");
    this.btnSubmit = document.getElementById("btnSubmit");
  }

  // Méthode pour le visuel du bouton valider, pour l'écoute du bouton d'ouverture de la modal et pour l'écoute du bouton valider la création d'une tâches, prend comme paramètre les valeurs des inputs et l'envoie à la méthode handleAddTask du controller.
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

        // Condition pour la gestion des champs vide et les rendres obligatoire
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

          this.form.querySelector('select[name="priorityTaskTag"]').style.border = "solid 1px black";
          this.form.querySelector('input[name="titleTask"]').style.border = "solid 1px black";
          this.form.querySelector('input[name="timeTask"]').style.border = "solid 1px black";
          this.form.querySelector('select[name="stateTask"]').style.border = "solid 1px black";
        } else {
          this.form.querySelector('select[name="priorityTaskTag"]').style.border = "solid red";
          this.form.querySelector('input[name="titleTask"]').style.border = "solid red";
          this.form.querySelector('input[name="timeTask"]').style.border = "solid red";
          this.form.querySelector('select[name="stateTask"]').style.border = "solid red";

          alert("les champs en rouge sont obligatoire");
        }
      });
    });
  }

  // Méthode pour l'écoute le bouton de la barre de recherche par titre des tâches prend comme paramêtre le retour du input de recherche pour l'envoyer à la méthode searchTasks du controller
  searchBarTask(handler) {
    const btnSearchBar = document.getElementById("searchBar");
    btnSearchBar.addEventListener("click", () => {
      handler(document.getElementById("searchTitle").value);
    });
  }

  // Méthode pour l'écoute les boutons des filtres pour les tâches en cours, terminé et toutes, et les affiches en fonction, prend comme paramêtre l'objet avec toutes les tâches provenant du controller.
  filterTask(tasks) {
    const btnFilterAllTask = document.getElementById("filterAllTask");
    btnFilterAllTask.addEventListener("click", () => {
      document.getElementById("cardInTask").style.display = "block";
      document.getElementById("cardCompleted").style.display = "block";
    });

    const btnFilterInProgressTask = document.getElementById("filterInPorgressTask");
    btnFilterInProgressTask.addEventListener("click", () => {
      tasks.forEach((task) => {
        if (task.state == "inProgress") {
          document.getElementById("cardCompleted").style.display = "none";
          document.getElementById("cardInTask").style.display = "block";
        }
      });
    });

    const btnFilterCompletedTask = document.getElementById("filterCompletedTask");
    btnFilterCompletedTask.addEventListener("click", () => {
      tasks.forEach((task) => {
        if (task.state == "finish") {
          document.getElementById("cardInTask").style.display = "none";
          document.getElementById("cardCompleted").style.display = "block";
        }
      });
    });
  }

  // Méthode pour l'écoute du select pour trier par date et priotrité, prend comme paramètre le valeur du select et le retourne à la méthode sortTask dans le controller.
  sortFilterTask(handler) {
    const btnFilterPriorityTask = document.getElementById("filterPriorityTask");
    btnFilterPriorityTask.addEventListener("change", () => {
      handler(btnFilterPriorityTask);
    });
  }

  // Méthode pour le visuel de la barre de progression qui prend comme paramètre le calcul du pourcentage provenant de la méthode calPercentageTask du controller
  percentageTask(percentageTask) {
    this.progressionBar.innerHTML = "";

    if (percentageTask) {
      const titleProgression = document.createElement("h3");
      titleProgression.innerText = `Progression à ${Math.round(percentageTask)}%`;
      const bar = document.createElement("progress");
      bar.max = 100;
      bar.value = percentageTask;
      bar.innerText = `${percentageTask}%`;

      this.progressionBar.appendChild(titleProgression);
      this.progressionBar.appendChild(bar);
    }
  }

  // Méthode pour le visuel de la carte des tâches qui prend comme paramètre le tableau des tâches provenant de la méthode handleAddTask du controller.
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

  // Méthode pour l'écoute du bouton de la modification d'une tâche et l'ouverture de la modal, prend comme paramètre l'id de la tâches selectionner et la retourne à la méthode openModifiedTask dans le controller
  bindModalModifiedTask(handler) {
    document.querySelectorAll(".modifiedTask").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        handler(event.currentTarget.id);
        document.getElementById("openModalCreateTask").style.display = "block"
      });
    }); 
  }
  
  // Méthode d'affichage des valeurs présente de la tâches à modifier et de l'écoute du bouton de validation de modification, prend comme paramètre la valeur des input et l'envoie à la méthode handleModifiedTask du controller et prend comme paramètre la tâches selectionné provenant de la méthode openModifiedTask du controller.
  bindModifiedTask(handler, task) {
    this.form.reset();
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

      addBtnSubmit.appendChild(btnModifiedTask);

      const modifiedTask = document.getElementById("btnModifiedTask");
      modifiedTask.addEventListener("click", (event) => {
        event.preventDefault();
        const priorityTaskTag = this.form.querySelector('select[name="priorityTaskTag"]').value;
        const titleTask = this.form.querySelector('input[name="titleTask"]').value;
        const descriptionTask = this.form.querySelector('textarea[name="descriptionTask"]').value;
        const dateTask = this.form.querySelector('input[name="timeTask"]').value;
        const stateTask = this.form.querySelector('select[name="stateTask"]').value;
  
        // Condition pour les valeurs obligatoire.
        if (task.id && priorityTaskTag && titleTask && descriptionTask && dateTask && stateTask) {
          handler(
            task.id,
            priorityTaskTag,
            titleTask,
            descriptionTask,
            dateTask,
            stateTask
          );

          this.form.reset();
          document.getElementById("openModalCreateTask").style.display = "none";

          this.form.querySelector('select[name="priorityTaskTag"]').style.border = "solid 1px black";
          this.form.querySelector('input[name="titleTask"]').style.border = "solid 1px black";
          this.form.querySelector('input[name="timeTask"]').style.border = "solid 1px black";
          this.form.querySelector('select[name="stateTask"]').style.border = "solid 1px black";
        } else {
          this.form.querySelector('select[name="priorityTaskTag"]').style.border = "solid red";
          this.form.querySelector('input[name="titleTask"]').style.border = "solid red";
          this.form.querySelector('input[name="timeTask"]').style.border = "solid red";
          this.form.querySelector('select[name="stateTask"]').style.border = "solid red";

          alert("les champs en rouge sont obligatoire");
        }
      });
  }

  // Méthode pour l'écoute du bouton de suppression d'une tâche qui prend comme paramêtre l'id de la tâche et l'envoie à la méthode handleDeletedTask du controller.
  bindDeletedTask(handler) {
    document.querySelectorAll(".deletedTask").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        handler(event.currentTarget.id);
      });
    });
  }

  // Méthode pour la fermeture et l'initialisation de la modal de création et de modification des tâches
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
}

export default ViewHomePage;
