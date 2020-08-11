"use strict";

var notes = [];

function init() {

    var cache = localStorage.getItem("notes");
    console.log(cache);
    if (cache) {
        notes = JSON.parse(cache);
    }

    var app = document.getElementById("todo");
    notes.forEach(function print(note) {

        let paragraph = document.createElement("li");
        let text = document.createTextNode(note.message);
        paragraph.appendChild(text);
        paragraph.className = (note.done) ? "done" : "todo";
        app.appendChild(paragraph);
    });

    var form = document.getElementById("notes");
    form.addEventListener("submit", add);

    var save = document.getElementById("save");
    save.addEventListener("click", saveList);

    var remove = document.getElementById("remove");
    remove.addEventListener("click", function clearList() {
        console.log("clear list");
        localStorage.removeItem("notes");
    });
}

function add(event) {

    console.log("add");
    event.preventDefault();
    
    var input = document.querySelectorAll("input");

    let note = {
        message : input[0].value,
        done : input[1].checked
    };
    notes.push(note);
}

function saveList() {

    var cache = JSON.stringify(notes);
    localStorage.setItem("notes", cache);
    console.log(cache);
}

window.onload = init;
