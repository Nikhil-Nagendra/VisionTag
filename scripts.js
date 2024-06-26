document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const fileInput = document.getElementById('image-upload');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            // Prompt user for tags
            const tagsInput = prompt("Enter Tags (comma-separated):");
            const tags = tagsInput ? tagsInput.split(',') : []; // Split tags by comma if entered

            addToGallery(imageUrl, tags);
        };
        
        reader.readAsDataURL(file);
    }
});

function addToGallery(imageUrl, tags) {
    const gallery = document.getElementById('gallery');
    const imgContainer = document.createElement('div');
    const img = document.createElement('img');
    img.src = imageUrl;
    img.dataset.tags = tags.join(', ');
    const tagList = document.createElement('ul');
    tags.forEach(tag => {
        const li = document.createElement('li');
        li.textContent = tag.trim(); // Trim any leading/trailing spaces
        tagList.appendChild(li);
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete this image?')) {
            imgContainer.remove(); // Remove the image container from the DOM
        }
    });

    imgContainer.appendChild(img);
    imgContainer.appendChild(tagList);
    imgContainer.appendChild(deleteBtn);
    imgContainer.classList.add('gallery-item');
    gallery.appendChild(imgContainer);
}

document.getElementById('search-bar').addEventListener('input', function(event) {
    const searchTerm = event.target.value.toLowerCase();
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach(item => {
        const tags = item.querySelector('img').dataset.tags.toLowerCase();
        if (tags.includes(searchTerm)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});
