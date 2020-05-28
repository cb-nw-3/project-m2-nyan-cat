// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`

const audio = new Audio("./audio/background.mp3");
audio.id = "background";
const messageDiv = document.createElement("div");
const textNode = document.createTextNode(
  `You are Nero, Emperor of Rome. Escape all responsibility while playing your fiddle for as long as you can.`
);
const button = document.createElement("button");

messageDiv.classList.add("message");
button.innerText = "I'm Ready";
messageDiv.appendChild(textNode);
messageDiv.appendChild(button);
messageDiv.style.display = "flex";
messageDiv.style.justifyContent = "center";
messageDiv.style.alignItems = "center";
messageDiv.style.flexDirection = "column";
document.getElementById("app").appendChild(messageDiv);

button.addEventListener("click", startGame);
const gameEngine = new Engine(document.getElementById("app"));

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

function startGame() {
  console.log(audio);
  audio.play();
  messageDiv.style.opacity = 0;
  gameEngine.gameLoop();
}

// We call the gameLoop method to start the game
