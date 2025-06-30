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

  // Strength label + color
  let strengthLabel = '';
  let color = '';

  if (strength <= 1) {
    strengthLabel = 'Very Weak';
    color = 'red';
  } else if (strength === 2) {
    strengthLabel = 'Weak';
    color = 'orangered';
  } else if (strength === 3) {
    strengthLabel = 'Moderate';
    color = 'orange';
  } else if (strength === 4) {
    strengthLabel = 'Strong';
    color = 'blue';
  } else {
    strengthLabel = 'Very Strong';
    color = 'limegreen';
  }

  // DOM updates
  document.getElementById("strength-text").textContent = strengthLabel;
  document.getElementById("strength-text").style.color = color;
  document.getElementById("feedback").textContent = feedback.join(', ');

  // Update requirement list visually
  document.getElementById("req-length").className = lengthValid ? "valid" : "invalid";
  document.getElementById("req-upper").className = upperValid ? "valid" : "invalid";
  document.getElementById("req-lower").className = lowerValid ? "valid" : "invalid";
  document.getElementById("req-number").className = numberValid ? "valid" : "invalid";
  document.getElementById("req-symbol").className = symbolValid ? "valid" : "invalid";

  // Easter egg message
  const easterEggMessage = checkEasterEggs(password);
  document.getElementById("easter-egg").textContent = easterEggMessage;
}


// Hook into the input
document.getElementById("password").addEventListener("input", function () {
  checkPasswordStrength(this.value);
});

  const themes = [
  {
    name: "dark",
    bg: "linear-gradient(135deg, #0f172a, #1e293b)",
    card: "#1e293b",
    text: "#f1f5f9",
    accent: "#facc15"
  },
  {
    name: "light",
    bg: "#f1f5f9",
    card: "#ffffff",
    text: "#1e293b",
    accent: "#0f172a"
  },
  {
    name: "blue",
    bg: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
    card: "#1e40af",
    text: "#f1f5f9",
    accent: "#93c5fd"
  },
  {
    name: "purple",
    bg: "linear-gradient(135deg, #581c87, #9333ea)",
    card: "#6b21a8",
    text: "#fdf4ff",
    accent: "#fbcfe8"
  }
];

let currentTheme = 0;

document.getElementById("theme-toggle").addEventListener("click", () => {
  currentTheme = (currentTheme + 1) % themes.length;
  const theme = themes[currentTheme];
  
  document.body.style.background = theme.bg;
  document.body.style.color = theme.text;

  const card = document.querySelector(".card") || document.querySelector(".container");
  if (card) card.style.backgroundColor = theme.card;

  document.querySelector("h1").style.color = theme.accent;
});


