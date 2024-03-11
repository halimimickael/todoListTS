"use strict";
var Note = /** @class */ (function () {
    function Note(id, title, location, text, image) {
        this._id = id;
        this._date = new Date();
        this._title = title;
        this._location = location;
        this._text = text;
        this._image = image;
    }
    return Note;
}());
