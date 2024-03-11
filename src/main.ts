
let tasks: Note[] = [
    new Fitness(1, "training", "we are going to train", "at Profit", new Date(2024, 3, 17), "10:00", ["towel", "water"]),
    new Fitness(3, "yoga", "we are going to do yoga", "at Yoga Studio", new Date(2024, 3, 18), "08:00", ["yoga mat"]),
    new Fitness(4, "running", "we are going to run", "at Park", new Date(2024, 3, 17), "18:00", ["running shoes", "water bottle"]),
    new Fitness(5, "cycling", "we are going to ride", "at Bike Trail", new Date(2024, 3, 24), "09:00", ["helmet", "bicycle"]),
    new Fitness(6, "swimming", "we are going to swim", "at Pool", new Date(2024, 3, 18), "07:00", ["swimsuit", "goggles"]),
    new Fitness(7, "weightlifting", "we are going to the gym", "at Gym", new Date(2024, 3, 17), "16:00", ["weightlifting gloves", "protein shake"]),
    new Fitness(7, "weightlifting", "we are going to the gym", "at Gym", new Date(2024, 3, 17), "16:00", ["weightlifting gloves", "protein shake"]),
    new Meetings(8, "daylyMeet", "in my office", "today in 10am", new Date(2024, 3, 17), "optional image"),
    new Meetings(9, "Weekly", "location", "text",new Date(2024, 3, 17), "optional image"),
    new Meetings(10, "Monthly", "location", "text",new Date(2024, 3, 17), "optional image"),
    new Meetings(11, "Yearly", "location", "text",new Date(2024, 3, 17), "optional image"),
    new Task(12, "task", "today in 10am", "in my office", new Date(2024, 3, 17)),
    new Task(13, "Doctor", "today in 10am", "in my office", new Date(2024, 3, 17)),
    new Task(14, "Exam", "today in 10am", "in my office", new Date(2024, 3, 17))
];

function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const displayTasks = () => {
    let tableContent = document.getElementById("taskList") as HTMLElement;
    if (tableContent !== null) {
        tableContent.innerHTML = "";
    }
    tasks.forEach(task => {
        task.newNote(tableContent);
    });
}

function addTask() {
    const taskName = (document.getElementById('taskName') as HTMLInputElement).value;
    const Position = (document.getElementById('Position') as HTMLInputElement).value;
    const hourSelect = document.getElementById('hour') as HTMLSelectElement;
    const hour = hourSelect.options[hourSelect.selectedIndex].text;
    const taskDescription = (document.getElementById('taskDescription') as HTMLTextAreaElement).value;
    const taskDateInput = document.getElementById('taskDate') as HTMLInputElement;
    const taskDateValue = taskDateInput.value;
    const taskCategory = (document.getElementById('taskCategory') as HTMLSelectElement).value;

    if (!taskName || !Position || !hour || !taskDescription || !taskDateValue || !taskCategory) {
        alert('Please fill in all the fields.');
        return;
    }

    switch(taskCategory) {
        case 'Fitness':
            const newFitness = new Fitness(tasks.length + 1, taskName, taskDescription, Position, new Date(taskDateValue), hour, []);
            newFitness.newNote();
            newFitness.newFitnessAlert()
            break;
        case 'Meetings':
            const newMeeting = new Meetings(tasks.length + 1, taskName, Position, taskDescription,new Date(taskDateValue),hour);
            newMeeting.newNote();
            newMeeting.dateOfCommande()
            break;
        case 'Task':
            const newTask = new Task(tasks.length + 1, taskName, taskDescription, Position, new Date(taskDateValue), hour);
            newTask.newNote();
            newTask.alertDetails()
        break;
        default:
            console.error('Invalid category selected.');
            return;
    }


    const newTaskFormContainer = document.getElementById('newTaskFormContainer');
    if (newTaskFormContainer) {
        newTaskFormContainer.style.display = 'none';
    }
}

let form = document.getElementById('newTaskForm')
form?.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
});

document.addEventListener("DOMContentLoaded", function () {
    const newTaskButton = document.getElementById('newTaskButton');
    const newTaskFormContainer = document.getElementById('newTaskFormContainer');

    if (newTaskButton && newTaskFormContainer) {
        newTaskButton.addEventListener('click', () => {
            if (newTaskFormContainer.style.display === 'block') {
                newTaskFormContainer.style.display = 'none';
            } else {
                newTaskFormContainer.style.display = 'block';
            }
        });
    } else {
        console.error("The required items were not found.");
    }
});

function deleteSelectedTasks() {
    const checkboxes = document.querySelectorAll('.task-checkbox:checked');
    let deletionConfirmed = false;

    if (checkboxes.length > 0) {
        deletionConfirmed = confirm("Are you sure you want to delete this task?");
    }

    if (deletionConfirmed) {
        checkboxes.forEach((checkbox) => {
            const row = checkbox.closest('tr');
            if (row) {
                const taskId = parseInt(row.getAttribute('data-task-id') || '');
                tasks = tasks.filter(task => task._id !== taskId);
                row.remove();
            }
        });
    }
}

const deleteSelectedTasksButton = document.getElementById('deleteSelectedTasksButton');
if (deleteSelectedTasksButton) {
    deleteSelectedTasksButton.addEventListener('click', deleteSelectedTasks);
}

displayTasks();