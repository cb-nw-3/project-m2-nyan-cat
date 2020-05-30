// Select button
const button = document.querySelector("button");

// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    // We add the background image to the game
    addBackground(this.root);
    // Score counter
    this.score = 0;
    this.scoreDisplay = new Text(this.root, 15, 15);
    // Lives counter
    this.lives = 3;
    this.maxLives = 5;
    this.livesDisplay = new Text(this.root, 265, 15);
    // Level counter
    this.level = 0;
    this.levelDisplay = new Text(this.root, 265, 45);
    // Extra life when a new level is reached
    this.gottenCredit = false;
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      // This will update the score to 0, once the Game Over OK button is pressed
      this.livesDisplay.update("Lives: " + this.lives);
      window.alert("Game over");

      // This makes the Reset button visible when the game is over
      button.style.visibility = "visible";
      button.addEventListener("click", reset);
      return false;
    }

    // Display the updated score
    this.scoreDisplay.update("Score: " + this.score * 10);

    // Update and Display the Level
    this.level = Math.floor(this.score / 10);
    this.levelDisplay.update("Level: " + this.level);

    // Update and Display the lives score
    if (
      this.score % 10 === 0 &&
      this.score !== 0 &&
      this.gottenCredit === false
    ) {
      if (this.lives < this.maxLives) {
        this.lives++;
        this.gottenCredit = true;
      }
    }
    if (this.score % 10 !== 0) {
      this.gottenCredit = false;
    }
    this.livesDisplay.update("Lives: " + this.lives);

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    let result = false;
    this.enemies.forEach((enemy) => {
      if (
        enemy.x === this.player.x &&
        enemy.y - (GAME_HEIGHT - PLAYER_HEIGHT - 10) >= 0
      ) {
        this.lives--;
        enemy.destroy();
      }
    });
    if (this.lives === 0) {
      result = true;
    }
    return result;
  };
}
