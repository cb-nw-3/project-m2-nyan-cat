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

    this.timesDead = 0;
    // We add the background image to the game
    addBackground(this.root);

    // Rendering lives
    this.life1 = document.createElement("img");
    this.life1.setAttribute("src", "../images/heart.png");
    this.life1.style.width = "40px";
    this.life1.style.height = "40px";
    this.life1.style.zIndex = "999";
    this.life1.style.position = "absolute";
    this.life1.style.top = "20px";
    this.life1.style.left = "20px";

    this.life2 = document.createElement("img");
    this.life2.setAttribute("src", "../images/heart.png");
    this.life2.style.width = "40px";
    this.life2.style.height = "40px";
    this.life2.style.zIndex = "999";
    this.life2.style.position = "absolute";
    this.life2.style.top = "20px";
    this.life2.style.left = "50px";

    this.life3 = document.createElement("img");
    this.life3.setAttribute("src", "../images/heart.png");
    this.life3.style.width = "40px";
    this.life3.style.height = "40px";
    this.life3.style.zIndex = "999";
    this.life3.style.position = "absolute";
    this.life3.style.top = "20px";
    this.life3.style.left = "80px";

    this.root.appendChild(this.life1);
    this.root.appendChild(this.life2);
    this.root.appendChild(this.life3);
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
      // Rendering the score
      scoreTally.innerText = `${score}`;
      scoreTally.style.position = "absolute";
      scoreTally.style.left = "320px";
      scoreTally.style.top = "25px";
      scoreTally.style.color = "orange";
      scoreTally.style.fontFamily = "sans-serif";
      scoreTally.style.fontSize = "24px";
      scoreTally.style.zIndex = "999";
      this.root.appendChild(scoreTally);
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      this.timesDead++;
      // window.alert("Game over");
      if (this.timesDead === 1) {
        this.root.removeChild(this.life3);
        this.gameLoop();
      } else if (this.timesDead === 2) {
        this.root.removeChild(this.life2);
        this.gameLoop();
      } else if (this.timesDead === 3) {
        this.root.removeChild(this.life1);
        // window.alert("Game over");
      }
      return;
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    let dead = false;
    this.enemies.forEach((enemy, index) => {
      if (
        enemy.y >= GAME_HEIGHT - PLAYER_HEIGHT * 2 &&
        enemy.spot === this.player.position
      ) {
        this.enemies.splice(index, 1);
        dead = true;
        this.root.removeChild(enemy.domElement);
      }
    });
    return dead;
  };
}
