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


document.getElementById("start").addEventListener("click", function(){
  startBtn.classList.toggle("visible");
  document.addEventListener('keydown', keydownHandler);
  gameEngine.gameLoop();
});


// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener('keydown', keydownHandler);





// // We call the gameLoop method to start the game
// gameEngine.gameLoop();
