// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.getElementById("app"));

// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter? - should be event) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.
const keydownHandler = (event) => {
  // event.code contains a string. The string represents which key was press. If the
  // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?) -in the player.js
  if (event.code === "ArrowLeft") {
    gameEngine.player.moveLeft();
  }

  // If `event.code` is the string that represents a right arrow keypress,
  // then move our hamburger to the right
  if (event.code === "ArrowRight") {
    gameEngine.player.moveRight();
  }
};
//Addition of Score and audio files
//let scoreCount = 0;
let score;
//let lifeCount = 100;
let life;
const SCORE = new Text(document.querySelector("#app"), 15, 10);
const BG_MUSIC1 = new Audio("/DontStopMeNow.mp3");
const PRESS_START = new Audio("/gamestart.mp3");
const GAME_OVER = new Audio("/gameover.mp3");
const LIFE = new Text(document.querySelector("#app"), 730, 10);
const BG_MUSIC2 = new Audio("/GeorgyPorgy.mp3");
const BG_MUSIC3 = new Audio("/Circles.mp3");

function scoreCounter() {
  scoreCount++;
  SCORE.update(`ALIVE FOR ${scoreCount} SECONDS!`);
}

function showLife() {
  LIFE.update(`${lifeCount} HP LEFT`);
}
function loseLife() {
  LIFE.update(`${lifeCount - 1} HP LEFT`);
}
// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener("keydown", keydownHandler);
//Modification on Start button
const START = document.createElement("button");
START.innerText = "START";
START.style.position = "absolute";
START.style.zIndex = 4000;
START.style.backgroundColor = "blueviolet";
START.style.color = "white";
START.style.fontWeight = "bold";
START.style.fontSize = "20px";
START.style.width = GAME_WIDTH;
START.style.height = "50px";
START.style.marginTop = "-8px";
START.style.borderRadius = "4px";
START.addEventListener("click", initGame);
document.body.appendChild(START);
//Initializing the game with all the trinkets :)
function initGame() {
  scoreCount = 0;
  lifeCount = 350;
  PRESS_START.play();
  gameEngine.gameLoop();
  score = setInterval(scoreCounter, 1000);
  life = setInterval(showLife, 1000);
  setTimeout(function () {
    BG_MUSIC1.play();
  }, 500);
  window.alert(
    `Enjoy the game and the music!
    3 levels and 100 HP for each level (+ extra ;) )
    Press Left and Right Arrow keys to move the Hamburger horizontally
    Don't get eaten!`
  );
  //BG_MUSIC.loop = true;
  START.removeEventListener("click", initGame);
}

// We call the gameLoop method to start the game
//gameEngine.gameLoop();
