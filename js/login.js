const validUsers = ["hr", "menager", "zarzad", "pracownik", "pracownik-nowy1", "admin"];
const defaultPassword = "123";

const username = document.getElementById('login');
const password = document.getElementById('password');
const newPasswordSetup = document.getElementById('new-password-setup');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const newPasswordInput = document.getElementById('newPasswordInput');
const confirmPasswordInput = document.getElementById('confirmPasswordInput');
const displayUsername = document.getElementById('displayUsername');

function nextStep() {
    const userValue = usernameInput.value.toLowerCase().trim();

    if (userValue === "") {
        usernameInput.reportValidity();
        return;
    }

    if (validUsers.includes(userValue)) {
        displayUsername.innerText = userValue;
        username.classList.add('hidden');
        
        if (userValue === "pracownik-nowy1") {
            newPasswordSetup.classList.remove('hidden');
            newPasswordInput.focus();
        } else {
            password.classList.remove('hidden');
            passwordInput.focus();
        }
    } else {
        alert("Błąd: Niepoprawny login. Dostęp odmówiony.");
        usernameInput.value = "";
    }
}

function prevStep() {
    password.classList.add('hidden');
    newPasswordSetup.classList.add('hidden');
    username.classList.remove('hidden');
    passwordInput.value = "";
    newPasswordInput.value = "";
    confirmPasswordInput.value = "";
    usernameInput.focus();
}

function handleLogin() {
    const userValue = usernameInput.value.toLowerCase().trim();
    
    if (userValue === "pracownik-nowy1") {
        const nPass = newPasswordInput.value;
        const cPass = confirmPasswordInput.value;
        
        if (nPass === "" || cPass === "") {
            if(nPass === "") newPasswordInput.reportValidity();
            else confirmPasswordInput.reportValidity();
            return;
        }
        
        if (nPass !== cPass) {
            alert("Błąd: Hasła nie są identyczne!");
            confirmPasswordInput.value = "";
            return;
        }
        
        window.location.href = "pracownik_dashboard.html";
        return;
    }

    const pass = passwordInput.value;
    if (pass === "") {
        passwordInput.reportValidity();
        return;
    }

    if (pass === defaultPassword) {
        console.log(userValue);
        switch(userValue) {
            case "hr" : window.location.href = "hr_dashboard.html"; break;
            case "menager" : window.location.href = "menager_dashboard.html"; break;
            case "zarzad" : window.location.href = "zarzad_dashboard.html"; break;
            case "pracownik" : window.location.href = "pracownik_dashboard.html"; break;
            case "pracownik-nowy1" : window.location.href = "pracownik_dashboard.html"; break;
            case "admin" : window.location.href = "admin_dashboard.html"; break;
            default : alert("Nieznany Użytkownik!");
        }
    } else {
        alert("Błąd: Nieprawidłowe hasło!");
        passwordInput.value = "";
    }
}

usernameInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        nextStep();
    }
});


passwordInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleLogin();
    }
});


confirmPasswordInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleLogin();
    }
});