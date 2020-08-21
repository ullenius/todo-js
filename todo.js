"use strict";

(function iife() {
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
        notes = [];
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
        var time = `(${date.getDate()}/${date.getMonth() + 1})`;

        var text = document.createTextNode(`${note.message} ${time}`);
        paragraph.appendChild(text);
        paragraph.className = (note.done) ? "done" : "todo";
        list.appendChild(paragraph);

        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.addEventListener("click", printList);
        checkbox.setAttribute("id", note.id);
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
    var [
        text,
        checkbox
        ] = readForm();

    var { value : message } = text;
    var { checked : done } = checkbox;

    var note = {
        id : generateId(),
        message,
        done,
        time : Date.now()
    };
    console.log("Note added");
    console.log(note);
    notes.push(note);
    text.value = "";
    checkbox.checked = false;
}

function readForm() {
    var form = document.getElementById("notes");
    return [form[0], form[1]];
}

function saveList() {

    var cache = JSON.stringify(notes);
    localStorage.setItem("notes", cache);
}

function generateId() {
    var id = localStorage.getItem("uuid");
    if (!id) {
        var id = 0;
    }
    id++;
    localStorage.setItem("uuid", id);
    return id;
}

window.onload = init;
})();
