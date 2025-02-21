class ViewHomePage {
  constructor() {
    this.form = document.getElementById("taskForm");
    this.taskListInProgress = document.getElementById("cardInTask");
    this.taskListCompleted = document.getElementById("cardCompleted");
    this.progressionBar = document.getElementById("progressionBar");
    this.btnSubmit = document.getElementById("btnSubmit");
  }

  // Méthode pour gérer l'affichage du bouton valider, l'écoute du bouton d'ouverture de la modal et l'écoute du bouton valider la création d'une tâche.
  // Prend comme paramètre les valeurs des inputs et les envoie à la méthode handleAddTask du controller.
  bindAddTask(handler) {
    const modal = document.getElementById("openModalCreateTask");

    const openAddModal = document.getElementById("createTaskButton");
    openAddModal.addEventListener("click", () => {
      modal.style.display = "block";
      this.btnSubmit.innerHTML = "";

      const addBtnSubmit = document.getElementById("btnSubmit");
      const btnAddTask = document.createElement("button");
      btnAddTask.classList = "submitForm"
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

        // Condition pour vérifier si les champs sont vides et les rendre obligatoires avant la soumission.
        if (priorityTask && titleTask && dateTask && stateTask) {
          handler(
            priorityTask,
            titleTask,
            descriptionTask,
            dateTask,
            stateTask
          );

          this.form.reset();
          document.getElementById("openModalCreateTask").style.display = "none";

          this.form.querySelector('select[name="priorityTaskTag"]').style.border = "none";
          this.form.querySelector('input[name="titleTask"]').style.border = "none";
          this.form.querySelector('input[name="timeTask"]').style.border = "none";
          this.form.querySelector('select[name="stateTask"]').style.border = "none";
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

  // Méthode pour écouter le bouton de la barre de recherche des tâches par titre, prend comme paramètre la valeur de l'input de recherche et l'envoie à la méthode searchTasks du controller.
  searchBarTask(handler) {
    const btnSearchBar = document.getElementById("searchBar");
    btnSearchBar.addEventListener("click", () => {
      const searchBarValue = document.getElementById("searchTitle").value
      handler(searchBarValue);
    });
  }

  // Méthode pour écouter les boutons des filtres (tâches en cours, terminées et toutes), et afficher les tâches correspondantes en fonction de la sélection, prend comme paramètre l'objet contenant toutes les tâches provenant du controller.
  filterTask(tasks) {
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

  bindResetFilter(handler) {
    const btnFilterAllTask = document.getElementById("filterAllTask");
    btnFilterAllTask.addEventListener("click", () => {
      handler();
      document.getElementById("cardInTask").style.display = "block";
      document.getElementById("cardCompleted").style.display = "block";
      document.getElementById("searchTitle").value = "";
      document.getElementById("filterPriorityTask").selectedIndex = 0;
    });
  }

  // Méthode pour écouter le select pour trier par date et priorité, prend comme paramètre la valeur du select et l'envoie à la méthode sortTask dans le controller.
  sortFilterTask(handler) {
    const btnFilterPriorityTask = document.getElementById("filterPriorityTask");
    btnFilterPriorityTask.addEventListener("change", (event) => {
      const selectFilterValue = event.currentTarget.value
      const searchFilter = document.getElementById("searchTitle").value;
      handler(selectFilterValue, searchFilter);
    });
  }

  // Méthode pour afficher le visuel de la barre de progression, prend comme paramètre le calcul du pourcentage provenant de la méthode calPercentageTask du controller.
  percentageTask(percentageTask) {
    this.progressionBar.innerHTML = "";

    const titleProgression = document.createElement("h2");
    titleProgression.innerText = `Progression à ${Math.round(percentageTask)}%`;
    const bar = document.createElement("progress");
    bar.max = 100;
    bar.value = percentageTask;
    bar.innerText = `${percentageTask}%`;

    this.progressionBar.appendChild(titleProgression);
    this.progressionBar.appendChild(bar);

    if(percentageTask == null) {
      titleProgression.innerText = "Progression en attente"
    }
  }

  // Méthode pour afficher le visuel de la carte des tâches, prend comme paramètre le tableau des tâches provenant de la méthode handleAddTask du controller.
  renderTasks(tasks) {
    this.taskListInProgress.innerHTML = "";
    this.taskListCompleted.innerHTML = "";
    tasks.forEach((task) => {
      const divCardInProgress = document.createElement("div");
      divCardInProgress.classList = "cardTask";

      const divTagCard = document.createElement("div");
      divTagCard.classList = "tagCard";
      const tags = document.createElement("button");
      tags.textContent = task.priority;
      
      const divTitleCard = document.createElement("div");
      divTitleCard.classList = "titleCard";
      divTitleCard.innerHTML = `<h3>${task.title}</h3>`;

      const divDescriptionCard = document.createElement("div");
      divDescriptionCard.classList = "descriptionCard";
      divDescriptionCard.innerHTML = `<h4>Description :</h4> <p>${task.description}</p>`;

      const divDueDataCard = document.createElement("div");
      divDueDataCard.classList = "dueDataCard";
      divDueDataCard.innerHTML = `<h4>Date de fin: ${new Date(task.time).toLocaleDateString('fr-FR')}</h4>`;

      const divModifiedAndDeletedTask = document.createElement("div");
      divModifiedAndDeletedTask.classList = "modificatedAndDeletedTask";
      const btnModificationCard = document.createElement("button");
      btnModificationCard.innerText = "Modifier";
      btnModificationCard.id = task.id;
      btnModificationCard.classList = "modifiedTask";
      const btnDeletedCard = document.createElement("button");
      btnDeletedCard.innerText = "Supprimer";
      btnDeletedCard.id = task.id;
      btnDeletedCard.classList = "deletedTask";

      divTagCard.appendChild(tags);
      divCardInProgress.appendChild(divTagCard);

      divCardInProgress.appendChild(divTitleCard);

      divCardInProgress.appendChild(divDescriptionCard);

      divCardInProgress.appendChild(divDueDataCard);

      divModifiedAndDeletedTask.appendChild(btnModificationCard);
      divModifiedAndDeletedTask.appendChild(btnDeletedCard);
      divCardInProgress.appendChild(divModifiedAndDeletedTask);

      // Condition pour afficher les tâches en fonction de leur statut : soit "en cours", soit "terminées".
      if (task.state == "inProgress") {
        this.taskListInProgress.appendChild(divCardInProgress);
      } else {
        this.taskListCompleted.appendChild(divCardInProgress);
      }

      tags.style.color = "black"

      if(task.priority == "Basse") {
        divTagCard.style.backgroundColor = "green"
        tags.style.backgroundColor = "#25c20f"
      } else if (task.priority == "Moyenne") {
        divTagCard.style.backgroundColor = "orange"
        tags.style.backgroundColor = "#ffce8c"
      } else if (task.priority == "Elevée") {
        divTagCard.style.backgroundColor = "red"
        tags.style.backgroundColor = "#ff9595"
      }
    });
  }


  // Méthode pour écouter le clic sur le bouton de modification d'une tâche et ouvrir la modal de modification.
  // Prend comme paramètre l'id de la tâche sélectionnée et le transmet à la méthode openModifiedTask dans le controller.
  bindModalModifiedTask(handler) {
    document.querySelectorAll(".modifiedTask").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        handler(event.currentTarget.id);
        document.getElementById("openModalCreateTask").style.display = "block";
      });
    }); 
  }
  
  // Méthode pour afficher les valeurs actuelles de la tâche à modifier et écouter le clic sur le bouton de validation de la modification.
  // Prend comme paramètre les valeurs des inputs et les envoie à la méthode handleModifiedTask du controller.
  // Prend également comme paramètre la tâche sélectionnée, provenant de la méthode openModifiedTask du controller.
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
      btnModifiedTask.classList = "submitForm"
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

        const selectFilter = document.getElementById("filterPriorityTask").value;
        const searchFilter = document.getElementById("searchTitle").value;
  
        // Condition pour vérifier que les valeurs des champs sont obligatoires avant de permettre l'envoi du formulaire.
        if (task.id && priorityTaskTag && titleTask && dateTask && stateTask) {
          handler(
            task.id,
            priorityTaskTag,
            titleTask,
            descriptionTask,
            dateTask,
            stateTask, 
            selectFilter,
            searchFilter
          );

          this.form.reset();
          document.getElementById("openModalCreateTask").style.display = "none";

          this.form.querySelector('select[name="priorityTaskTag"]').style.border = "none";
          this.form.querySelector('input[name="titleTask"]').style.border = "none";
          this.form.querySelector('input[name="timeTask"]').style.border = "none";
          this.form.querySelector('select[name="stateTask"]').style.border = "none";
        } else {
          this.form.querySelector('select[name="priorityTaskTag"]').style.border = "solid red";
          this.form.querySelector('input[name="titleTask"]').style.border = "solid red";
          this.form.querySelector('input[name="timeTask"]').style.border = "solid red";
          this.form.querySelector('select[name="stateTask"]').style.border = "solid red";

          alert("les champs en rouge sont obligatoire");
        }
      });
  }

  // Méthode pour écouter le bouton de suppression d'une tâche, prend en paramètre l'id de la tâche et l'envoie à la méthode handleDeletedTask du controller pour supprimer la tâche.
  bindDeletedTask(handler) {
    document.querySelectorAll(".deletedTask").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();

        const selectFilter = document.getElementById("filterPriorityTask").value;
        const searchFilter = document.getElementById("searchTitle").value;

        handler(event.currentTarget.id, selectFilter, searchFilter);
      });
    });
  }

  // Méthode pour fermer et réinitialiser la modal de création et de modification des tâches, en préparation pour une nouvelle interaction utilisateur.
  modalTask() {
    document.getElementById("openModalCreateTask").style.display = "none";

    const modal = document.getElementById("openModalCreateTask");

    window.addEventListener("click", (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("taskForm").reset();
        document.getElementById("openModalCreateTask").style.display = "none";
        this.form.querySelector('select[name="priorityTaskTag"]').style.border = "none";
        this.form.querySelector('input[name="titleTask"]').style.border = "none";
        this.form.querySelector('input[name="timeTask"]').style.border = "none";
        this.form.querySelector('select[name="stateTask"]').style.border = "none";
      }
    });
  }
}

export default ViewHomePage;
