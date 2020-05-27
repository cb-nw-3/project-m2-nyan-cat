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
    //console.log(this.player);
    //console.log(this.enemies);

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    if (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }
    //Game Difficulty increases here :)
    //LEVEL 1
    if (scoreCount === 35) {
      MAX_ENEMIES = 6;
    }
    if (scoreCount === 65) {
      MAX_ENEMIES = 7;
    }
    if (scoreCount === 90) {
      MAX_ENEMIES = 8;
    }
    if (scoreCount === 120) {
      MAX_ENEMIES = 9;
    }
    if (scoreCount === 135) {
      MAX_ENEMIES = 10;
    }
    if (scoreCount === 155) {
      MAX_ENEMIES = 6;
    }
    if (scoreCount === 165) {
      MAX_ENEMIES = 11;
    }
    if (scoreCount === 205) {
      MAX_ENEMIES = 0;
    }
    if (scoreCount === 207) {
      window.alert(`
      You did it! I hope you had a good time ;) 
      Music by Queen - Don't Stop Me Now
      If you want to keep playing, just press OK and it will keep going!
      Good luck on Level 2 >.<`);
      BG_MUSIC1.pause();
    }
    //LEVEL 2
    if (scoreCount === 210) {
      BG_MUSIC2.play();
      MAX_ENEMIES = 5;
    }
    if (scoreCount === 220) {
      MAX_ENEMIES = 8;
    }
    if (scoreCount === 250) {
      MAX_ENEMIES = 6;
    }
    if (scoreCount === 275) {
      MAX_ENEMIES = 10;
    }
    if (scoreCount === 300) {
      MAX_ENEMIES = 8;
    }
    if (scoreCount === 330) {
      MAX_ENEMIES = 11;
    }
    if (scoreCount === 350) {
      MAX_ENEMIES = 5;
    }
    if (scoreCount === 390) {
      MAX_ENEMIES = 10;
    }
    if (scoreCount === 400) {
      MAX_ENEMIES = 0;
    }
    if (scoreCount === 403) {
      window.alert(`
      Wow, you survived Level 2! 
      Music by Queen - I Want To Break Free
      Level 3 is waiting for you if this was too easy!
      Good luck!`);
      BG_MUSIC2.pause();
    }
    //LEVEL 3 (FINAL)
    if (scoreCount === 405) {
      BG_MUSIC3.play();
      MAX_ENEMIES = 3;
    }
    if (scoreCount === 420) {
      MAX_ENEMIES = 8;
    }
    if (scoreCount === 435) {
      MAX_ENEMIES = 5;
    }
    if (scoreCount === 453) {
      MAX_ENEMIES = 7;
    }
    if (scoreCount === 465) {
      MAX_ENEMIES = 10;
    }
    if (scoreCount === 500) {
      MAX_ENEMIES = 6;
    }
    if (scoreCount === 525) {
      MAX_ENEMIES = 7;
    }
    if (scoreCount === 533) {
      MAX_ENEMIES = 9;
    }
    if (scoreCount === 550) {
      MAX_ENEMIES = 11;
    }
    if (scoreCount === 565) {
      MAX_ENEMIES = 9;
    }
    if (scoreCount === 580) {
      MAX_ENEMIES = 11;
    }
    if (scoreCount === 605) {
      MAX_ENEMIES = 8;
    }
    if (scoreCount === 610) {
      MAX_ENEMIES = 3;
    }
    if (scoreCount === 613) {
      MAX_ENEMIES = 0;
    }
    if (scoreCount === 615) {
      window.alert(`
      You did it!!!
      Music by Post Malone - Circles
      What can I tell you, you got to the end!
      Congratulations, you've survived all those countless Katz
      Give yourself a pat on your shoulders, you deserve it!
      See you next time !(^_^)!`);
      BG_MUSIC3.pause();
    }
    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?) - because if not it keeps popping!
    if (this.isPlayerHurt()) {
      lifeCount = lifeCount - 1;
      LIFE.update(`${lifeCount} HP LEFT`);
    }
    if (this.isPlayerDead()) {
      GAME_OVER.play();
      window.alert(
        `Oh no! The Katz gots the Hamburgerz! You survived for ${scoreCount} seconds!`
      );
      location.reload();
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerHurt = () => {
    let isPlayerHit = false;

    this.enemies.forEach((enemy) => {
      const sameSpot = this.player.x === enemy.x;
      const enemyHeightGreater =
        enemy.y + ENEMY_HEIGHT >= GAME_HEIGHT - PLAYER_HEIGHT;
      const collision = sameSpot && enemyHeightGreater;
      if (collision) {
        isPlayerHit = true;
        loseLife(lifeCount);
        //location.reload();
      }
    });
    return isPlayerHit;
  };

  isPlayerDead = () => {
    let isPlayerHit = false;

    this.enemies.forEach((enemy) => {
      const sameSpot = this.player.x === enemy.x;
      const enemyHeightGreater =
        enemy.y + ENEMY_HEIGHT >= GAME_HEIGHT - PLAYER_HEIGHT;
      const collision = sameSpot && enemyHeightGreater && lifeCount === 0;
      if (collision) {
        isPlayerHit = true;
        BG_MUSIC.pause();
        //location.reload();
      }
    });
    return isPlayerHit;
  };
}
