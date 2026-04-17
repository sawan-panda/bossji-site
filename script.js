const PASSWORD = "cat@4321";

const openButton = document.getElementById("openPassword");
const modal = document.getElementById("passwordModal");
const closeButton = document.getElementById("closePassword");
const form = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const errorMessage = document.getElementById("passwordError");
const spotlight = document.getElementById("cursorSpotlight");
const customCursor = document.getElementById("customCursor");
const rotatingTag = document.getElementById("rotatingTag");
const tagSparkles = document.getElementById("tagSparkles");

const rotatingMessages = [
  "A little place made only for you \u2728",
  "Small things made with love \uD83D\uDC97",
  "You are important \uD83C\uDF37",
  "You are the best \uD83C\uDF80",
  "Made to keep your smile safe \uD83E\uDEF6",
];

function moveSpotlight(clientX, clientY) {
  if (!spotlight) {
    return;
  }

  spotlight.style.left = `${clientX}px`;
  spotlight.style.top = `${clientY}px`;
}

function moveCustomCursor(clientX, clientY) {
  if (!customCursor) {
    return;
  }

  customCursor.style.left = `${clientX}px`;
  customCursor.style.top = `${clientY}px`;
}

function showModal() {
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  errorMessage.textContent = "";
  setTimeout(() => passwordInput.focus(), 20);
}

function hideModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  form.reset();
  errorMessage.textContent = "";
}

if (rotatingTag) {
  let rotatingIndex = 0;

  setInterval(() => {
    rotatingTag.classList.add("is-changing");
    tagSparkles?.classList.remove("is-active");

    setTimeout(() => {
      rotatingIndex = (rotatingIndex + 1) % rotatingMessages.length;
      rotatingTag.textContent = rotatingMessages[rotatingIndex];
      rotatingTag.classList.remove("is-changing");
      tagSparkles?.classList.add("is-active");

      setTimeout(() => {
        tagSparkles?.classList.remove("is-active");
      }, 700);
    }, 180);
  }, 1000);
}

document.addEventListener("mousemove", (event) => {
  moveSpotlight(event.clientX, event.clientY);
  moveCustomCursor(event.clientX, event.clientY);
  spotlight?.classList.add("is-visible");
  customCursor?.classList.add("is-visible");
});

document.addEventListener("mouseleave", () => {
  spotlight?.classList.remove("is-visible");
  customCursor?.classList.remove("is-visible");
});

document.addEventListener("mouseenter", (event) => {
  moveSpotlight(event.clientX, event.clientY);
  moveCustomCursor(event.clientX, event.clientY);
  spotlight?.classList.add("is-visible");
  customCursor?.classList.add("is-visible");
});

document.addEventListener("mousedown", () => {
  customCursor?.classList.add("is-clicking");
});

document.addEventListener("mouseup", () => {
  customCursor?.classList.remove("is-clicking");
});

openButton?.addEventListener("click", showModal);
closeButton?.addEventListener("click", hideModal);

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    hideModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.classList.contains("hidden")) {
    hideModal();
  }
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const enteredPassword = passwordInput.value.trim();

  if (enteredPassword === PASSWORD) {
    window.location.href = "home.html";
    return;
  }

  errorMessage.textContent = "Wrong password. Try again, sweetheart.";
  passwordInput.select();
});
