// In this file we have some data that the other source files will use.
// Most of this data is stored in constants.
// Constants are just variables that never change. By convention,
// We write constants with upper case letters.

// The GAME_WIDTH and GAME_HEIGHT constants denote the size
// of the game area in pixels and is used in engine-utilities.js.

// console.log(screen.width, typeof screen.width);
// if (screen.width > 900) {
//   const GAME_WIDTH = 900;
//   console.log("hi", GAME_WIDTH);
// } else {
//   const GAME_WIDTH = screen.width;
// }

const GAME_HEIGHT = window.innerHeight;
let GAME_WIDTH = 900;
if (screen.width > 900) {
  GAME_WIDTH = 900;
} else {
  GAME_WIDTH = window.innerWidth - 25;
}

document.documentElement.style.setProperty("--totalHeight", `${GAME_HEIGHT}px`);

// These constants represent the width and height of an enemy in pixels
// as well as the maximum number of enemies on screen at any given time.
const ENEMY_WIDTH = 75;
const ENEMY_HEIGHT = 156;
const MAX_ENEMIES = 3;

document.documentElement.style.setProperty(
  "--totalWidth",
  `${GAME_WIDTH + ENEMY_WIDTH / 2 + 4}px`
);
// These constants represent the player width and height.
const PLAYER_WIDTH = 75;
const PLAYER_HEIGHT = 54;

const bg = document.createElement("div");
let noMovement = false;
// control hamburguer movement

const addBackground = (root) => {
  // We create a new img DOM node.
  const WRAPPER = document.createElement("div");
  WRAPPER.id = "wrapper";
  root.append(WRAPPER);

  // We set its src attribute and the height and width CSS attributes
  bg.style.backgroundImage = "url(images/stars.gif)";
  bg.style.backgroundRepeat = "repeat";
  bg.style.height = `${GAME_HEIGHT}px`;
  bg.style.width = `${GAME_WIDTH + ENEMY_WIDTH / 2 + 4}px`;
  bg.id = "frame";

  // We add it to the root DOM node
  WRAPPER.appendChild(bg);

  // We don't want the enemies to go beyond the lower edge of the image
  // so we place a white div to hide the enemies after they reach the bottom.
  // To see what it does, you can comment out all the remaining lines in the function to see the effect.
  const whiteBox = document.createElement("div");
  // We put a high z-index so that the div is placed over all other DOM nodes
};
