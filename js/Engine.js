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
    // initialize player score
    this.score = 0;
    // initialize bonus score
    this.bonusScore = 0;
    // bullet initialization
    this.bullet = [];
    // speed
    this.speed = 0;
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
    
    // update score property
    this.score += timeDiff
    // update innerText property
    score.update(this.score + this.bonusScore);

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

    // initialize the enemy speed
    let randomNumberToCallBonus;

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      randomNumberToCallBonus = Math.floor(Math.random() * 50);

      this.speed= (Math.random() / 2 + 0.15) + (Math.round(this.score / 10000) * 0.1);

      if (randomNumberToCallBonus === 17) {
        this.enemies.push(new Hamburger(this.root, spot, this.speed, 'Hamburger'));
      } else {
        // formula to increase speed during game every 10000 points
        this.enemies.push(new Enemy(this.root, spot, this.speed, 'Enemy'));
      }
    }

    if (this.bullet.length !== 0) {
      this.bullet[0].update(timeDiff);
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      window.alert(`Game Over\nScore: ${this.score}\nBonus: ${this.bonusScore}\nTotal: ${this.score + this.bonusScore}`);
      document.removeEventListener('keydown', keydownHandler);
      return;
    }
    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    let status = false;
    this.enemies.forEach(pos => {
      if (this.bullet.length === 1) {
              console.log(pos.x, this.bullet[0].x)

      }
      // game over when tip of cat is in hamburger area.
      // if the cat is out of game board but tail is still in 
      // doesn't count as death
      if (pos.name === 'Enemy') {
        if (
          pos.x === this.player.x && 
          pos.y > this.player.y - ENEMY_HEIGHT &&
          pos.y < this.player.y - (PLAYER_HEIGHT / 2) &&
          this.player.lives !== 1
        ) {
          this.player.lives--;
          pos.update(1, true);
          livesContainer.removeChild(livesContainer.lastElementChild);
          if (this.player.lives >= 4) {
            death4.play();
          } else if (this.player.lives === 3) {
            death5.play();
          } else if (this.player.lives === 2) {
            death3.play();
          } else if (this.player.lives === 1) {
            death2.play();
          }
        } else if (
          pos.x === this.player.x && 
          pos.y > this.player.y - ENEMY_HEIGHT &&
          pos.y < this.player.y - (PLAYER_HEIGHT / 2)
        ) {
          death1.play();
          backgroundSound.pause();
          status = true
        } else if (
          this.bullet.length === 1 && 
          pos.x === this.bullet[0].x - (PLAYER_WIDTH - 7) / 2 &&
          pos.y > this.bullet[0].y - ENEMY_HEIGHT - 11 &&
          pos.y < this.bullet[0].y - ENEMY_HEIGHT + 50
        ) {
          pos.update(1, true);
          this.bullet[0].update(1, true);
          explosion.play();
        }
      } else if (pos.name === 'Hamburger') {
        if (
          pos.x === this.player.x && 
          pos.y > this.player.y - PLAYER_HEIGHT &&
          pos.y < this.player.y
        ) {
          this.bonusScore += 2500;
          this.player.lives++;
          pos.update(1, true);
          addLive();
          eatingNoise.play();
        } else if (
          this.bullet.length === 1 && 
          pos.x === this.bullet[0].x - (PLAYER_WIDTH - 7) / 2 &&
          pos.y > this.bullet[0].y - PLAYER_HEIGHT - 11 &&
          pos.y < this.bullet[0].y - PLAYER_HEIGHT + 50
        ) {
          pos.update(1, true);
          this.bullet[0].update(1, true);
        }
      }
    })
    return status;
  };
  // PROJECTILE TO BE COMPLETED
  isBulletShoot = () => {
    
  }
}
