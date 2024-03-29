// Create a new post
const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#new-post-title').value.trim();
    const description = document.querySelector('#new-post-desc').value.trim();

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
    // Ensure acting on elements with a 'data-id' attribute
    if (event.target.hasAttribute('data-id')) {
        // Confirm with the user before deletion
        const isConfirmed = confirm('Are you sure you want to delete this post?');
        if (!isConfirmed) {
            // User canceled the action
            return;
        }

        const id = event.target.getAttribute('data-id');

        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            });

            // console.log(response);


            if (response.ok) {
                // refresh
                document.location.replace('/dashboard'); 
            } else {
                // Handle specific errors based on response status
                switch (response.status) {
                    case 404:
                        alert('Post not found.');
                        break;
                    case 403:
                        alert('You do not have permission to delete this post.');
                        break;
                    default:
                        alert('Failed to delete post. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    }
};
// Event Listeners
document
    .querySelector('.create-btn')
    .addEventListener('click', newFormHandler);

// Attach the event listener to the delete button(s)
document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', delButtonHandler);
});
document
    .querySelector('.create-btn')
    .addEventListener('click', newFormHandler);

document.addEventListener('DOMContentLoaded', () => {
    const newPostForm = document.querySelector('.new-post-form');

    if (newPostForm) {
        newPostForm.addEventListener('submit', newFormHandler);
    } else {
        console.error('New post form not found');
    }
});

// document
//     .querySelector('#submit-update-btn')
//     .addEventListener('click', updateButtonHandler);
