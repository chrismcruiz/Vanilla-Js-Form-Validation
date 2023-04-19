import { KONAMI_CODE } from "./constants.js";

const konamiCode = document.getElementById("konami-code");
const cardContainer = document.getElementById("card-container");
const rickAudio = document.getElementById("rick-audio");
const closeModal = document.getElementById("konami-code__close");

const pressedKeys = [];

closeModal.addEventListener("click", () => {
  konamiCode.classList.add("konami-code--hidden");
  cardContainer.classList.remove("card-container--opaque");
  rickAudio.pause();
  rickAudio.currentTime = 0;
});


document.addEventListener("keyup", (e) => {
  pressedKeys.push(e.key);
  const keys = pressedKeys.slice(pressedKeys.length - KONAMI_CODE.length);

  if (keys.join("").toLowerCase() !== KONAMI_CODE) return

  konamiCode.classList.remove("konami-code--hidden");
  cardContainer.classList.add("card-container--opaque");
  rickAudio.play();
});

