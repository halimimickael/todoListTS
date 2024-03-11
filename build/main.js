"use strict";
var tasks = [
    new Fitness(1, "training", "we are going to train", "at Profit", new Date(2024, 3, 17), "10:00", ["towel", "water"]),
    new Fitness(3, "yoga", "we are going to do yoga", "at Yoga Studio", new Date(2024, 3, 18), "08:00", ["yoga mat"]),
    new Fitness(4, "running", "we are going to run", "at Park", new Date(2024, 3, 17), "18:00", ["running shoes", "water bottle"]),
    new Fitness(5, "cycling", "we are going to ride", "at Bike Trail", new Date(2024, 3, 24), "09:00", ["helmet", "bicycle"]),
    new Fitness(6, "swimming", "we are going to swim", "at Pool", new Date(2024, 3, 18), "07:00", ["swimsuit", "goggles"]),
    new Fitness(7, "weightlifting", "we are going to the gym", "at Gym", new Date(2024, 3, 17), "16:00", ["weightlifting gloves", "protein shake"]),
    new Fitness(7, "weightlifting", "we are going to the gym", "at Gym", new Date(2024, 3, 17), "16:00", ["weightlifting gloves", "protein shake"]),
    new Meetings(8, "daylyMeet", "in my office", "today in 10am", new Date(2024, 3, 17), "optional image"),
    new Meetings(9, "Weekly", "location", "text", new Date(2024, 3, 17), "optional image"),
    new Meetings(10, "Monthly", "location", "text", new Date(2024, 3, 17), "optional image"),
    new Meetings(11, "Yearly", "location", "text", new Date(2024, 3, 17), "optional image"),
    new Task(12, "task", "today in 10am", "in my office", new Date(2024, 3, 17)),
    new Task(13, "Doctor", "today in 10am", "in my office", new Date(2024, 3, 17)),
    new Task(14, "Exam", "today in 10am", "in my office", new Date(2024, 3, 17))
];
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
;
var displayTasks = function () {
    var tableContent = document.getElementById("taskList");
    if (tableContent !== null) {
        tableContent.innerHTML = "";
    }
    tasks.forEach(function (task) {
        task.newNote(tableContent);
    });
};
function addTask() {
    var taskName = document.getElementById('taskName').value;
    var Position = document.getElementById('Position').value;
    var hourSelect = document.getElementById('hour');
    var hour = hourSelect.options[hourSelect.selectedIndex].text;
    var taskDescription = document.getElementById('taskDescription').value;
    var taskDateInput = document.getElementById('taskDate');
    var taskDateValue = taskDateInput.value;
    var taskCategory = document.getElementById('taskCategory').value;
    if (!taskName || !Position || !hour || !taskDescription || !taskDateValue || !taskCategory) {
        alert('Please fill in all the fields.');
        return;
    }
    switch (taskCategory) {
        case 'Fitness':
            var newFitness = new Fitness(tasks.length + 1, taskName, taskDescription, Position, new Date(taskDateValue), hour, []);
            newFitness.newNote();
            newFitness.newFitnessAlert();
            break;
        case 'Meetings':
            var newMeeting = new Meetings(tasks.length + 1, taskName, Position, taskDescription, new Date(taskDateValue), hour);
            newMeeting.newNote();
            newMeeting.dateOfCommande();
            break;
        case 'Task':
            var newTask = new Task(tasks.length + 1, taskName, taskDescription, Position, new Date(taskDateValue), hour);
            newTask.newNote();
            newTask.alertDetails();
            break;
        default:
            console.error('Invalid category selected.');
            return;
    }
    var newTaskFormContainer = document.getElementById('newTaskFormContainer');
    if (newTaskFormContainer) {
        newTaskFormContainer.style.display = 'none';
    }
}
var form = document.getElementById('newTaskForm');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (e) {
    e.preventDefault();
    addTask();
});
document.addEventListener("DOMContentLoaded", function () {
    var newTaskButton = document.getElementById('newTaskButton');
    var newTaskFormContainer = document.getElementById('newTaskFormContainer');
    if (newTaskButton && newTaskFormContainer) {
        newTaskButton.addEventListener('click', function () {
            if (newTaskFormContainer.style.display === 'block') {
                newTaskFormContainer.style.display = 'none';
            }
            else {
                newTaskFormContainer.style.display = 'block';
            }
        });
    }
    else {
        console.error("The required items were not found.");
    }
});
function deleteSelectedTasks() {
    var checkboxes = document.querySelectorAll('.task-checkbox:checked');
    var deletionConfirmed = false;
    if (checkboxes.length > 0) {
        deletionConfirmed = confirm("Are you sure you want to delete this task?");
    }
    if (deletionConfirmed) {
        checkboxes.forEach(function (checkbox) {
            var row = checkbox.closest('tr');
            if (row) {
                var taskId_1 = parseInt(row.getAttribute('data-task-id') || '');
                tasks = tasks.filter(function (task) { return task._id !== taskId_1; });
                row.remove();
            }
        });
    }
}
var deleteSelectedTasksButton = document.getElementById('deleteSelectedTasksButton');
if (deleteSelectedTasksButton) {
    deleteSelectedTasksButton.addEventListener('click', deleteSelectedTasks);
}
displayTasks();
