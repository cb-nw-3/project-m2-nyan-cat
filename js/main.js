// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.getElementById('app'));

// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.
const keydownHandler = (event) => {
  // event.code contains a string. The string represents which key was press. If the
  // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?)
  if (event.code === 'ArrowLeft') {
    gameEngine.player.moveLeft();
  }

  // If `event.code` is the string that represents a right arrow keypress,
  // then move our hamburger to the right
  if (event.code === 'ArrowRight') {
    gameEngine.player.moveRight();
  }
};


//create a start button that will initiate the gameLoop method, instead of it being
//started onload.

const startBtn = document.createElement("button")
startBtn.innerText = "Start";
startBtn.id = "start";
startBtn.classList.toggle("start-btn");
// startBtn.classList.toggle("visible");
//restartBtn.style.left = `${GAME_WIDTH/5}px`;
startBtn.style.left = "70px"; //looks centered enough
startBtn.style.top = `${GAME_HEIGHT/2}px`;
document.getElementById('app').appendChild(startBtn);

//Add functionality to the start button, when clicked.
document.getElementById("start").addEventListener("click", function() {

  //the button will disappear
  startBtn.classList.toggle("visible");

  //the left and right arrow keys will enable the player to move
  document.addEventListener('keydown', keydownHandler);

  //the game loop starts
  gameEngine.gameLoop();
});


//create a restart button that is initially hidden, and will only appear when 
//the gameloop end condition is met (player dies).
const restartBtn = document.createElement("button")
restartBtn.innerText = "Restart";
restartBtn.id = "restart";
restartBtn.classList.toggle("restart-btn");
restartBtn.classList.toggle("visible");
//restartBtn.style.left = `${GAME_WIDTH/5}px`;
restartBtn.style.left = "70px"; //looks centered enough
restartBtn.style.top = `${GAME_HEIGHT/2}px`;
document.getElementById('app').appendChild(restartBtn);

//Add functionality to the restart button, when clicked.
document.getElementById("restart").addEventListener("click", function() {

  //the button will disappear
  restartBtn.classList.toggle("visible");

  //the left and right arrow keys will be re-enabled, previously removed
  //when the first game loop finished
  document.addEventListener('keydown', keydownHandler);

  //restart the game loop
  gameEngine.gameLoop();
});



// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
//document.addEventListener('keydown', keydownHandler);



// // We call the gameLoop method to start the game
// gameEngine.gameLoop();
