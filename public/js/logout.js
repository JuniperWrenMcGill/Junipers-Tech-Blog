const logout = async () => {
  try {
    const response = await fetch('/api/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Logout failed: ${response.statusText}`);
    }

    document.location.replace('/');
  } catch (error) {
    console.error('Error during logout:', error);
    alert('An error occurred during logout. Please try again.');
  }
};

const logoutButton = document.querySelector('#logout');

if (logoutButton) {
  logoutButton.addEventListener('click', logout);
} else {
  console.error('Logout button not found in the DOM');
}
