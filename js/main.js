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

let scoreCount = 0;
let score;
const SCORE = new Text(document.querySelector("#app"), 20, 5);
const AUDIO = new Audio("/DontStopMeNow.mp3");

function scoreCounter() {
  scoreCount++;
  SCORE.update(scoreCount);
}
// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener("keydown", keydownHandler);

const START = document.createElement("button");
START.innerText = "START";
START.style.position = "absolute";
START.style.zIndex = 4000;
START.style.backgroundColor = "dodgerblue";
START.style.color = "white";
START.style.fontWeight = "bold";
START.style.fontSize = "20px";
START.style.width = GAME_WIDTH;
START.style.height = "50px";
START.style.marginTop = "-8px";
START.style.borderRadius = "4px";
START.addEventListener("click", initGame);
document.body.appendChild(START);

function initGame() {
  scoreCount = 0;
  AUDIO.play();
  AUDIO.loop = true;
  gameEngine.gameLoop();
  score = setInterval(scoreCounter, 100);
}

// We call the gameLoop method to start the game
//gameEngine.gameLoop();
