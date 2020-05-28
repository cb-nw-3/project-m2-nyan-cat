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

    this.lives = 2;

    this.deadEnemies = [];

    this.score = 0;

    this.highScore = 0;

    this.loop = 0;

    this.level = 0;

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
    scoreDOM.innerText = `${this.score}`
    highScoreDOM.innerText = `${this.highScore}` 
    lifeCounterDOM.innerText = `${this.lives}`
    console.log('start level', this.level)
    levelCounter.innerText = `${this.level + 1}`

    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      // enemy.speed += this.speedModifier
      enemy.update(timeDiff);
    });

    this.enemies.forEach((enemy) => {
      if (enemy.destroyed === true) {
        this.deadEnemies.push(enemy);
        this.score = this.deadEnemies.length;
        this.level = Math.floor(this.score/15)
        scoreDOM.innerText = `${this.score}`
      }
    });


    if(this.score % 50  === 0  && this.score != 0 && this.loop < 1)
      {
      this.lives += 1;
      oneUP.play()
      }
    if(this.score % 50  === 0){
      this.loop = 1;
    }else{
      this.loop = 0;
    }
    
    console.log("thisLevel", this.level)
    

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
      this.gameOver();

      let handleClick = () => {
        scoreDOM.innerText = `${this.score}`
        levelCounter.innerText = `${this.level + 1}`
        this.enemies.forEach((item) => {
          item.destroyed = true;
          item.y = 500;
          item.update(timeDiff);
          this.enemies = this.enemies.filter((enemy) => {
            return !enemy.destroyed;
          });
        });
        dialogueBox.setAttribute("style", "display:none;");
        if (this.lives !== 0) {
          setTimeout(() => {
            this.gameLoop();
          }, 20);
        }

        button.removeEventListener("click", handleClick);
      };

      button.addEventListener("click", handleClick);
      reset.addEventListener("click", () => {
        location.reload();
      });
    } else {
      setTimeout(() => {
        this.gameLoop();
      }, 20);
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    let BodyOfCat = (ENEMY_HEIGHT / 4) * 3; //this will be used to seperate the cat into 4 parts.
    //we are adding it to item.y in order to set the top limit of our collision system to the first fourth of the cat.
    //that way the player isn't penalized for changing position onto the rainbow of the cat.
    let isThereCollisionArray = this.enemies.map((item) => {
      if (
        item.y + BodyOfCat < 436 + PLAYER_HEIGHT &&
        item.y + ENEMY_HEIGHT > 436 &&
        item.x === this.player.x
      ) {
        return true;
      }
    });
    if (isThereCollisionArray.includes(true)) {
      return true;
    }
  };

  gameOver = () => {
    boom.play()
    this.lives -= 1;
    this.level = 0;
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
    this.score = 0;
    this.deadEnemies = [];
    
    highScoreDOM.innerText = `${this.highScore}`
    lifeCounterDOM.innerText = `${this.lives}`
    


    if (this.lives > 1) {
      dialogueBox.setAttribute("style", "display:flex;");
      title.innerText = "CONTINUE ?";
      livesDOM.innerText = `You have ${this.lives} lives left`;
    }
    if(this.lives === 1){
      dialogueBox.setAttribute("style", "display:flex;");
      title.innerText = "CONTINUE ?";
      livesDOM.innerText = `BE CAREFUL, you have ${this.lives} life left`;
    }
    if (this.lives === 0) {
      dialogueBox.setAttribute("style", "display:flex;");
      title.innerText = "GAME OVER";
      livesDOM.innerText = `You have ${this.lives} lives left`;
      button.setAttribute("style", "display:none;");
    }
  };
}

let dialogueBox = document.querySelector("#continue");
let title = document.querySelector("#title");
let livesDOM = document.querySelector("#lives");
let button = document.querySelector("#continueButton");
let reset = document.querySelector("#restartButton");
let scoreDOM = document.querySelector("#score");
let highScoreDOM = document.querySelector("#highScore");
let lifeCounterDOM = document.querySelector('#lifeCounter');
let levelCounter = document.querySelector('#levelCounter');
const oneUP = new Audio('1up.mp3');
const boom = new Audio('boom.mp3')
const jump = new Audio('jump.mp3')