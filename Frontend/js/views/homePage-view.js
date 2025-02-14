class ViewHomePage {
  constructor() {
    this.form = document.getElementById("taskForm");
    this.taskListInProgress = document.getElementById("cardInTask");
    this.taskListCompleted = document.getElementById("cardCompleted");
    this.progressionBar = document.getElementById("progressionBar");
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
      btnModificationCard.innerText = "Modifier"
      const btnDeletedCard = document.createElement("button");
      btnDeletedCard.innerText = "Supprimer";
      btnDeletedCard.id = task.id;
      btnDeletedCard.classList = "deletedTask"


      const divTitleCard = document.createElement("div");
      divTitleCard.classList = "titleCard";
      const h3TitleCard = document.createElement("h3");
      h3TitleCard.textContent = task.title;
      const divDescriptionCard = document.createElement("div");
      divDescriptionCard.classList = "descriptionCard";
      divDescriptionCard.innerHTML = `
      <h3>Description :</h3>
      <p>${task.description}</p>
      `;
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
    btnSearchBar.addEventListener("click", function () {
      handler(document.getElementById("searchTitle").value);
    });
  }

  // Filtrer les Tâches pour toutes ou pour en cours ou terminée
  filterTask(tasks) {
    const btnFilterAllTask = document.getElementById("filterAllTask");
    btnFilterAllTask.addEventListener("click", function () {
      document.getElementById("cardInTask").style.display = "block";
      document.getElementById("cardCompleted").style.display = "block";
    });

    const btnFilterInProgressTask = document.getElementById(
      "filterInPorgressTask"
    );
    btnFilterInProgressTask.addEventListener("click", function () {
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
    btnFilterCompletedTask.addEventListener("click", function () {
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
    btnFilterPriorityTask.addEventListener("change", function () {
      handler(btnFilterPriorityTask);
    });
  }

  // Affichage de la barre de progression
  percentageTask(percentageTask) {
    this.progressionBar.innerHTML = "";

    const labelProgression = document.createElement("label");
    labelProgression.id = "bar";
    labelProgression.innerText = "Progression dans les Tâches : ";
    const bar = document.createElement("progress");
    bar.id = "bar";
    bar.max = 100;
    bar.value = percentageTask;
    bar.innerText = `${percentageTask}%`;

    this.progressionBar.appendChild(labelProgression);
    this.progressionBar.appendChild(bar);
  }

  // Ouverture et fermeture de la modal pour la création de tâches
  modalCreateTask() {
    document.getElementById("openModalCreateTask").style.display = "none";

    const modal = document.getElementById("openModalCreateTask");
    const openModal = document.getElementById("createTaskButton");
    openModal.addEventListener("click", function () {
      modal.style.display = "block";
    });

    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  }

  // Visuel des données du form pour la création de tâches
  bindAddTask(handler) {
    const btnAddTask = document.getElementById("btnSubmitTask");
    btnAddTask.addEventListener("click", function (event) {
      event.preventDefault();
      const priorityTaskTag = this.form.querySelector(
        'select[name="priorityTaskTag"]'
      ).value;
      const titleTask = this.form.querySelector(
        'input[name="titleTask"]'
      ).value;
      const descriptionTask = this.form.querySelector(
        'textarea[name="descriptionTask"]'
      ).value;
      const dateTask = this.form.querySelector('input[name="timeTask"]').value;
      const stateTask = this.form.querySelector(
        'select[name="stateTask"]'
      ).value;

      if (priorityTaskTag && titleTask && dateTask && dateTask) {
        handler(
          priorityTaskTag,
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
  }

  bindDeletedTask(handler) {
    document.querySelectorAll(".deletedTask").forEach(button => {
            button.addEventListener("click", function (event) {
              handler(event.currentTarget.id);
            });
    });
  }
}

export default ViewHomePage;
