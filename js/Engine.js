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

    this.wait = false;
    this.oldTime = null;
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];

    this.grunt = new Audio("./audio/laugh.mp3");
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
    this.updateScore();

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
      const message = document.createElement("div");
      const textNode = document.createTextNode(
        `You have been reduced to a pile of ash`
      );
      const button = document.createElement("button");

      message.classList.add("message");
      button.innerText = "Restart";
      message.appendChild(textNode);
      message.appendChild(button);
      message.style.display = "flex";
      message.style.justifyContent = "center";
      message.style.alignItems = "center";
      message.style.flexDirection = "column";
      message.style.zIndex = "20";

      document.getElementById("app").appendChild(message);

      button.addEventListener("click", restartGame);
      return;
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  loseHeart() {
    this.player.lives -= 1;
    const heart = document.getElementById(`${this.player.lives}`);
    const character = document.getElementById("nero");
    heart.classList.add("animate");
    character.classList.add("animate");
    this.grunt.play();
    setTimeout(() => {
      heart.classList.remove("animate");
      character.classList.remove("animate");
      this.root.removeChild(heart);
    }, 1500);
  }

  updateScore() {
    let score = document.getElementById("score");
    score.innerText = SCORE;
  }

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    let dead = false;
    let currentTime = new Date().getTime();

    if (this.wait && currentTime - this.oldTime > 2200) {
      this.wait = false;
    }
    if (this.wait !== true) {
      this.enemies.forEach((enemy) => {
        if (
          enemy.x === this.player.x &&
          enemy.y + ENEMY_HEIGHT >= GAME_HEIGHT - PLAYER_HEIGHT - 10
        ) {
          this.loseHeart();
          this.wait = true;
          this.oldTime = new Date().getTime();
          if (this.player.lives === 0) {
            audio.pause();
            dead = true;
          }
        }
      });
    }
    return dead;
  };
}

function restartGame() {
  location.reload();
}
