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

    this.lastFrame = undefined;
    //Added sound effect during game play
    this.gameSound = document.createElement("audio");
    this.gameSound.src = "./sounds/Funk_in_your_face_Introloop.mp3";
    this.gameSound.setAttribute("preload", "auto");
    this.gameSound.setAttribute("controls", "none");
    this.gameSound.setAttribute("allow", "autoplay");
    this.gameSound.style.display = "none";
    this.gameSound.volume = 0.1;

    // We add the background image to the game
    addBackground(this.root);
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    //Game sound effect
    this.gameSound.play();

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
      // Show game over gifs
      this.bodyRoot = document.getElementById("gameOver");
      this.domElement = document.createElement("img");

      // Create new game over gif
      this.domElement.src = "https://art.pixilart.com/8d49c08afc8229f.gif";
      this.domElement.style.position = "absolute";
      this.domElement.style.width = GAME_WIDTH + "px";
      this.domElement.style.height = GAME_HEIGHT + "px";
      this.domElement.style.zIndex = 1000000;

      this.bodyRoot.appendChild(this.domElement);
      return;
    }

    if (WIN_GAME === true) {
      // Show game win gif
      let bodyRoot = document.getElementById("gameWin");
      let domWinElement = document.createElement("img");

      // Create new game over gif
      domWinElement.src =
        "https://media2.giphy.com/media/be2QjtfV90e0o/source.gif";
      domWinElement.style.position = "absolute";
      domWinElement.style.width = GAME_WIDTH + "px";
      domWinElement.style.height = GAME_HEIGHT + "px";
      domWinElement.style.zIndex = 1000000;

      bodyRoot.appendChild(domWinElement);
      return;
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.

  //Added gameOver sound effect when player dies
  isPlayerDead = () => {
    for (let index = 0; index < this.enemies.length; index++) {
      if (
        this.enemies[index].x === this.player.x &&
        this.enemies[index].y + ENEMY_HEIGHT - 50 >= this.player.y &&
        this.enemies[index].y <= this.player.y
      ) {
        let soundGameOver = document.getElementById("myGameOverAudio");
        soundGameOver.play();

        return true;
      }
    }
    return false;
  };
}
