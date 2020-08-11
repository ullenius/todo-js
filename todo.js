"use strict";

var notes = [];

function init() {

    var cache = localStorage.getItem("notes");
    if (cache) {
        notes = JSON.parse(cache);
    }

    var form = document.getElementById("notes");
    form.addEventListener("submit", add);

    var save = document.getElementById("save");
    save.addEventListener("click", saveList);

    var remove = document.getElementById("remove");
    remove.addEventListener("click", function clearList() {
        localStorage.removeItem("notes");
    });

    printList();
}

function printList() {
    var list = document.getElementById("todo");
    list.innerHTML = "";

    if (notes) {
        notes.sort(function sort(a,b) {
            return a.time - b.time
        });
    }
    
    notes.forEach(function print(note) {

        var paragraph = document.createElement("li");
        var date = new Date(note.time);
        console.log(date.getFullYear());
        var time = "(" + date.getDay() + "/" + date.getMonth() + ")";

        var text = document.createTextNode(note.message + " " + time);
        paragraph.appendChild(text);
        paragraph.className = (note.done) ? "done" : "todo";
        list.appendChild(paragraph);
    });
}

function add(event) {

    event.preventDefault();
    
    var input = document.querySelectorAll("input");

    var note = {
        message : input[0].value,
        done : input[1].checked,
        time : Date.now()
    };
    notes.push(note);
    console.log("Note added");
    input.value = "";
    printList();
}

function saveList() {

    var cache = JSON.stringify(notes);
    localStorage.setItem("notes", cache);
    console.log(cache);
}

window.onload = init;
