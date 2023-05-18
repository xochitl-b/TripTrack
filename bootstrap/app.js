'use strict';
//Keep this file here, the script was not working unless it was on the same path as the html files

function addEntry() {
    var entryText = document.getElementById('entry').value; //get the "text" part of the entry
    var titleText = document.getElementById('title').value; //get the title
    var imageFile = document.getElementById('image').files[0]; //get whatever image is uploaded

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

      //if image is uploaded, using FileReader API, the function creates an img
      //Will try and lookup how to manage if we want to upload more than one image    
      if (imageFile) {
        var imageElement = document.createElement('img');
        var reader = new FileReader();
        reader.onload = function(e) {
          imageElement.src = e.target.result;
        };
        //image source is set as image URL and appended to entry div
        reader.readAsDataURL(imageFile); 
        entryElement.appendChild(imageElement);
      }
      //Entry (title+text+image) is appended to the entries div
      var entriesDiv = document.getElementById('entries');
      entriesDiv.appendChild(entryElement);

      document.getElementById('entry').value = '';
      document.getElementById('title').value = '';
      document.getElementById('image').value = '';
    }
  }

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
