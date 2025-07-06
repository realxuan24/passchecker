function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function checkEasterEggs(password) {
  const lower = password.toLowerCase();
  const birthdayRegex = /^(0[1-9]|1[0-2])[0-3][0-9](19|20)\d{2}$|^(19|20)\d{2}(0[1-9]|1[0-2])[0-3][0-9]$/;

  const commonPasswords = [
    "123456", "password", "12345678", "qwerty", "abc123",
    "111111", "123123", "admin", "letmein", "welcome",
    "iloveyou", "passw0rd", "monkey", "dragon"
  ];

  if (birthdayRegex.test(password)) {
    return pickRandom([
      "🎂 Using your birthday? Might as well hand out your password at your party.",
      "📅 Classic birthday password — and a hacker’s favorite too.",
      "🧠 Remembering is easy, but so is guessing this.",
      "🎉 Birthday detected – classic ahhh password 😂",
      "😏 You really trust the honor system, huh?"
    ]);
  }

  if (commonPasswords.includes(lower)) {
    if (lower.includes("password")) {
      return pickRandom([
        "🔐 'password' is not a password. It's a confession.",
        "🙄 The oldest trick in the book — and still a bad one.",
        "🤯 Did you just use 'password'? We're speechless.",
        "🚫 You just unlocked the vault of worst passwords ever.",
        "😬 Even your dog could hack that."
      ]);
    }

    if (/^\d+$/.test(password)) {
      return pickRandom([
        `🤔 Wow. You used '${password}'? Come on, try harder!`,
        "🔢 Your password's got the complexity of a ruler.",
        "🙃 It's not even trying to pretend it's secure.",
        "📉 Even kindergarteners use stronger passwords.",
        "🧃 Smooth brain detected. Try mixing things up."
      ]);
    }

    if (["admin", "letmein", "welcome"].includes(lower)) {
      return pickRandom([
        "🧟‍♂️ Are you trying to welcome hackers?",
        "🚪 'letmein'? You just did.",
        "👮‍♂️ 'admin'... You wish.",
        "🔓 Might as well leave the door wide open."
      ]);
    }

    if (lower.includes("love") || lower === "iloveyou") {
      return pickRandom([
        "💔 Love won't save you from brute force attacks.",
        "❤️ That's sweet... and utterly unsafe.",
        "💕 You’re sharing way too much with the internet."
      ]);
    }

    return `🤔 Wow. You used '${password}'? Come on, try harder!`;
  }

  return "";
}

function checkPasswordStrength(password) {
  let strength = 0;
  const feedback = [];

  const lengthValid = password.length >= 8;
  const upperValid = /[A-Z]/.test(password);
  const lowerValid = /[a-z]/.test(password);
  const numberValid = /[0-9]/.test(password);
  const symbolValid = /[^A-Za-z0-9]/.test(password);

  if (lengthValid) strength++;
  else feedback.push("Too short");

  if (upperValid) strength++;
  else feedback.push("Add uppercase letters");

  if (lowerValid) strength++;
  else feedback.push("Add lowercase letters");

  if (numberValid) strength++;
  else feedback.push("Add numbers");

  if (symbolValid) strength++;
  else feedback.push("Add symbols");

  const strengthText = document.getElementById("strength-text");
  const barFill = document.getElementById("bar-fill");
  const feedbackBox = document.getElementById("feedback");
  const inputField = document.getElementById("password");

  const barWidths = ["10%", "25%", "50%", "75%", "100%"];
  const strengthLabels = ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"];
  const strengthColors = ["red", "orangered", "orange", "blue", "limegreen"];

  strengthText.textContent = strengthLabels[strength - 1] || "Very Weak";
  strengthText.style.color = strengthColors[strength - 1] || "red";
  barFill.style.width = barWidths[strength - 1] || "10%";
  barFill.style.backgroundColor = strengthColors[strength - 1] || "red";
  barFill.style.boxShadow = `0 0 8px ${barFill.style.backgroundColor}`;

  feedbackBox.textContent = feedback.join(", ");

  document.getElementById("req-length").className = lengthValid ? "valid" : "invalid";
  document.getElementById("req-upper").className = upperValid ? "valid" : "invalid";
  document.getElementById("req-lower").className = lowerValid ? "valid" : "invalid";
  document.getElementById("req-number").className = numberValid ? "valid" : "invalid";
  document.getElementById("req-symbol").className = symbolValid ? "valid" : "invalid";

  document.getElementById("easter-egg").textContent = checkEasterEggs(password);

  if (strength <= 1) {
    inputField.classList.add("weak");
  } else {
    inputField.classList.remove("weak");
  }
}

document.getElementById("password").addEventListener("input", function () {
  checkPasswordStrength(this.value);
});

document.getElementById("toggle-password").addEventListener("click", function () {
  const input = document.getElementById("password");
  const type = input.type === "password" ? "text" : "password";
  input.type = type;
  this.textContent = type === "password" ? "👁️" : "🙈";
});

document.getElementById("copy-btn").addEventListener("click", function () {
  const input = document.getElementById("password");
  if (!input.value) return alert("Nothing to copy!");
  navigator.clipboard.writeText(input.value).then(() => {
    alert("Password copied to clipboard!");
  });
});

// Theme toggle
const themeSwitch = document.getElementById("theme-switch");
themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("light-theme");
});
