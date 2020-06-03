// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.getElementById("app"));
gameScore = 0;
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

// adding a start button for the game
const startGame = document.createElement("button");
startGame.id = "startButton";
startGame.innerText = "Start";
startGame.addEventListener("click", nowPlaying);
document.body.appendChild(startGame);

function nowPlaying() {
  //get reset button, check if it exists, remove if exists
  let resetButton = document.getElementById("resetButton");
  if (resetButton != null) {
    resetButton.remove();
  }
  // remove start button
  document.getElementById("startButton").style.visibility = "hidden";
  // We call the gameLoop method to start the game
  gameEngine.gameLoop();

  // starting background music
  const backgroundMusic = new Audio("audio/bgmusic.mp3");
  backgroundMusic.play();

  // showing the score setups
  scoreId = "showScore";
  const scoreText = document.createElement("div");
  scoreText.innerText = `SCORE: ${gameScore}`;
  scoreText.id = scoreId;
  document.body.appendChild(scoreText);

  handleScore(scoreId, gameEngine.isPlayerDead());
  handleGameSound(backgroundMusic, gameEngine.isPlayerDead());

  function handleScore(scoreId, isPlayerDead) {
    document.getElementById(scoreId).innerHTML = `SCORE: ${Math.round(
      gameScore
    )}`;

    if (!isPlayerDead) {
      //Player isn't dead yet. Increase score and recall the handleScore in 1 second
      gameScore += 0.1;
      setTimeout(function () {
        handleScore(scoreId, gameEngine.isPlayerDead());
      }, 100);
    } else {
      //Player is dead
      //remove score for reset button
      document.getElementById(scoreId).remove();
      // set score to 0
      gameScore = 0;
    }
  }

  function handleGameSound(mainMusic, isPlayerDead) {
    if (isPlayerDead) {
      //Player is dead, stop main music
      mainMusic.pause();
    }

    setTimeout(function () {
      handleGameSound(mainMusic, gameEngine.isPlayerDead());
    }, 100);
  }
}
