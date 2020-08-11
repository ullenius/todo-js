"use strict";

var notes = [];

function init() {

    var cache = localStorage.getItem("notes");
    if (cache) {
        notes = JSON.parse(cache);
    }

    var form = document.getElementById("notes");
    form.addEventListener("submit", add);
    form.addEventListener("submit", printList);

    var save = document.getElementById("save");
    save.addEventListener("click", saveList);

    var remove = document.getElementById("remove");
    remove.addEventListener("click", function clearList() {
        localStorage.removeItem("notes");
    });
    remove.addEventListener("click", printList);

    printList();
}

function printList() {
    var list = document.getElementById("todo");
    list.innerHTML = "";

    if (notes) {
        notes.sort(function sort(a,b) {
            return a.time - b.time;
        });
    }
    
    notes.forEach(function print(note) {

        var paragraph = document.createElement("li");
        paragraph.setAttribute("id", note.id);
        paragraph.addEventListener("click", toggleCheckbox);
        paragraph.addEventListener("click", printList);

        var date = new Date(note.time);
        var time = "(" + date.getDay() + "/" + date.getMonth() + ")";

        var text = document.createTextNode(note.message + " " + time);
        paragraph.appendChild(text);
        paragraph.className = (note.done) ? "done" : "todo";
        list.appendChild(paragraph);

        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        if (note.done) {
            checkbox.setAttribute("checked", null);
        }
        paragraph.appendChild(checkbox);
    });
}

function toggleCheckbox(event) {

    var id = Number(event.target.id);

    var index = notes.findIndex(function find(note) {
        return (note.id === id);
    });
    var note = notes[index];
    note.done = !note.done;
}


function add(event) {

    event.preventDefault();
    
    var form = document.getElementById("notes");
    var text = form[0];
    var checkbox = form[1];

    var note = {
        id : generateId(),
        message : text.value,
        done : checkbox.checked,
        time : Date.now()
    };
    notes.push(note);
    text.value = "";
    checkbox.checked = false;
}

function saveList() {

    var cache = JSON.stringify(notes);
    localStorage.setItem("notes", cache);
}

function generateId() {

    var cache = localStorage.getItem("uuid");
    if (cache) {
        var id = cache;
    } else {
        var id = 0;
    }
    id++;
    localStorage.setItem("uuid", id);
    return id;
}

window.onload = init;
