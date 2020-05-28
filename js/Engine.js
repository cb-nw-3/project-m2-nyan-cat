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
    this.isPlayerDead = false;
    this.gameSound = new Audio(
      './sounds/gameSound.wav'
     );
     this.pacMan = new Audio(
      './sounds/pacMan.wav'
     );
     this.dead = new Audio(
      './sounds/dead.wav'
     )
    // We add the background image to the game
    addBackground(this.root);
  }
  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  playSound = () => {
    this.gameSound.play();
  };

  playPacMan = () =>{
    this.pacMan.play();
  };

  gameLoop = () => {
    
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
      
    }

    if(!this.fall){
      this.enemies.forEach((enemy) => {
        if(enemy.x < GAME_WIDTH){
          enemy.x = Math.random() * 100;
        }else{
          enemy.x= GAME_WIDTH;
        }
        
        console.log(enemy.y);
      })
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
    this.isPlayerDead = this.checkIfPlayerIsDead()
    if (this.isPlayerDead) {
      window.alert("Game over");
      return;
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.

  checkIfPlayerIsDead = () => {
    let dead = false;
    console.log(this.enemies)
    
    this.enemies.forEach((ele) => {
      console.log(
        ele.y > this.player.y &&
          ele.y < this.player.y + PLAYER_HEIGHT + 10 &&
          ele.x > this.player.x - PLAYER_WIDTH
      );
      const enemyBottom = ele.y + ENEMY_HEIGHT;
      const playerTop = this.player.y;
      const playerBottom = playerTop + PLAYER_HEIGHT;
      const enemyRight = ele.x + ENEMY_WIDTH;
      const playerRight = this.player.x + PLAYER_WIDTH;
      const playerLeft = this.player.x;
      const enemyLeft = ele.x;
      const enemyTop = ele.y

      if (
        enemyBottom > playerTop &&
        enemyTop < playerBottom &&
        enemyRight > playerLeft &&
        enemyLeft < playerRight
        
      ) {
        this.dead.play();
        let answer = window.confirm("Start New Game?");
        if (answer == true) {
          dead = false;
        } else {
          document.write("thank you for playing the game!");
          
          dead = true;
        }
      }
    });
    
    return dead;
    
  };
  
}


