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

    this.points = 0;
    this.score = document.querySelector('#score');

    //Sound
    this.sound = document.createElement('audio');
    this.sound.src = './sound/bensound-brazilsamba.mp3';
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.volume = 0.1;

    //Waiting few seconds after lost a live
    this.waiting = false;
    
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
      enemy.update(timeDiff, this.points / 600);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    if (this.points < 100){
    while (this.enemies.length < (MAX_ENEMIES - 2)) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
      this.points += 10;
      this.score.innerText = `Score: ${this.points}`;
      this.sound.play();
      }
    } else if (this.points >= 100 && this.points < 300){ 
      while (this.enemies.length < (MAX_ENEMIES - 1)) {
        // We find the next available spot and, using this spot, we create an enemy.
        // We add this enemy to the enemies array
        const spot = nextEnemySpot(this.enemies);
        this.enemies.push(new Enemy(this.root, spot));
        this.points += 10;
        this.score.innerText = `Score: ${this.points}`;
        }
    } else {
      while (this.enemies.length < (MAX_ENEMIES)) {
        // We find the next available spot and, using this spot, we create an enemy.
        // We add this enemy to the enemies array
        const spot = nextEnemySpot(this.enemies);
        this.enemies.push(new Enemy(this.root, spot));
        this.points += 10;
        this.score.innerText = `Score: ${this.points}`;
        }
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
          this.message = document.querySelector('#message');
          this.message.innerText = score.innerText;

          this.restartMessage = document.querySelector('h3');
          this.restartMessage.innerText = "Game Over!"
          
          this.boxMessage = document.querySelector('.box-message');
          this.boxMessage.style.visibility = 'visible';

          this.restart = document.querySelector('#restart');
          this.restart.addEventListener('click', () => {
            //Player
            Player.x = 3 * PLAYER_WIDTH;
            Player.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;

            //Score
            this.points = 0;

            //Enemies
            gameEngine.enemies.forEach((enemy) => {
              enemy.root.removeChild(enemy.domElement);
            });
            gameEngine.enemies = [];

            
          boxStartGame();
      });

          this.sound.pause();
      return;
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    let isDead = false;
    if (this.waiting) {
      return false
    };
    let live = document.querySelector(".live");
    let parent = live && live.parentNode;

    this.enemies.forEach((enemy) => {
      if (enemy.x === this.player.x && (enemy.y + 100) >= this.player.y && live){
        parent.removeChild(live);

        enemy.destroyed = true;
        enemy.root.removeChild(enemy.domElement);

        this.waiting = true;
        setTimeout(() => this.waiting = false, 600);
      } else if (enemy.x === this.player.x && (enemy.y + 100) >= this.player.y && (enemy.y) <= this.player.y) {
        isDead = true;
      }
    });
    return isDead
  };
}