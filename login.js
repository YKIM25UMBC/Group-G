// --- DOM ELEMENTS ---
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

const infoModal = document.getElementById("infoModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeBtn = document.querySelector(".closeBtn");

const aboutLink = document.getElementById("aboutLink");
const groupLink = document.getElementById("membersLink");

// registration password input
const regPasswordInput = document.querySelector(".form-box.register input[type='password']");

// --- SLIDE LOGIN/REGISTER ---
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});
loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

// --- LOGIN SUBMIT ---
document.querySelector(".form-box.login form").addEventListener("submit", function(e) {
    e.preventDefault(); 
    // !!!!!!! BACKEND ADD LOGIN VALIDATION PLSSSSS TY !!!!! 
    window.location.href = "home.html"; 
});

// --- REGISTRATION SUBMIT ---
document.querySelector(".form-box.register form").addEventListener("submit", function(e) {
    e.preventDefault(); 

    const password = regPasswordInput.value;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

    if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters and include an uppercase letter, a number, and a special character.");
        return;
    }

    // reset form and slide back to login
    this.reset();
    wrapper.classList.remove('active');
    alert("Registration successful! Please log in.");
});

// --- MODAL FUNCTIONALITY: 'ABOUT' ' GROUP MEMBERS' ---
aboutLink.addEventListener("click", (e) => {
    e.preventDefault();
    modalTitle.textContent = "About";
    // grabbed this from the read me file on github 
    modalText.textContent = "Our project is an integrated recipe management system designed for home chefs who discover new cooking ideas on short-form video platforms, especially TikTok. The platform streamlines the process from recipe discovery to cooking and shopping by automatically extracting recipe details, saving and organizing them, and creating unified grocery lists. Our goal is to eliminate the hassle of manual note-taking, fragmented organization, and inefficient grocery shopping by providing a seamless, automated experience.";
    infoModal.style.display = "flex";
});

groupLink.addEventListener("click", (e) => {
    e.preventDefault();
    modalTitle.textContent = "Group Members";
    modalText.innerHTML = "Jennah Rashed – Project Manager<br>Gabriela Corea – UX/UI Designer<br>Eiman Babar – Business Analyst<br>Christopher Ajayi – DevOps Engineer<br>Drew Beall – Backend Developer<br>";
    infoModal.style.display = "flex";
});

// close modal
closeBtn.addEventListener("click", () => {
    infoModal.style.display = "none";
});
window.addEventListener("click", (e) => {
    if (e.target === infoModal) {
        infoModal.style.display = "none";
    }
});

// PASSWORD REQUIREMENTS TOOLTIP 
// create floating tooltip
const tooltip = document.createElement("div");
tooltip.classList.add("password-tooltip");
tooltip.style.position = "absolute";
tooltip.style.background = "rgba(255,255,255,0.9)";
tooltip.style.border = "1px solid #ccc";
tooltip.style.padding = "10px";
tooltip.style.borderRadius = "10px";
tooltip.style.display = "none";
tooltip.style.width = "220px";
tooltip.style.zIndex = "10000";

tooltip.innerHTML = `
    <p>Password must include:</p>
    <ul>
        <li id="req-length">At least 8 characters</li>
        <li id="req-uppercase">An uppercase letter</li>
        <li id="req-number">A number</li>
        <li id="req-special">A special character (!@#$%^&*)</li>
    </ul>
`;
document.body.appendChild(tooltip);

// grab list items
const reqLength = tooltip.querySelector("#req-length");
const reqUppercase = tooltip.querySelector("#req-uppercase");
const reqNumber = tooltip.querySelector("#req-number");
const reqSpecial = tooltip.querySelector("#req-special");

// show/hide tooltip
regPasswordInput.addEventListener("focus", () => tooltip.style.display = "block");
regPasswordInput.addEventListener("blur", () => tooltip.style.display = "none");

// position tooltip and update requirements
regPasswordInput.addEventListener("input", () => {
    const val = regPasswordInput.value;

    reqLength.classList.toggle("valid", val.length >= 8);
    reqLength.classList.toggle("invalid", val.length < 8);

    reqUppercase.classList.toggle("valid", /[A-Z]/.test(val));
    reqUppercase.classList.toggle("invalid", !/[A-Z]/.test(val));

    reqNumber.classList.toggle("valid", /[0-9]/.test(val));
    reqNumber.classList.toggle("invalid", !/[0-9]/.test(val));

    reqSpecial.classList.toggle("valid", /[!@#$%^&*]/.test(val));
    reqSpecial.classList.toggle("invalid", !/[!@#$%^&*]/.test(val));

    // position tooltip next to input
    const rect = regPasswordInput.getBoundingClientRect();
    tooltip.style.top = rect.top + window.scrollY + "px";
    tooltip.style.left = rect.right + 10 + window.scrollX + "px";
});
