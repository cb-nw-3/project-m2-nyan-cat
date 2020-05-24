// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.querySelector("#app"));

// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.
const keydownHandler = (event) => {
  // event.code contains a string. The string represents which key was press. If the
  // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?)
  if (event.code === "ArrowLeft") {
    gameEngine.player.moveLeft();
  }

  // If `event.code` is the string that represents a right arrow keypress,
  // then move our hamburger to the right
  if (event.code === "ArrowRight") {
    gameEngine.player.moveRight();
  }
};
let scorePoints = 0;
let score;
const SCORE = new Text(document.querySelector("#app"), GAME_WIDTH - 20, 10);
const AUDIO = new Audio("sounds/Nyanyanyanyanyanyanya.mp3"); // The Music theme was a contribution of Roger Lam

function scoreScreen() {
  scorePoints++;
  SCORE.update(scorePoints);
}

// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener("keydown", keydownHandler);

// We call the gameLoop method to start the game
const START = document.createElement("button");
START.innerText = "START";
START.addEventListener("click", gameInit);
document.body.appendChild(START);

function gameInit() {
  console.log(gameEngine.player.lifes);
  if (gameEngine.player.lifes <= 0) {
    scorePoints = 0;
    AUDIO.currentTime = 0;
    gameEngine.player.lifes = 3;
    gameEngine.player.domElement[1].style.display = "block";
    gameEngine.player.domElement[2].style.display = "block";
    gameEngine.player.domElement[3].style.display = "block";
  }
  gameEngine.gameLoop();
  AUDIO.play();
  score = setInterval(scoreScreen, 100);
}
