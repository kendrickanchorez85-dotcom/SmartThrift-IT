const loginBtn = document.querySelector("#login");
const registerBtn = document.querySelector("#register");
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");

// --- TOGGLE BETWEEN LOGIN & REGISTER ---
loginBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "blueviolet";
    registerBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    loginForm.style.left = "50%";
    registerForm.style.left = "-50%";
    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;   
});

registerBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    registerBtn.style.backgroundColor = "blueviolet";
    loginForm.style.left = "-50%";
    registerForm.style.left = "50%";
    loginForm.style.opacity = 0;
    registerForm.style.opacity = 1;   
});

// --- VIEW PASSWORD FUNCTION ---
// Nilalagyan natin ng toggle para makita ang password
document.querySelectorAll('ion-icon[name="lock-closed-outline"]').forEach(icon => {
    icon.style.cursor = "pointer";
    icon.addEventListener('click', () => {
        const input = icon.parentElement.querySelector('input');
        if (input.type === "password") {
            input.type = "text";
            icon.setAttribute('name', 'eye-outline'); // Palit icon sa mata
        } else {
            input.type = "password";
            icon.setAttribute('name', 'lock-closed-outline');
        }
    });
});

// --- SIGN UP LOGIC (SAVE TO LOCALSTORAGE) ---
const signUpForm = document.querySelector('.register-form');
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = signUpForm.querySelector('input[placeholder="Username"]').value;
    const pass = signUpForm.querySelector('input[placeholder="Password"]').value;

    // I-save sa LocalStorage (Browser Database)
    localStorage.setItem("storedUser", user);
    localStorage.setItem("storedPass", pass);

    alert("Registration Successful! Pwede ka na mag-Sign In.");
    loginBtn.click(); // Balik sa login form
});

// --- LOGIN LOGIC (FREE WILL) ---
const signInForm = document.querySelector('.login-form');
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userEntry = signInForm.querySelector('input[placeholder="Username"]').value;
    const passEntry = signInForm.querySelector('input[placeholder="Password"]').value;

    // Kunin ang data na sinave sa Sign Up
    const savedUser = localStorage.getItem("storedUser");
    const savedPass = localStorage.getItem("storedPass");

    if (userEntry === savedUser && passEntry === savedPass) {
        alert("Welcome, " + userEntry + "!");
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "main.html";
    } else {
        alert("Invalid Username or Password!");
    }
});

// Hanapin ang lahat ng social login boxes
document.querySelectorAll('.social-login-box').forEach(box => {
    box.addEventListener('click', () => {
        // Kunin ang alt attribute mula sa ion-icon sa loob ng box
        const platform = box.querySelector('ion-icon').getAttribute('alt');
        
        if (platform === "Google") {
            window.location.href = "https://accounts.google.com";
        } else if (platform === "Facebook") {
            window.location.href = "https://www.facebook.com/login/";
        } else if (platform === "Instagram") {
            window.location.href = "https://www.instagram.com/accounts/login/?hl=en";
        } else if (platform === "Linkedin") {
            window.location.href = "https://www.linkedin.com/home";
        }
    });
});