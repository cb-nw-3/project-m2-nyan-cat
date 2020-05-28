// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.getElementById('app'));
// select html div for player lives and bonus bullets
const livesContainer = document.querySelector('#lives');
const bulletContainer = document.querySelector('#bullets');
// start the background music
backgroundSound.play();
// initialize live variable
let liveDiv;
let bonusBulletImg;
// function called addLive to add lives to html
const addLive = () => {
  // create, modify and append images to parent
  liveDiv = document.createElement('img');
  liveDiv.id = 'playerLives';
  liveDiv.setAttribute('src','images/player.png');
  liveDiv.style.height = '27px';
  liveDiv.style.width = '37px';
  livesContainer.appendChild(liveDiv);
}
const addBullet = () => {
  bonusBulletImg = document.createElement('img');
  bonusBulletImg.id = 'bonusBullet';
  bonusBulletImg.setAttribute('src','images/gem.png');
  bonusBulletImg.style.height = '27px';
  bonusBulletImg.style.width = '37px';
  bulletContainer.appendChild(bonusBulletImg);
}
// do this loop for initial amount of lives
for (let i = 0; i < PLAYER_LIVES; i++) {
  addLive();
}
for (let i = 0; i < AMOUNT_OF_BULLETS; i++) {
  addBullet();
}

// add score div in the app
const score = new Text(gameEngine.root, 0, -5);

// select reset button
let resetButton = document.querySelector('button')
// event listener that reloads the page to restart the game when clicked
resetButton.addEventListener('click', function() {
  window.location.reload();
})

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

  // move player up
  if (event.code === 'ArrowUp') {
    gameEngine.player.moveUp();
  }

  // move player down
  if (event.code === 'ArrowDown') {
    gameEngine.player.moveDown();
  }

  // shoot bullet if no other bullet and space press
  if (event.code === 'Space' && gameEngine.bullet.length === 0 && gameEngine.amountOfBullets > 0) {
    // initialize bullet object
    gameEngine.bullet.push(new Projectile(gameEngine.root, gameEngine.player.y, gameEngine.player.x, gameEngine.speed));
    // remove one bullet
    gameEngine.amountOfBullets--;
    // remove bullet image when using a bullet
    bulletContainer.removeChild(bulletContainer.lastElementChild);
    // play laser sound
    laserSound.play();
  }
};

// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener('keydown', keydownHandler);

// We call the gameLoop method to start the game
gameEngine.gameLoop();
