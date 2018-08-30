import CONST from "./constants";

export function horizontMoveMode(state) {
  let bodyEl = document.querySelector('body');
  let horClass = 'move-horizont';
  if (state) {
    bodyEl.classList.add(horClass);
  } else {
    bodyEl.classList.remove(horClass);
  }
}