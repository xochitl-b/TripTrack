'use strict';
// Keep this file here, the script was not working unless it was on the same path as the html files

// load past content stored locally upon start
window.addEventListener('DOMContentLoaded', function () {
  loadEntriesFromLocalStorage();

  // Event listener to the delete button
  var deleteButton = document.getElementById('deleteButton');
  deleteButton.addEventListener('click', deleteAllEntries);
});


//------ Drag and drop ------
//When file dropped to drop area "images". Handle drag leave function removes hover effect
function handleDrop(event) {
  event.preventDefault();
  var files = event.dataTransfer.files;
  document.getElementById('image').files = files;
  handleDragLeave(event);
}
//stop default behaviour to allow dropping files onto the area
function handleDragOver(event) {
  event.preventDefault();
}
//when file is dragged on drop area indicates hover effect
function handleDragEnter(event) {
  event.preventDefault();
  var dropArea = event.target;
  dropArea.classList.add('hover');
}
//when a file is dragged out of the drop-area. 
//Stops the default behavior and removes the hover class from the drop-area to remove the hover effect
function handleDragLeave(event) {
  event.preventDefault();
  var dropArea = event.target;
  dropArea.classList.remove('hover');
}
//if using the "select files"
function handleFileSelect(event) {
  var files = event.target.files;
  // You can access the selected files here and perform any necessary processing
}

    //function to save entry to local storage
    function saveEntryToLocalStorage(entryElement) {
      // Get existing entries from local storage
      var entries = JSON.parse(localStorage.getItem('entries')) || [];
      // Add the new entry to the entries array
      entries.push(entryElement.innerHTML);
      // Save the updated entries array back to local storage
      localStorage.setItem('entries', JSON.stringify(entries));
    }

function addEntry() {
  var entryText = document.getElementById('entry').value; //get the "text" part of the entry
  var titleText = document.getElementById('title').value; //get the title
  var imageFiles = document.getElementById('image').files; //get whatever image is uploaded

  if (entryText.trim() !== '') {
    var entryElement = document.createElement('div');
    entryElement.classList.add('entry');

    //if title is there, the function creates a h2 element and appended to the entry div
    if (titleText.trim() !== '') {
      var titleElement = document.createElement('h2');
      titleElement.textContent = titleText;
      entryElement.appendChild(titleElement);
    }
    //text is put in a p element and appended to entry div
    var entryTextElement = document.createElement('p');
    entryTextElement.textContent = entryText;
    entryElement.appendChild(entryTextElement);

    //create a div "imagesWrapper" with css style to display as 3 by 3
    var imagesWrapper = document.createElement('div');
    imagesWrapper.classList.add('images-wrapper');

    //if image is uploaded, using FileReader API, the function creates an img
    //loop to go over the images if more than on is uploaded
    for (var i = 0; i < imageFiles.length; i++) {
      var imageElement = document.createElement('img');
      var reader = new FileReader();
      reader.onload = (function (img) {
        return function (e) {
          img.src = e.target.result;
        };
      })(imageElement);
      //image source is set as image URL and appended to entry images wrapper div
      reader.readAsDataURL(imageFiles[i]);
      imagesWrapper.appendChild(imageElement);
    }
    //append imageswrapper div to entry elemnt
    entryElement.appendChild(imagesWrapper);

    //Entry (title+text+image) is appended to the entries div
    var entriesDiv = document.getElementById('entries');
    entriesDiv.appendChild(entryElement);

    document.getElementById('entry').value = '';
    document.getElementById('title').value = '';
    document.getElementById('image').value = '';


    saveEntryToLocalStorage(entryElement);

  }
}

function deleteAllEntries() {
  var entriesDiv = document.getElementById('entries');
  entriesDiv.innerHTML = ''; // Clear the entries div

  // Clear local storage
  localStorage.removeItem('entries');
}

function loadEntriesFromLocalStorage() {
  // Get existing entries from local storage
  var entries = JSON.parse(localStorage.getItem('entries')) || [];

  // Go through the entries and append them to the entries div
  var entriesDiv = document.getElementById('entries');
  for (var i = 0; i < entries.length; i++) {
    var entryElement = document.createElement('div');
    entryElement.classList.add('entry');
    entryElement.innerHTML = entries[i];
    entriesDiv.appendChild(entryElement);
  }
};



// Function for the rating system 
const stars = document.querySelectorAll('.rating input');

for (let i = 0; i < stars.length; i++) {
  stars[i].addEventListener('click', (event) => {
    const rating = event.target.value;
    console.log('Selected rating:', rating);
  });
}

// Handle the login form submit event
mainWindow.webContents.on('did-finish-load', () => {
  const loginForm = mainWindow.webContents.getElementById('loginForm');
  loginForm.addEventListener('submit', event => {
    event.preventDefault();

    // Retrieve the entered username and password values
    const username = loginForm.username.value;
    const password = loginForm.password.value;
  });
  // Perform authentication logic (e.g., validate credentials against a database or API)
  if (username === 'admin' && password === 'password') {
    // Successful login, redirect to another page
    mainWindow.loadURL(`file://${__dirname}/bootstrap/index.html`);
  } else {
    // Invalid credentials, display an error message
    const errorElement = mainWindow.webContents.getElementById('error');
    errorElement.textContent = 'Invalid username or password';
  }
});

mainWindow.on('closed', () => {
  mainWindow = null;
});
