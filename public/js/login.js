const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      try {
        // Send a POST request to the API endpoint
        const response = await fetch('api/user/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          // If successful, redirect the browser to the dashboard
          document.location.replace('/dashboard');
        } else {
          // Display an error message if login fails
          alert(`Login failed: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  };
  
  // Sign up a new user
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('.name-signup').value.trim();
    const email = document.querySelector('.email-signup').value.trim();
    const password = document.querySelector('.password-signup').value.trim();
  
    if (name && email && password) {
      try {
        const response = await fetch('/api/user/signup', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          // If successful, redirect the browser to the dashboard
          document.location.replace('/dashboard');
        } else {
          // Display an error message if signup fails
          alert(`Signup failed: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error during signup:', error);
      }
    }
  };
  
  // Document ready
  document.addEventListener('DOMContentLoaded', () => {
    // Attach event listeners when the DOM is fully loaded
    document
      .querySelector('.login-form')
      .addEventListener('submit', loginFormHandler);
  
    document
      .querySelector('.signup-form')
      .addEventListener('submit', signupFormHandler);
  });
  