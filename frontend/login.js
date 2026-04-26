const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (e) => {
    // 1. Prevent the page from refreshing when the form is submitted
    e.preventDefault();

    // 2. Grab the values the user typed in
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // 3. Send the POST request to our backend
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Tell the server we are sending JSON
            },
            body: JSON.stringify({ email, password }) // Convert JS object to JSON string
        });

        const data = await response.json();

        // 4. Check if login was successful
        if (response.ok) {
            // Save the token and user name in the browser's local storage!
            localStorage.setItem('token', data.token);
            localStorage.setItem('userName', data.name);
            
            // Redirect the user back to the home page
            window.location.href = 'index.html';
        } else {
            // Show the error message from the backend (e.g., "Invalid email or password")
            errorMessage.textContent = data.message;
            errorMessage.style.display = 'block';
        }

    } catch (error) {
        errorMessage.textContent = "Server error. Please try again later.";
        errorMessage.style.display = 'block';
    }
});