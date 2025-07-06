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

document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("toggle-password");
  const copyBtn = document.getElementById("copy-btn");
  const themeSwitch = document.getElementById("theme-switch");
  const music = document.getElementById("bg-music");

  // Set initial volume
  if (music) {
    music.volume = 0.5;
  }

  // Start music after first user interaction (bypasses autoplay block)
  document.addEventListener("click", () => {
    if (music && music.paused) {
      music.play().catch(err => {
        console.warn("Autoplay blocked:", err);
      });
    }
  }, { once: true });

  passwordInput.addEventListener("input", function () {
    checkPasswordStrength(this.value);
  });

  togglePassword.addEventListener("click", function () {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    this.textContent = type === "password" ? "👁️" : "🙈";
  });

  copyBtn.addEventListener("click", function () {
    if (!passwordInput.value) return alert("Nothing to copy!");
    navigator.clipboard.writeText(passwordInput.value).then(() => {
      alert("Password copied to clipboard!");
    });
  });

  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");
    themeSwitch.checked = true;
  }

  themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("light-theme");
    localStorage.setItem("theme", themeSwitch.checked ? "light" : "dark");
  });
});
