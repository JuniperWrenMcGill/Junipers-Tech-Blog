const logout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the home page
        document.location.replace('/');
      } else {
        // Display an error message if logout fails
        throw new Error(`Logout failed: ${response.statusText}`);
      }
    } catch (error) {
      // Log and handle errors
      console.error('Error during logout:', error);
      alert('An error occurred during logout. Please try again.');
    }
  };
  
  // Attach click event listener for logout
  const logoutButton = document.querySelector('#logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', logout);
  } else {
    console.error('Logout button not found in the DOM');
  }
  