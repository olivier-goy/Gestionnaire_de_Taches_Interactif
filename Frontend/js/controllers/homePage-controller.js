
createTask();

function createTask() {
    
    document.getElementById('openModalCreateTask').style.display = "none"

    const modal = document.getElementById('openModalCreateTask')
    const openModal = document.getElementById('createTaskButton');
    openModal.addEventListener('click', function () {
        
        modal.style.display = "block";
    });

    window.addEventListener('click', function(event) {
        if(event.target == modal) {
            modal.style.display = "none";
        }
    });
}