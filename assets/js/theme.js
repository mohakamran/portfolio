// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

// Load saved theme
if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  document.documentElement.classList.add("dark");
  themeIcon.textContent = "☀️";
} else {
  document.documentElement.classList.remove("dark");
  themeIcon.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  if (document.documentElement.classList.contains("dark")) {
    localStorage.theme = "dark";
    themeIcon.textContent = "☀️";
  } else {
    localStorage.theme = "light";
    themeIcon.textContent = "🌙";
  }
});
