// There will only be one instance of this class. This instance will contain the
// data and methods related to the burger that moves at the bottom of your screen
class Player {
  // The constructor takes one parameter. This parameter refers to the parent DOM node.
  // We will be adding a DOM element to this parent DOM node.
  constructor(root) {
    // The x position starts off in the middle of the screen. Since this data is needed every time we move the player, we
    // store the data in a property of the instance. It represents the distance from the left margin of the browsing area to
    // the leftmost x position of the image.
    this.x = 2 * PLAYER_WIDTH;

    //adding lives to the player and showing an icon for each
    this.lives = PLAYER_LIVES;
    this.livesArray = [];

    //I add an "isInvincible" property to make the player invincible for a little time after being hit (eventually powerups?)
    this.isInvincible = false;

    //adding a spot property, to have lane comparison between the enemies and player
    this.spot = 2;
    // add the score element to the player
    this.score = 0;
    this.scoreText = new Text(
      document.getElementById("app"),
      GAME_WIDTH - 125,
      0
    );

    // add the multiplier element under the score
    this.streak = 0;
    this.currentMultiplier = 1;
    this.currentMultiplierText = new Text(
      document.getElementById("app"),
      GAME_WIDTH - 125,
      30
    );

    // The y position never changes, so we don't need to store it in a property. It represents the y position of the top of the
    // hamburger. The y position is the distance from the top margin of the browsing area.
    const y = GAME_HEIGHT - PLAYER_HEIGHT - 10;

    // We create a DOM node. We will be updating the DOM node every time we move the player, so we store a reference to the
    // DOM node in a property.
    this.domElement = document.createElement("img");
    this.domElement.src = "images/player.png";
    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${y}px`;
    this.domElement.style.zIndex = "10";
    root.appendChild(this.domElement);
  }

  // This method will be called when the user presses the left key. See in Engine.js
  // how we relate the key presses to this method
  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - PLAYER_WIDTH;
    }

    this.domElement.style.left = `${this.x}px`;
    //changing the spot property every time the player moves
    this.spot -= 1;
    if (this.spot <= 0) {
      this.spot = 0;
    }
  }

  // We do the same thing for the right key. See Engine.js to see when this happens.
  moveRight() {
    if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
      this.x = this.x + PLAYER_WIDTH;
    }
    this.domElement.style.left = `${this.x}px`;
    //changing the spot property every time the player moves
    this.spot += 1;
    if (this.spot >= 4) {
      this.spot = 4;
    }
  }
  //this is called by the game engine when a enemy/player collision is detected
  loseLife = () => {
    this.lives--;
    this.livesArray[this.lives].remove();
    this.livesArray.pop();
    this.streak = 0;
    this.invincibilityFrames();
  };

  showLives = () => {
    for (let i = 0; i < PLAYER_LIVES; i++) {
      let newLifeIcon = document.createElement("img");
      newLifeIcon.src = "images/player.png";
      document.querySelector(".lives").appendChild(newLifeIcon);
      this.livesArray.push(newLifeIcon);
    }
  };

  updateScore = (points, scoreWipe) => {
    if (scoreWipe) {
      this.score = 0;
      this.scoreText.update(this.score);
      this.currentMultiplierText.update(`x${this.currentMultiplier}`);
    }
    this.score += points * this.currentMultiplier;
    this.scoreText.update(this.score);
  };

  scoreMultiplier = (reset) => {
    switch (reset) {
      case true:
        this.currentMultiplier = 1;
        this.streak = 0;
        this.currentMultiplierText.update(`x${this.currentMultiplier}`);
        break;
      default:
        this.streak++;
        if (this.streak % STREAK_TRESHOLD === 0) {
          this.currentMultiplier++;
          this.currentMultiplierText.update(`x${this.currentMultiplier}`);
        }
    }
    switch (this.currentMultiplier) {
      case 1:
        this.currentMultiplierText.domElement.style.color = "white";
        break;
      case 2:
        this.currentMultiplierText.domElement.style.color = "dodgerblue";
        break;
      case 3:
        this.currentMultiplierText.domElement.style.color = "palevioletred";
        break;
      default:
        this.currentMultiplierText.domElement.style.color = "gold";
    }
  };
  invincibilityFrames = () => {
    this.isInvincible = true;
    this.domElement.classList.add("player-flicker");
    setTimeout(() => {
      this.isInvincible = false;
      this.domElement.classList.remove("player-flicker");
    }, 500);
  };
}
