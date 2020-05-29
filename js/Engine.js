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
    // Powerups
    this.powerups = [];
    // We add the background image to the game
    addBackground(this.root);
    // Score Tracker
    this.score = 0;
    this.scoreInterval = undefined;

    // Audios
    this.mainAudio = undefined;
    this.oneDownAudio = undefined;
    this.starAudio = undefined;
    this.oneUpAudio = undefined;
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // Initialize player life display
    let lifeCountDisplay = document.querySelector(".life-count");
    lifeCountDisplay.innerHTML = "X " + this.player.lives;

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

    this.powerups.forEach((powerup) => {
      powerup.update(timeDiff);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    this.powerups = this.powerups.filter((powerup) => {
      return !powerup.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    let powerUpChance = Math.random();
    if (powerUpChance > 0.999) {
      while (this.powerups.length < 1) {
        const spot = nextEnemySpot(this.enemies);
        this.powerups.push(new PowerUp(this.root, spot));
      }
    }

    this.isPoweredUp();

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      // Persist the high score in local storage
      if (this.scoreInterval) {
        clearInterval(this.scoreInterval);
        let highscore = localStorage.getItem("highScore");
        if (!highscore) {
          localStorage.setItem("highScore", this.score);
        } else {
          if (parseInt(highscore) < this.score) {
            localStorage.setItem("highScore", this.score);
          }
        }
      }

      // Play Game Over sound
      this.mainAudio.pause();
      let gameOverAudio = new Audio("../sounds/gameover.mp3");
      gameOverAudio.play();
      return;
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  // Initializes the score counter
  startScoreCounter() {
    this.scoreInterval = setInterval(() => {
      let highScoreDisplay = document.querySelector(".high-score");
      let highScore = localStorage.getItem("highScore");
      highScoreDisplay.innerHTML = highScore
        ? "High Score: " + highScore
        : "High Score: " + 0;
      let scoreDisplay = document.querySelector(".your-score");
      scoreDisplay.innerHTML = "Your Score: " + this.score;
      this.score++;
    }, 500);
  }

  // bacground Music
  playBackgroundMusic() {
    this.mainAudio = new Audio("../sounds/mariotheme.mp3");
    this.mainAudio.play();
    this.mainAudio.loop = true;
  }

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    // Find the enemy that hits the player
    let enemyHit = this.enemies.find(
      (enemy) =>
        enemy.y + ENEMY_HEIGHT + 50 >= GAME_HEIGHT - PLAYER_HEIGHT &&
        enemy.y < GAME_HEIGHT - ENEMY_HEIGHT + 60 &&
        enemy.x === this.player.x
    );

    if (enemyHit) {
      // Remove the enemy from display after hitting the player
      enemyHit.destroyEnemy();
      // Remove the enemy that hits the player from the enemies array
      this.enemies.splice(
        this.enemies.findIndex((enemy) => enemy.spot === enemyHit.spot),
        1
      );
      if (this.player.invulnerable) {
        let bonusScore = document.createElement("span");
        bonusScore.innerHTML = "+50";
        bonusScore.style.position = "absolute";
        bonusScore.style.left = `${enemyHit.x}px`;
        bonusScore.style.top = `${enemyHit.y}px`;
        bonusScore.style.color = "white";
        bonusScore.style.zIndex = 5;
        this.root.appendChild(bonusScore);
        this.score += 50;
        setTimeout(() => {
          this.root.removeChild(bonusScore);
        }, 1000);
      } else {
        this.mainAudio.pause();
        this.oneDownAudio = new Audio("../sounds/onedown.mp3");
        this.oneDownAudio.play();
        // Reduce the player lives by 1
        this.player.updatePlayerLife("desc");
        // If gameover stop the main background music
        setTimeout(() => {
          if (
            this.player.lives > 0 &&
            this.oneDownAudio.paused &&
            !this.player.invulnerable
          ) {
            this.mainAudio.play();
          }
        }, 3000);
      }

      // Check if player life reaches 0, game over if it does
      if (this.player.lives === 0) {
        let gameOver = document.querySelector(".game-over-container");
        gameOver.style.display = "block";
        return true;
      }
    }
    return false;
  };

  isPoweredUp() {
    let powerUpHit = this.powerups.find(
      (powerup) =>
        powerup.y + POWERUP_HEIGHT + 50 >= GAME_HEIGHT - PLAYER_HEIGHT &&
        powerup.y < GAME_HEIGHT - POWERUP_HEIGHT + 60 &&
        powerup.x === this.player.x
    );

    if (powerUpHit) {
      // Remove the powerup from display after hitting the player
      powerUpHit.destroy();
      // Remove the powerup that hits the player from the powerups array
      this.powerups.splice(
        this.powerups.findIndex((powerup) => powerup.spot === powerUpHit.spot),
        1
      );
      // Determine which powerup is obtained
      switch (powerUpHit.type) {
        case "star": {
          this.mainAudio.pause();
          if (!this.starAudio) {
            this.starAudio = new Audio("../sounds/star.mp3");
          }
          this.starAudio.play();
          this.player.invulnerable = true;
          this.player.domElement.src = "images/mariostar.png";
          setTimeout(() => {
            this.mainAudio.play();
            this.player.invulnerable = false;
            this.player.domElement.src = "images/mario3.png";
          }, 10000);
          break;
        }
        case "1up": {
          if (!this.oneUpAudio) {
            this.oneUpAudio = new Audio("../sounds/1up.mp3");
          }
          this.oneUpAudio.play();
          this.player.updatePlayerLife("asc");
          break;
        }
      }
    }
  }
}
