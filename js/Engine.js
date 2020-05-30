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

    addBackground(this.root);
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    this.score = 0;
    //refers to engine.enemies because am in class engine
    // I want engine.score so this.score
    //to add score to the engine class
    // We add the background image to the game
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

      // each time there is a new enemy we are awarded 10 points
      // since we are surviving longer
      this.score = this.score + 10;
      let scoreElement = document.getElementById("score");
      scoreElement.innerText = `${this.score}`;
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)

    if (this.isPlayerDead()) {
      window.alert("Game over");
      return;
    }
    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  // the slot is equal to the column where the player is where each column is size of one enemy.
  //if conditions are met game over
  isPlayerDead = () => {
    let livesElement = document.getElementById("lives");
    const slot = this.player.x / ENEMY_WIDTH;
    const collidedEnemy = this.enemies.find((enemy) => {
      console.log(enemy.spot, slot);
      return (
        enemy.spot === slot &&
        enemy.y + ENEMY_HEIGHT >= this.player.y &&
        !enemy.collided
      );
    });
    if (collidedEnemy && this.player.lives > 1) {
      this.player.lives--;
      livesElement.innerText = this.player.lives;
      collidedEnemy.collided = true;
      return false;
    }
    return collidedEnemy;
  };
}

// or
// isPlayerDead = () => {
//   let dead = false;
//   this.enemies.forEach((enemy) => {
//     if (enemy.x === this.player.x && enemy.y >= this.player.y) {
//       dead = true;
//     }
//   });
//   return dead;
// };
