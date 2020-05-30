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
    this.livesCounter = 3;
    this.scoreCounter = 0;
    this.levelCounter = 1;
    addBackground(this.root);
    setupStats(this.root);
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array

  gameLoop = () => {
    let player = this.player;
    let root = this.root;
    let bullet = null;
    document.body.onkeyup = function (e) {
      if (e.keyCode == 32) {
        bullet = new Bullet(root, player.x);
        console.log("bullet: ", bullet);
      }
    };
    // console.log("bullet: ", bullet);
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
      clearInterval(gameStart);
      btnStart.style.display = "";
      btnStart.innerHTML = "Play Again";
      let gameOver = setInterval(function () {
        btnStart.style.visibility =
          btnStart.style.visibility == "hidden" ? "visible" : "hidden";
      }, 500);
      audio.pause();
      audio.currentTime = 0;
      audio = new Audio("./images/war.mp3");
      audio.play();
      clearTimeout(this.gameLoop);
      return;
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };
  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.

  isPlayerDead = () => {
    let playerHeight = this.player.domElement.style.top.substr(
      0,
      this.player.domElement.style.top.length - 2
    );
    let playerPositionXmax = this.player.x + PLAYER_WIDTH;
    let playerPositionXMin = this.player.x;
    this.enemies.forEach((enemy) => {
      if (
        enemy.y + ENEMY_HEIGHT >= playerHeight &&
        enemy.x >= playerPositionXMin &&
        enemy.x < playerPositionXmax
      ) {
        enemy.y = 501;
        this.livesCounter -= 1;
        let livesRemain = document.querySelector("#lives-remain");
        livesRemain.innerHTML = this.livesCounter;
      }
      if (enemy.y + ENEMY_HEIGHT > GAME_HEIGHT) {
        enemy.y = 501;
        let score = document.querySelector("#score");
        score.innerHTML = this.scoreCounter += 10;
        this.checkScore(this.scoreCounter);
      }
    });
    return this.livesDepleted(this.livesCounter);
  };
  livesDepleted = (livesRemaining) => {
    let isDead = false;
    if (livesRemaining === 0) {
      isDead = true;
    }
    return isDead;
  };
  checkScore = (totalScore) => {
    if (totalScore % 200 === 0 && GAME_WIDTH < window.screen.width) {
      this.livesCounter += 1;
      this.levelCounter += 1;
      MAX_ENEMIES += 1;
      GAME_WIDTH += PLAYER_WIDTH;
      bg.style.width = GAME_WIDTH + "px";
      let livesRemain = document.querySelector("#lives-remain");
      livesRemain.innerHTML = this.livesCounter;
      let levelValue = document.querySelector("#level-value");
      levelValue.innerHTML = this.levelCounter;
    }
  };
}
