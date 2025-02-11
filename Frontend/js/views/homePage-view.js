class ViewHomePage {
  constructor() {
    this.modalCreateTask();
    this.form = document.getElementById("taskForm");
    console.log(this.form.value)
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

  // Récupération des données du form pour la création de tâches
  bindAddTask(handler) {
        const btnAddTask = document.getElementById("btnSubmitTask");
         btnAddTask.addEventListener("click", function (event) {
           event.preventDefault();
           const priorityTask = this.form.querySelector('select[name="tagPriority"]').value;
           const titleTask = this.form.querySelector('input[name="title"]').value;
           const descriptionTask = this.form.querySelector('textarea[name="description"]').value;
           const dateTask = this.form.querySelector('input[name="time"]').value;
           const stateTask = this.form.querySelector('select[name="stateTask"]').value;

            handler(priorityTask, titleTask, descriptionTask, dateTask, stateTask);

            this.form.reset();
         });
      }
}

export default ViewHomePage;
