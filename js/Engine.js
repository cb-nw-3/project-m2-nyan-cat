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

    this.lives = [];

    this.isOneUpInSystem = false;

    this.livesIconsBottom = 0;

    //this.button1 =  document.createElement('button');
    
    this.button1 = new ResetButton(this.root, 0);



    // We add the background image to the game
    addBackground(this.root);

    this.messageText = new Text(this.root, (GAME_WIDTH-150), this.livesIconsBottom, true)
    this.messageText.update("Blank Text");
    this.messageText.domElement.style.opacity = '0.0';

    this.root.appendChild(this.messageText.domElement);


    this.gameOverText  = new Text(this.root, (20), GAME_HEIGHT*0.5-80, true, "80", 400, "red", "gameovertext")
    this.gameOverText.update("GAME OVER");
    this.gameOverText.domElement.style.visibility = "hidden";


    let newYpos = this.gameOverText.bottom;

    this.button1.internalButton.style.top = `${newYpos+20}px`;
    this.button1.internalButton.addEventListener('click', ()=> {this.resetGame()});

    this.root.appendChild(this.gameOverText.domElement);

    this.addResetButton()


    

    console.log(this)
    // let textGo2 = setTimeout( () => {
    //         this.root.removeChild(newText.domElement);
    //         clearTimeout(textGo2);
    //   }, 2000
    // );  


    
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array


  addResetButton = () => {


    // this.button1.innerText = "Click to Play Again!";
    // this.button1.style.backgroundColor = "hotPink";
    // this.button1.style.color = "white";

    // this.button1.style.position = 'absolute';
    // this.button1.style.left = `${GAME_WIDTH/2-75}px`;
    
    // let newYpos = this.gameOverText.bottom;

    // this.button1.style.top = `${newYpos+20}px`;
    // this.button1.style.font = `bold 20px Impact`;
    // this.button1.style.padding = '10px';
    // this.button1.style.borderRadius =  "9px";
    // this.button1.style.border =  "0px";

    // this.button1.style.zIndex = '40';
    // this.button1.id = 'helloDave';
    // this.button1.addEventListener('click', ()=> {this.resetGame()});
    // this.button1.style.visibility = 'hidden';
    // this.root.appendChild(this.button1);

    this.gameOverState = true;

  }

  

  addLives = () => {
    let i;

    
    for (i=0; i < LIVES_START; i++)
    {         
      this.lives.push(new Life(this.root, i));
    }
    this.livesIconsBottom = this.lives[0].bottom;

    this.messageText.domElement.style.top = this.lives[0].bottom;


  }


  resetGame = () =>  { 
     console.log("clickedddd");

    this.enemies.map( (enemyElement) =>
    {
      enemyElement.destroyed = true;
      this.root.removeChild(enemyElement.domElement)
    }
    );

    // this.lives.map( (lifeElement) =>
    // {
    //   this.root.removeChild(lifeElement.domElement)
    // }
    // );
    

    


    this.enemies = [];

    this.lives = [];

    this.isOneUpInSystem = false;

    this.livesIconsBottom = 0;
    
    this.player.flash();

    this.addLives();

    this.gameLoop();
    this.gameOverText.domElement.style.visibility = "hidden";
    this.button1.internalButton.style.visibility = 'hidden';

    this.player.gameStillOn = true;
  }




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
      console.log(this.enemies.length);
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      let new_enemy = new Enemy(this.root, spot);
      this.enemies.push(new_enemy);
      // console.log("made new enemy")
      // console.log(new_enemy);
    }

    if (this.lives.length === 1)
    {
      // I could do a search for "is the proto.contrustor name OneUp but that seems computationally expensive
      // to do instead of just making a simple Bool. Much simpler, but admiteddly not as cool. 
      if (this.isOneUpInSystem === false)
      {
        let free_spots = [ 1, 2, 3, 4, 5];
        console.log(free_spots);

        this.enemies.forEach(
          (enemy) =>
          {
            free_spots = free_spots.filter((element) => {return element !== enemy.spot});
          }

        );

        console.log(free_spots);

        if (free_spots.length > 0)
        {
          let oneUp = new OneUp(this.root, free_spots[0]);
          this.enemies.push(oneUp);
          this.isOneUpInSystem = true;
        }
      }
    }

    

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {

      this.messageText.domElement.style.opacity = '0.0';

      this.button1.internalButton.style.visibility = 'visible';

      this.gameOverText.domElement.style.visibility = "visible";


      this.player.gameStillOn = false;
     //window.alert('Game over');
      return;
    }
    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };



  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {

    let isDead = false;
    this.enemies.forEach(
      (enemyElement) =>
      {
           if (enemyElement.bottom > this.player.top && this.player.x === enemyElement.x)
            {
              if (enemyElement.isOneUp)
              {

                this.lives.push(new Life(this.root, this.lives.length));
                this.root.removeChild(enemyElement.domElement);
                enemyElement.destroyed = true;
                this.isOneUpInSystem = false;
                
                this.messageText.update("ONE UP!");
                this.messageText.domElement.style.opacity = '1.0';
            
                let textGo1Up = setTimeout( () => {
                  if (this.messageText.domElement.innerText === "ONE UP!")
                  {
                    this.messageText.domElement.style.opacity = '0.0';
                  }
                }, 2000);

              }

              else { 
                if (this.lives.length == 0) {
                  isDead = true
                }
                else {
                  var liveToBlast = this.lives.pop()
                  this.root.removeChild(liveToBlast.domElement);
                  this.root.removeChild(enemyElement.domElement);
                  enemyElement.destroyed = true;
                  this.player.flash();

                  console.log("array is --------");
                  console.log(this.lives.length);

                  if (this.lives.length === 0)
                  {
                    this.messageText.update("LAST LIFE!!!!");
                    this.messageText.domElement.style.opacity = '1.0';

                    // let newText = new Text(this.root, (GAME_WIDTH-150), this.livesIconsBottom, true)
                    // newText.update("LAST LIFE!!!!");
                    // this.root.appendChild(newText.domElement);
                
                    let lastLifeTimeout = setTimeout( () => {
                      if (this.messageText.domElement.innerText === "LAST LIFE!!!!")
                      {
                        this.messageText.domElement.style.opacity = '0.0';
                      }
                    }, 2000
                    );  
    
                  }

                }
              }

          }  
      }
    );


    // should loop over all the enemies, see if it intersects with the player.
    return isDead;
  };

 
}
