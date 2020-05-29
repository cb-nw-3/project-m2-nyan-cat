// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
//const gameEngine = new Engine(document.getElementById('app'));
const app = document.querySelector("#app");
const gameEngine = new Engine(app);

const start = document.createElement("span");
start.innerText = "PRESS 'SPACEBAR' TO START";
start.style.position = "absolute";
start.style.color = "white";
start.style.top = `100px`;
start.style.left = `70px`;
start.style.fontSize = '20px';
app.appendChild(start);

let score = 0;
const scoreTxt = document.createElement("span");

let lives = 3;
const livesTxt = document.createElement("span");





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

// We call the gameLoop method to start the game
  if (event.code === "Space") { 
    app.removeChild(start);
    gameEngine.gameLoop();
  }
  
};

// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener('keydown', keydownHandler);

//background music
const audio = new Audio('./js/TechMusic.mp3');
audio.play();

document.documentElement.addEventListener('keypress', () => {
  audio.play()
});
