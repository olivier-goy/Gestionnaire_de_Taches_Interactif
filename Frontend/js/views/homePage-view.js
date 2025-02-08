class ViewHomePage {

    constructor() {
        this.createTask();
    }

    createTask() { 
        document.getElementById('openModalCreateTask').style.display = "none"

        const modal = document.getElementById('openModalCreateTask')
        const openModal = document.getElementById('createTaskButton');
        openModal.addEventListener('click', function () {
            return modal.style.display = "block";
        });

        window.addEventListener('click', function(event) {
            if(event.target == modal) {
               return modal.style.display = "none";
            }
        });
    }
}



export default ViewHomePage;