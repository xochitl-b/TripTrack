'use strict';
//the script was not working unless it was on the same path as the index

function addEntry() {
    var entryText = document.getElementById('entry').value;
    if (entryText.trim() !== '') {
      var entryElement = document.createElement('p');
      entryElement.textContent = entryText;
  
      var entriesDiv = document.getElementById('entries');
      entriesDiv.appendChild(entryElement);
  
      document.getElementById('entry').value = '';
    }
  }