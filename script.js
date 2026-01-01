// script.js
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

function validatePassword(password, formType) {
    if (formType === 'Login') {
        return password === "admin123"; // Hardcoded password for login
    }
    // For registration, use strong validation
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
}

function handleFormSubmit(event, formType) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (formType === 'Login') {
        // Fixed email and password for login
        if (email !== "rutujat@gmail.com" || password !== "rutuja123") {
            alert('Invalid email or password.');
            return;
        }
        window.location.href = "dashboard.html";
    } else {
        if (!validateEmail(email)) {
            alert('Please enter a valid email.');
            return;
        }
        if (!validatePassword(password, formType)) {
            alert('Password must be at least 8 characters with uppercase, lowercase, number, and special character.');
            return;
        }
        if (formType === 'Registration') {
            const confirmPassword = document.getElementById('confirm-password').value;
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
        }
        alert(`${formType} submitted successfully!`);
    }
}

// Attach to forms on page load
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (form) {
        const formType = document.title.includes('Login') ? 'Login' : 
                        document.title.includes('Register') ? 'Registration' : 'Forgot Password';
        form.addEventListener('submit', (e) => handleFormSubmit(e, formType));
    }
});