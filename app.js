'use strict';

//save the info on the notes (on local storage)

//save
//function saveNotes () {
//    let notes = window.document.querySelector('textarea'). value; // these notes that we created
//    window.localStorage.setItem('notes', notes); // saved in local storage saved as notes.
//}

function saveNotes() {
    var entryText = document.getElementById('entry').value;
    if (entryText.trim() !== '') {
      var entryElement = document.createElement('p');
      entryElement.textContent = entryText;

      var entriesDiv = document.getElementById('entries');
      entriesDiv.appendChild(entryElement);

      document.getElementById('entry').value = '';
    }
  }