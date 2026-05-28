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
const openLoveGame = document.getElementById("openLoveGame");
const loveGameModal = document.getElementById("loveGameModal");
const closeLoveGame = document.getElementById("closeLoveGame");
const loveQuestionScreen = document.getElementById("loveQuestionScreen");
const promiseScreen = document.getElementById("promiseScreen");
const gameArena = document.getElementById("gameArena");
const yesChoice = document.getElementById("yesChoice");
const noChoice = document.getElementById("noChoice");

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

function resetLoveGame() {
  loveQuestionScreen?.classList.remove("hidden");
  promiseScreen?.classList.add("hidden");

  if (yesChoice) {
    yesChoice.style.left = "18%";
    yesChoice.style.top = "50%";
  }
}

function showLoveGame() {
  loveGameModal?.classList.remove("hidden");
  loveGameModal?.setAttribute("aria-hidden", "false");
  resetLoveGame();
}

function hideLoveGame() {
  loveGameModal?.classList.add("hidden");
  loveGameModal?.setAttribute("aria-hidden", "true");
  resetLoveGame();
}

function moveYesChoice() {
  if (!gameArena || !yesChoice) {
    return;
  }

  yesChoice.classList.add("is-devil");

  const arenaWidth = gameArena.clientWidth;
  const arenaHeight = gameArena.clientHeight;
  const buttonWidth = yesChoice.offsetWidth;
  const buttonHeight = yesChoice.offsetHeight;
  const maxLeft = Math.max(0, arenaWidth - buttonWidth - 12);
  const maxTop = Math.max(0, arenaHeight - buttonHeight - 12);
  const left = Math.floor(Math.random() * maxLeft) + 6;
  const top = Math.floor(Math.random() * maxTop) + 6;

  yesChoice.style.left = `${left}px`;
  yesChoice.style.top = `${top}px`;

  setTimeout(() => {
    yesChoice.classList.remove("is-devil");
  }, 650);
}

function showPromiseScreen() {
  loveQuestionScreen?.classList.add("hidden");
  promiseScreen?.classList.remove("hidden");
}

if (gameArena && !loveGameModal) {
  resetLoveGame();
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
openLoveGame?.addEventListener("click", showLoveGame);
closeLoveGame?.addEventListener("click", hideLoveGame);
yesChoice?.addEventListener("click", (event) => {
  event.preventDefault();
  moveYesChoice();
});
noChoice?.addEventListener("click", showPromiseScreen);

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    hideModal();
  }
});

loveGameModal?.addEventListener("click", (event) => {
  if (event.target === loveGameModal) {
    hideLoveGame();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.classList.contains("hidden")) {
    hideModal();
  }

  if (
    event.key === "Escape" &&
    loveGameModal &&
    !loveGameModal.classList.contains("hidden")
  ) {
    hideLoveGame();
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
