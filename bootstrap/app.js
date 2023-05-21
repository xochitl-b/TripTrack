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


// Login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  var username = document.getElementById('loginUsername').value;
  var password = document.getElementById('loginPassword').value;

  var storedUser = JSON.parse(localStorage.getItem(username));

  if (storedUser && storedUser.password === password) {
    alert('Login successful!');
    // Perform further actions like redirecting to a dashboard page
  } else {
    alert('Invalid username or password!');
  }
});

// Register button click
document.getElementById('registerButton').addEventListener('click', function() {
  // Open the registration popup window
  var registerWindow = window.open('', 'Register', 'width=400,height=300');
  
  // Write the registration form HTML to the popup window
  registerWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Registration</title>
      <link rel="stylesheet" type="text/css" href="style.css">
    </head>
    <body>
      <div class="container">
        <form id="registerForm">
          <h2>Register</h2>
          <div>
            <label for="registerUsername">Username</label>
            <input type="text" id="registerUsername" required>
          </div>
          <div>
            <label for="registerPassword">Password</label>
            <input type="password" id="registerPassword" required>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>

      <script src="script.js"></script>
      <script>
        // Register form submission within the popup window
        document.getElementById('registerForm').addEventListener('submit', function(event) {
          event.preventDefault(); // Prevent form submission

          var username = document.getElementById('registerUsername').value;
          var password = document.getElementById('registerPassword').value;

          // Check if the username is already taken
          if (localStorage.getItem(username)) {
            alert('Username already exists. Please choose a different username.');
            return;
          }

          // Store the user information in local storage
          var user = { username: username, password: password };
          localStorage.setItem(username, JSON.stringify(user));

          alert('Registration successful!');
          // Perform further actions like redirecting to a login page

          // Close the registration popup window
          window.close();
        });
      </script>
    </body>
    </html>
  `);
});