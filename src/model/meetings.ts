interface Meetings {
    _dateOfMeeting: Date;
    _hourOfMeeting: string;
    dateOfCommande(): void;
}

class Meetings extends Note implements Meetings {

    constructor(id: number, title: string, location: string, text: string,
        dateOfMeeting: Date, hourOfMeeting: string, image?: string) {
        super(id, title, location, text, image);
        this._dateOfMeeting = dateOfMeeting;
        this._hourOfMeeting = hourOfMeeting;
    }

    newNote(): void {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td class="bg-danger-subtle"><input type="checkbox" class="task-checkbox"></td>
            <td class="bg-danger-subtle text-danger">${capitalize(Meetings.name)}</td>
            <td class="bg-danger-subtle">${capitalize(this._title)}</td>
            <td class="bg-danger-subtle">${this._text}</td>
            <td class="bg-danger-subtle">${this._location}</td>
            <td class="bg-danger-subtle">${this._date.toDateString()}</td>
        `;
    
        let checkbox = row.querySelector('.task-checkbox');
        if (checkbox) {
            checkbox.addEventListener('click', (event) => {
                event.stopPropagation(); 
            });
        } else {
            console.error('Checkbox element not found in the created row.');
        }
    
        row.addEventListener('click', () => {
            this.alert();
        });
    
        let taskList = document.getElementById('taskList');
        if (taskList) {
            taskList.appendChild(row);
        } else {
            console.error('Task list element not found.');
        }
    }
    

    dateOfCommande(): void {
        alert(this._dateOfMeeting.toDateString() + " " + this._location + " at " + this._hourOfMeeting);
    }

    alert(): void {
        let modal = document.getElementById("myModal");
        if (modal !== null) {
            modal.style.display = "block";
        }
        let modalContent = document.getElementById("modal-text");
        if (modalContent !== null) {
            modalContent.innerHTML = `
                <div class="col-12 h2 text-center">
                        Task Details
                    </div>
                    <div class="row justify-content-between">
                        <div class="d-flex p-2 justify-content-center col-6">
                            <label for="taskName">Name:</label>
                            <div id="taskName"  class="mx-2">${this._title}</div>
                        </div>
                        <div class="d-flex p-2 justify-content-center col-6">
                            <label for="taskCat">Category:</label>
                            <div id="taskCat" class="mx-2">${this.constructor.name}</div>
                        </div>
                        <div class="d-flex p-2 justify-content-center col-6">
                            <label for="taskDate">Date:</label>
                            <div id="taskDate" class="mx-2">${this._date.toDateString()}</div>
                        </div>
                        <div class="d-flex p-2 justify-content-center col-6">
                            <label for="taskLocation">Location:</label>
                            <div id="taskLocation" class="mx-2">at ${this._location}</div>
                        </div>
                        <div class= "d-flex p-2 flex-column align-items-center my-2">
                            <label for="taskDesc" class="h6">Description</label>
                            <div id="taskDesc" class="mx-2"> ${this._text}</div>
                        </div>
                    </div>
                `
        }

        let span = document.getElementsByClassName("close")[0] as HTMLElement;
        if (span !== undefined) {
            span.onclick = function () {
                if (modal !== null) {
                    modal.style.display = "none";
                }
            }
        }
        let editBtn = document.getElementById("editBtn") as HTMLElement;
        let thisTask = this;
        if (editBtn !== null) {
            editBtn.onclick = function () {
                let form = document.createElement("form");
                if (form !== null) {
                    form.innerHTML = `
                        <div class="col-12 h2 text-center">
                                Task Details
                            </div>
                            <div class="row justify-content-between">
                                <div class="d-flex p-2 justify-content-center col-6">
                                    <label for="taskName">Name:</label>
                                    <input id="taskName"  class="mx-2" value="${thisTask._title}">
                                </div>
                                <div class="d-flex p-2 justify-content-center col-6">
                                    <label for="taskCat">Category:</label>
                                    <input id="taskCat" class="mx-2" value="${thisTask.constructor.name}">
                                </div>
                                <div class="d-flex p-2 justify-content-center col-6">
                                    <label for="taskDate">Date:</label>
                                    <input type="date" id="taskDate" class="mx-2" value="${thisTask._date.toISOString().slice(0, 10)}">
                                </div>
                                <div class="d-flex p-2 justify-content-center col-6">
                                    <label for="taskLocation">Location:</label>
                                    <input id="taskLocation" class="mx-2" value="${thisTask._location}">
                                </div>
                                <div class= "d-flex p-2 flex-column align-items-center my-2">
                                    <label for="taskDesc" class="h6">Description</label>
                                    <textarea id="taskDesc" class="mx-2">${thisTask._text}</textarea>
                                </div>
                                <div class="d-flex p-2 justify-content-center col-12">
                                    <button id="submitBtn" class="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        `

                    if (modalContent !== null) {
                        modalContent.innerHTML = "";
                        modalContent.appendChild(form);
                    }
                    form.addEventListener("submit", function (event) {
                        event.preventDefault();
                        let title = form.elements.namedItem("taskName") as HTMLInputElement;
                        let date = form.elements.namedItem("taskDate") as HTMLInputElement;
                        let time = form.elements.namedItem("taskTime") as HTMLInputElement;
                        let location = form.elements.namedItem("taskLocation") as HTMLInputElement;
                        let desc = form.elements.namedItem("taskDesc") as HTMLInputElement;

                        thisTask._title = title.value;
                        thisTask._date = new Date(date.value);
                        thisTask._location = location.value;
                        thisTask._text = desc.value;

                        console.log(event);
                        console.log("form submitted");
                        // close the modal
                        if (modal !== null) {
                            modal.style.display = "none";
                            displayTasks();
                        }
                    });
                } else {
                    console.log("form is null");
                }
            }
        }

    }
}
