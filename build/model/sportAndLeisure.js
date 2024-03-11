"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Fitness = /** @class */ (function (_super) {
    __extends(Fitness, _super);
    function Fitness(id, title, text, location, trainingDateEvent, time, requiredEquipment, image) {
        var _this = _super.call(this, id, title, location, text, image) || this;
        _this.trainingDateEvent = trainingDateEvent;
        _this.requiredEquipment = requiredEquipment;
        _this.time = time;
        return _this;
    }
    Fitness.prototype.newNote = function () {
        var _this = this;
        var row = document.createElement("tr");
        row.innerHTML = "\n            <td class=\"bg-warning-subtle\"><input type=\"checkbox\" class=\"task-checkbox\"></td>\n            <td class=\"bg-warning-subtle text-warning\">".concat(capitalize(Fitness.name), "</td>\n            <td class=\"bg-warning-subtle\">").concat(capitalize(this._title), "</td>\n            <td class=\"bg-warning-subtle\">").concat(this._text, "</td>\n            <td class=\"bg-warning-subtle\">").concat(this._location, "</td>\n            <td class=\"bg-warning-subtle\">").concat(this._date.toDateString(), "</td>\n        ");
        var checkbox = row.querySelector('.task-checkbox');
        if (checkbox) {
            checkbox.addEventListener('click', function (event) {
                event.stopPropagation();
            });
        }
        else {
            console.error('Checkbox element not found in the created row.');
        }
        row.addEventListener('click', function () {
            _this.alert();
        });
        var taskList = document.getElementById('taskList');
        if (taskList) {
            taskList.appendChild(row);
        }
        else {
            console.error('Task list element not found.');
        }
    };
    Fitness.prototype.newFitnessAlert = function () {
        alert("you have a new Fitness task at :" + this._date);
    };
    Fitness.prototype.alert = function () {
        var modal = document.getElementById("myModal");
        if (modal !== null) {
            modal.style.display = "block";
        }
        var modalContent = document.getElementById("modal-text");
        if (modalContent !== null) {
            modalContent.innerHTML = "\n            <div class=\"col-12 h2 text-center\">\n                    Task Details\n                </div>\n                <div class=\"row justify-content-between\">\n                    <div class=\"d-flex p-2 justify-content-center col-6\">\n                        <label for=\"taskName\">Name:</label>\n                        <div id=\"taskName\"  class=\"mx-2\">".concat(this._title, "</div>\n                    </div>\n                    <div class=\"d-flex p-2 justify-content-center col-6\">\n                        <label for=\"taskCat\">Category:</label>\n                        <div id=\"taskCat\" class=\"mx-2\">").concat(this.constructor.name, "</div>\n                    </div>\n                    <div class=\"d-flex p-2 justify-content-center col-6\">\n                        <label for=\"taskDate\">Date:</label>\n                        <div id=\"taskDate\" class=\"mx-2\">").concat(this._date.toDateString(), "</div>\n                    </div>\n                    <div class=\"d-flex p-2 justify-content-center col-6\">\n                        <label for=\"taskTime\">Time:</label>\n                        <div id=\"taskTime\" class=\"mx-2\">").concat(this.time, "</div>\n                    </div>\n                    <div class=\"d-flex p-2 justify-content-center col-6\">\n                        <label for=\"taskLocation\">Location:</label>\n                        <div id=\"taskLocation\" class=\"mx-2\">at ").concat(this._location, "</div>\n                    </div>\n                    <div class= \"d-flex p-2 flex-column align-items-center my-2\">\n                        <label for=\"taskDesc\" class=\"h6\">Description</label>\n                        <div id=\"taskDesc\" class=\"mx-2\"> ").concat(this._text, "</div>\n                    </div>\n                </div>\n            ");
        }
        var span = document.getElementsByClassName("close")[0];
        if (span !== undefined) {
            span.onclick = function () {
                if (modal !== null) {
                    modal.style.display = "none";
                }
            };
        }
        var editBtn = document.getElementById("editBtn");
        var thisTask = this;
        if (editBtn !== null) {
            editBtn.onclick = function () {
                var form = document.createElement("form");
                if (form !== null) {
                    form.innerHTML = "\n                    <div class=\"col-12 h2 text-center\">\n                            Task Details\n                        </div>\n                        <div class=\"row justify-content-between\">\n                            <div class=\"d-flex p-2 justify-content-center col-6\">\n                                <label for=\"taskName\">Name:</label>\n                                <input id=\"taskName\"  class=\"mx-2\" value=\"".concat(thisTask._title, "\">\n                            </div>\n                            <div class=\"d-flex p-2 justify-content-center col-6\">\n                                <label for=\"taskCat\">Category:</label>\n                                <input id=\"taskCat\" class=\"mx-2\" value=\"").concat(thisTask.constructor.name, "\">\n                            </div>\n                            <div class=\"d-flex p-2 justify-content-center col-6\">\n                                <label for=\"taskDate\">Date:</label>\n                                <input type=\"date\" id=\"taskDate\" class=\"mx-2\" value=\"").concat(thisTask._date.toISOString().slice(0, 10), "\">\n                            </div>\n                            <div class=\"d-flex p-2 justify-content-center col-6\">\n                                <label for=\"taskTime\">Time:</label>\n                                <input id=\"taskTime\" class=\"mx-2\" value=\"").concat(thisTask.time, "\">\n                            </div>\n                            <div class=\"d-flex p-2 justify-content-center col-6\">\n                                <label for=\"taskLocation\">Location:</label>\n                                <input id=\"taskLocation\" class=\"mx-2\" value=\"").concat(thisTask._location, "\">\n                            </div>\n                            <div class= \"d-flex p-2 flex-column align-items-center my-2\">\n                                <label for=\"taskDesc\" class=\"h6\">Description</label>\n                                <textarea id=\"taskDesc\" class=\"mx-2\">").concat(thisTask._text, "</textarea>\n                            </div>\n                            <div class=\"d-flex p-2 justify-content-center col-12\">\n                                <button id=\"submitBtn\" class=\"btn btn-primary\">Submit</button>\n                            </div>\n                        </div>\n                    ");
                    if (modalContent !== null) {
                        modalContent.innerHTML = "";
                        modalContent.appendChild(form);
                    }
                    form.addEventListener("submit", function (event) {
                        event.preventDefault();
                        var title = form.elements.namedItem("taskName");
                        var date = form.elements.namedItem("taskDate");
                        var time = form.elements.namedItem("taskTime");
                        var location = form.elements.namedItem("taskLocation");
                        var desc = form.elements.namedItem("taskDesc");
                        thisTask._title = title.value;
                        thisTask._date = new Date(date.value);
                        thisTask.time = time.value;
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
                }
                else {
                    console.log("form is null");
                }
            };
        }
    };
    return Fitness;
}(Note));
