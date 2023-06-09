'use strict';
// Keep this file here, the script was not working unless it was on the same path as the html files

// Load existing blog posts from local storage
window.addEventListener('load', () => {
  const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
  savedBlogs.forEach(blog => {
    addBlogToList(blog);
  });
});

// Save a blog post to local storage
function saveBlogToLocalStorage(blog) {
  const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
  savedBlogs.push(blog);
  localStorage.setItem('blogs', JSON.stringify(savedBlogs));
}

// Remove a blog post from local storage
function removeBlogFromLocalStorage(blog) {
  const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
  const updatedBlogs = savedBlogs.filter(savedBlog => savedBlog.title !== blog.title || savedBlog.text !== blog.text || savedBlog.image !== blog.image);
  localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
}

// Add a blog post to the list
function addBlogToList(blog) {
  const entries = document.getElementById('entries');

  const blogEntry = document.createElement('div');
  blogEntry.classList.add('blog-entry');

  const titleElement = document.createElement('h1');
  titleElement.textContent = blog.title;
  blogEntry.appendChild(titleElement);

  const textElement = document.createElement('p');
  textElement.textContent = blog.text;
  blogEntry.appendChild(textElement);

  const imageElement = document.createElement('img');
  imageElement.src = blog.image;
  blogEntry.appendChild(imageElement);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    removeBlogFromLocalStorage(blog);
    entries.removeChild(blogEntry);
  });
  blogEntry.appendChild(deleteButton);

  entries.appendChild(blogEntry);
}

// Handle form submission (post submission)
const blogForm = document.getElementById('blogForm');
blogForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const titleInput = document.getElementById('titleInput');
  const textInput = document.getElementById('textInput');

  // Retrieve the dropped image (if any)
  const droppedImage = document.getElementById('imageInput').files[0];
  //if image then add to blog
  if (droppedImage) {
    const reader = new FileReader();
    reader.onload = () => {
      const blog = {
        title: titleInput.value,
        text: textInput.value,
        image: reader.result
      };

      addBlogToList(blog);
      saveBlogToLocalStorage(blog);

      titleInput.value = '';
      textInput.value = '';
    };
    reader.readAsDataURL(droppedImage);
  } else {
    alert('Please upload an image.');
  }
});

// Handle drag over the drop area and prevent the default action of opening in browser
function handleDragOver(event) {
  event.preventDefault();
  event.target.classList.add('drag-drop-area-active');
}

// Handle drag leave the drop area and prevent the default action of opening in browser
function handleDragLeave(event) {
  event.preventDefault();
  event.target.classList.remove('drag-drop-area-active');
}

// Handle drop, save to image input, and prevent the default action
function handleDrop(event) {
  event.preventDefault();
  event.target.classList.remove('drag-drop-area-active');
  const droppedFile = event.dataTransfer.files[0];
  const imageInput = document.getElementById('imageInput');
  imageInput.files = event.dataTransfer.files;
  event.target.innerHTML = '<p>Great! Your image has been uploaded</p>';
}
//function for testing to avoid over-poulating local storage
// function deleteAllEntries() {
//   var entriesDiv = document.getElementById('entries');
//   entriesDiv.innerHTML = ''; // Clear the entries div

//   // Clear local storage
//   localStorage.removeItem('entries');
// }

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


