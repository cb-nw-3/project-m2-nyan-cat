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
    // Speed Incrementor
    this.speedIncrementor = 0.25;
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

    // update each opwer ups position
    this.powerups.forEach((powerup) => {
      powerup.update(timeDiff);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    // remove destryoed powerups from array
    this.powerups = this.powerups.filter((powerup) => {
      return !powerup.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies, this.powerups);
      this.enemies.push(new Enemy(this.root, spot, this.speedIncrementor));
    }

    // A random number will represent the chance of dropping a powerup
    let powerUpChance = Math.random();
    if (powerUpChance > 0.997) {
      // Drop only one powerup at a time
      while (this.powerups.length < 1) {
        // determine drop spot of powerup
        const spot = nextEnemySpot(this.enemies, this.powerups);
        // check what kind of powerup is created
        // I dont want a star to drop while player is already affected by a star
        let pow = new PowerUp(this.root, spot);
        if (pow.type === "star" && this.player.invulnerable) {
          // do nothing
          // do not drop another star while player is already affected by a star
          break;
        } else {
          this.powerups.push(pow);
        }
      }
    }

    // Check if the player is poweredup
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
    // variable to track level
    let levelTracker = 0;
    // set interval to increase the score, update the level tracker by each interval
    // enemy speed will increase by .05 every 15 seconds
    this.scoreInterval = setInterval(() => {
      // get the elements for the score to update
      // on first load of the game on the browser, highscore will not exist
      // in local storage, set high score to 0 in this case
      let highScoreDisplay = document.querySelector(".high-score");
      let highScore = localStorage.getItem("highScore");
      highScoreDisplay.innerHTML = highScore
        ? "High Score: " + highScore
        : "High Score: " + 0;
      let scoreDisplay = document.querySelector(".your-score");
      scoreDisplay.innerHTML = "Your Score: " + this.score;
      this.score++;
      levelTracker++;
      // Setinterval is called every .5 second so levelTracker / 30 = 15 seconds
      if (levelTracker > 29 && levelTracker % 30 === 0) {
        this.speedIncrementor += 0.05;
        let levelDisplay = document.querySelector(".level-number");
        levelDisplay.innerHTML = "Level " + (levelTracker / 30 + 1);
        let levelContainer = document.querySelector(".level-container");
        levelContainer.style.display = "block";
        // Briefly show the level on the screen
        setTimeout(() => {
          levelContainer.style.display = "none";
        }, 1500);
      }
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
        if (!this.oneDownAudio) {
          this.oneDownAudio = new Audio("../sounds/onedown.mp3");
        }
        // Reduce the player lives by 1
        this.player.updatePlayerLife("desc");
        // Check lives so sounds dont overlap
        if (this.player.lives > 0) {
          this.mainAudio.pause();
          // load before playing onedownaudio to avoid overlapping sound
          // can hit 2 enemies consecutively
          this.oneDownAudio.load();
          this.oneDownAudio.play();
        }
        // Play back mainaudio after onedown audio
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
    // Check collision with a powerup
    let powerUpHit = this.powerups.find(
      (powerup) =>
        powerup.y + POWERUP_HEIGHT + 50 >= GAME_HEIGHT - PLAYER_HEIGHT &&
        powerup.y < GAME_HEIGHT - POWERUP_HEIGHT + 60 &&
        powerup.x === this.player.x
    );
    // If powerup is defined, it means powerup is hit
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
          // Pause main audio and start playing star audio
          // Set player.invulnerable to true
          this.mainAudio.pause();
          if (!this.starAudio) {
            this.starAudio = new Audio("../sounds/star.mp3");
          }
          this.starAudio.play();
          this.player.invulnerable = true;

          // setintervals to switch the image repeatedly to create a star effect
          let starInterval = setInterval(() => {
            if (this.player.domElement.src.includes("images/mario3.png")) {
              this.player.domElement.src = "images/starmario.png";
            } else {
              this.player.domElement.src = "images/mario3.png";
            }
          }, 100);

          // star effect lasts 10 seconds, after 10 seconds return the game to normal state
          setTimeout(() => {
            this.mainAudio.play();
            this.player.invulnerable = false;
            this.player.domElement.src = "images/mario3.png";
            clearInterval(starInterval);
          }, 10000);
          break;
        }
        case "1up": {
          // if 1up is hit, play 1up audio and update player's life count
          if (!this.oneUpAudio) {
            this.oneUpAudio = new Audio("../sounds/1up.mp3");
          }
          this.oneUpAudio.load();
          this.oneUpAudio.play();
          this.player.updatePlayerLife("asc");
          break;
        }
      }
    }
  }
}
