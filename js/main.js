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
    bg = null;
    gameEngine = {};
    isFirstGame = false;
    this.style.display = "none";
    audio.pause();
    audio.currentTime = 0;
    audio = new Audio("./images/GroundZero.mp3");
    audio.play();
    gameEngine = new Engine(startGame);
    gameEngine.gameLoop();
  }
});
let mainBackground = document.getElementById("app");
mainBackground.setAttribute("style", "position: relative; width: fit-content;");
mainBackground.appendChild(btnStart);

let livesAndValue = document.createElement("div");
livesAndValue.setAttribute(
  "style",
  "position: absolute; top: 2%; right:2%; font-size: 25px; color:white; background-color: transparent; display: inline;"
);
let livesLabel = document.createElement("span");
livesLabel.innerHTML = "Lives: ";

let livesRemain = document.createElement("span");
livesRemain.innerHTML = 3;
livesAndValue.appendChild(livesLabel);
livesAndValue.appendChild(livesRemain);
mainBackground.appendChild(livesAndValue);

let scoreAndValue = document.createElement("div");
scoreAndValue.setAttribute(
  "style",
  "position: absolute; top: 2%; left:2%; font-size: 25px; color:white; background-color: transparent; display: inline;"
);
let scoreLabel = document.createElement("span");
scoreLabel.innerHTML = "Score: ";
let scoreValue = document.createElement("span");
scoreValue.innerHTML = 0;
scoreAndValue.appendChild(scoreLabel);
scoreAndValue.appendChild(scoreValue);
mainBackground.appendChild(scoreAndValue);

let levelAndValue = document.createElement("div");
levelAndValue.setAttribute(
  "style",
  "position: absolute; top: 2%; left:50%; font-size: 25px; color:white; background-color: transparent; transform: translate(-50%); transparent; display: inline;"
);
let levelLabel = document.createElement("span");
levelLabel.innerHTML = "Level: ";
let levelValue = document.createElement("span");
levelValue.innerHTML = 0;
levelAndValue.appendChild(levelLabel);
levelAndValue.appendChild(levelValue);
mainBackground.appendChild(levelAndValue);

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
