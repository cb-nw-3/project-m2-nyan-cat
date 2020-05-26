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
      window.alert('Game over');
      return;
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    //create a boolean indicator to show if a crash occurs
    let crash = false;

    //A collision can only occur when the enemy position has reached the beginning of the player's burger image
    let collisionY = GAME_HEIGHT - PLAYER_HEIGHT - 10;

    //let distDiff = enemy.y - playerY;
    //console.log(this.enemies[0].y);
    //console.log("Player is at",gameEngine.player.x);

    //Loop through each enemy class and verify that a collision occurs.
    this.enemies.forEach(enemy => {
      //console.log(`Enemy at lane ${enemy.spot} is at `,enemy.x, enemy.y);

      //collision can only occur if the player is in the same lane as an enemy
      //AND that the distance between the enemy and player is less than 0.
      if(enemy.x === gameEngine.player.x && (enemy.y + ENEMY_HEIGHT) > collisionY ) {
        
        //console.log("we're aligned!");
        //console.log(`${enemy.y+ENEMY_HEIGHT} and ${playerY}`);
        //console.log(enemy.y,playerY);
        //console.log("CRASSSH");

        //once that happens, set the indicator to true
        crash = true;
      }
    });

    //the global variable _crash_ is now set to true and the isPlayerDead function 
    //can now return a boolean, which will trigger the gameLoop method's end
    //condition that the player has died and will exit the gameloop.
    if(crash) {
      return true;
    } else {
      return false;
    }
    //return false;
  };
}
