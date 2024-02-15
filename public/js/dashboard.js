// Create a new post
const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const description = document.querySelector('#post-desc').value.trim();
  
    if (title && description) {
        try {
            const response = await fetch(`/api/posts`, {
                method: 'POST',
                body: JSON.stringify({ title, description }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            alert('An unexpected error occurred.');
        }
    }
};

// Update post form handler
const updateFormHandler = (event) => {
    event.preventDefault();
    alert('Update button pushed');  
    
    var updateFormEl = document.querySelector('.update');
    var createNewFormEl = document.querySelector('.new-post');
    console.log(updateFormEl);
    updateFormEl.classList.remove("hide");
    createNewFormEl.classList.add("hide");
};

// Update post button handler
const updateButtonHandler = async (event) => {
    event.preventDefault();
    alert('Update button pushed'); 

    try {
        if (event.target.hasAttribute('data-id')) {
            const id = event.target.getAttribute('data-id');
            const response = await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ title, description }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert('Failed to update blog post');
            }
        }
    } catch (error) {
        console.error('Error updating post:', error);
        alert('An unexpected error occurred.');
    }
    createNewFormEl.classList.remove("hide");
};

// Delete a current post
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        try {
            const id = event.target.getAttribute('data-id');
            const response = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert('Failed to delete post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('An unexpected error occurred.');
        }
    }
};

// Event Listeners
document
    .querySelector('.create-btn')
    .addEventListener('click', newFormHandler);

    //  SHOWING CONSOLE ERROR
document
    .querySelector('.delete-btn')
    .addEventListener('click', delButtonHandler);

document
    .querySelector('.update-btn')
    .addEventListener('click', updateFormHandler);

document
    .querySelector('#submit-update-btn')
    .addEventListener('click', updateButtonHandler);
    