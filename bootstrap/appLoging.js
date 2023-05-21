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
    var registerWindow = window.open('index.html', 'Register', 'width=400,height=300');
    
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
  