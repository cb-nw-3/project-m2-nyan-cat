// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
console.log(document.querySelector("#wrapper"));
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

const mouseHandlerR = () => {
  gameEngine.player.moveRight();
};

const mouseHandlerL = () => {
  gameEngine.player.moveLeft();
};

let scorePoints = 0;
let score;
const SCORE = new Text(document.querySelector("#wrapper"), GAME_WIDTH - 20, 10);
const AUDIO = new Audio("sounds/Nyanyanyanyanyanyanya.mp3"); // The Music theme was a contribution of Roger Lam

function scoreScreen() {
  if (!noMovement) {
    scorePoints++;
    SCORE.update(scorePoints);
  }
}

// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener("keydown", keydownHandler);

// We call the gameLoop method to start the game
const START = document.createElement("button");
START.innerText = "START";
START.addEventListener("click", gameInit);
document.body.appendChild(START);

const RIGHTARROW = document.createElement("img");
RIGHTARROW.src = "images/arrow.png";
RIGHTARROW.id = "right";
RIGHTARROW.style.top = `${GAME_HEIGHT - 180}px`;
RIGHTARROW.style.left = `${GAME_WIDTH - 120}px`;
RIGHTARROW.addEventListener("click", mouseHandlerR);
document.body.appendChild(RIGHTARROW);

const LEFTARROW = document.createElement("img");
LEFTARROW.src = "images/arrow.png";
LEFTARROW.id = "left";
LEFTARROW.style.top = `${GAME_HEIGHT - 180}px`;
LEFTARROW.style.left = `${50}px`;
LEFTARROW.addEventListener("click", mouseHandlerL);
document.body.appendChild(LEFTARROW);

function gameInit() {
  this.innerText = "...PLAYING";
  START.removeEventListener("click", gameInit);
  noMovement = false;
  if (gameEngine.player.lifes <= 0) {
    scorePoints = 0;
    AUDIO.currentTime = 0;
    gameEngine.player.lifes = 3;
    gameEngine.player.fullLife();
  }
  const CRASH = document.querySelector("#crash") !== null;
  if (CRASH) {
    document
      .querySelector("#wrapper")
      .removeChild(document.querySelector("#crash"));
    gameEngine.player.domElement[0].src = "images/player.png";
  }
  gameEngine.gameLoop();
  AUDIO.play();
  score = setInterval(scoreScreen, 100);
}
