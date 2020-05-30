// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
let audio = new Audio("./images/GroundZero.mp3");
let gameEngine = {};
let isFirstGame = true;
let btnStart = document.createElement("BUTTON");
let startGame = document.getElementById("app");
btnStart.innerHTML = "Click Here to Start";
btnStart.id = "btnGame";
btnStart.setAttribute(
  "style",
  "position: absolute; top: 50%; left:50%; font-size: 30px; color:white; background-color: transparent; border: none; transform: translate(-50%, -50%); outline: none;"
);
btnStart.addEventListener("click", function () {
  audio.loop = true;
  audio.play();
  this.style.display = "none";
  gameEngine.gameLoop();
  if (btnStart.innerHTML === "Play Again") {
    MAX_ENEMIES = 3;
    GAME_WIDTH = 375;
    bg = null;
    gameEngine = {};
    isFirstGame = false;
    this.style.display = "none";
    audio.pause();
    audio.currentTime = 0;
    audio = new Audio("./images/GroundZero.mp3");
    audio.play();
    document.body.removeChild(startGame);
    startGame = document.createElement("div");
    startGame.setAttribute("style", "position: relative; width: fit-content;");
    document.body.appendChild(startGame);
    gameEngine = new Engine(startGame);
    gameEngine.gameLoop();
  }
});
let mainBackground = document.getElementById("app");
mainBackground.setAttribute("style", "position: relative; width: fit-content;");
mainBackground.appendChild(btnStart);

let gameStart = setInterval(function () {
  btnStart.style.visibility =
    btnStart.style.visibility == "hidden" ? "visible" : "hidden";
}, 500);
if (isFirstGame) {
  gameEngine = new Engine(startGame);
}

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

// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener("keydown", keydownHandler);

// We call the gameLoop method to start the game
