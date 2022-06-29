const optionsList = {
    lettersLower: ["abcdefghijklmnopqrstuvwxyz"],
    lettersUpper: ["ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
    numbers: ["0123456789"],
    symbols: [`~!@#$%^&*()_+-=[]\{}|;:'",./<>?`],
};

const colors = {
    red: "#d00000",
    yellow: "#ffba08",
    green: "#06d6a0",
};

const options = ["lettersLower"];
let length = 10;

// Elements
const slider = document.getElementById("length");
const lenghtText = document.querySelector(".length-text");
const passwordText = document.querySelector(".password");
const copyButtonMain = document.querySelector(".cta");
const copyButtonSec = document.querySelector(".copy");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const generateButton = document.querySelector(".generate");
const strengthEl = document.querySelector(".strength-container");

generatePassword();

// Updating options with checkboxes
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", function () {
        if (this.checked) options.push(this.getAttribute("id"));
        else {
            // No options would be left
            if (options.length === 1) {
                this.checked = true;
                return;
            }

            options.splice(options.indexOf(this.getAttribute("id")), 1);
        }

        generatePassword();
    });
});

// Generate button
generateButton.addEventListener("click", () => {
    generatePassword();
});

// Slider values
slider.addEventListener("input", function () {
    lenghtText.textContent = this.value;
    length = this.value;

    generatePassword();
});

// Copying to clipboard
copyButtonMain.addEventListener("click", copyTextToClipboard);
copyButtonSec.addEventListener("click", copyTextToClipboard);

function copyTextToClipboard() {
    this.firstElementChild.style.opacity = 1;

    setTimeout(() => {
        this.firstElementChild.style.opacity = 0;
    }, 800);

    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(passwordText.textContent);
    return Promise.reject("The Clipboard API is not available.");
}

// Generating logic
function generatePassword() {
    let possible = "";
    let password = "";

    options.forEach(option => {
        possible += optionsList[option];
    });

    for (let i = 0; i < length; i++) {
        password += possible.charAt(
            Math.floor(Math.random() * possible.length)
        );
    }

    passwordText.textContent = password;

    updateStrength();
}

function updateStrength() {
    const strength = options.length + Math.floor(length / 2);

    if (strength < 6) {
        strengthEl.style.width = `33%`;
        strengthEl.style.backgroundColor = colors.red;
    } else if (strength < 9) {
        strengthEl.style.width = `66%`;
        strengthEl.style.backgroundColor = colors.yellow;
    } else {
        strengthEl.style.width = `100%`;
        strengthEl.style.backgroundColor = colors.green;
    }
}
