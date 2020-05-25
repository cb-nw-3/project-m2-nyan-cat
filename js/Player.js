// There will only be one instance of this class. This instance will contain the
// data and methods related to the burger that moves at the bottom of your screen

class Player {
  // The constructor takes one parameter. This parameter refers to the parent DOM node.
  // We will be adding a DOM element to this parent DOM node.
  constructor(root) {
    // The x position starts off in the middle of the screen. Since this data is needed every time we move the player, we
    // store the data in a property of the instance. It represents the distance from the left margin of the browsing area to
    // the leftmost x position of the image.
    this.showlife;
    this.lifes = 3;
    this.x = 2 * PLAYER_WIDTH;
    const y = GAME_HEIGHT - PLAYER_HEIGHT - 10;
    this.y = y;
    // The y position never changes, so we don't need to store it in a property. It represents the y position of the top of the
    // hamburger. The y position is the distance from the top margin of the browsing area.

    // We create a DOM node. We will be updating the DOM node every time we move the player, so we store a reference to the
    // DOM node in a property.
    this.domElement = [
      document.createElement("img"),
      document.createElement("img"),
      document.createElement("img"),
      document.createElement("img"),
    ];
    this.domElement[0].src = "images/player.png";
    this.domElement[0].style.position = "absolute";
    this.domElement[0].style.left = `${this.x}px`;
    this.domElement[0].style.top = ` ${y}px`;
    this.domElement[0].style.zIndex = "10";
    root.appendChild(this.domElement[0]);
    this.domElement[1].src = "images/lifes.png";
    this.domElement[1].style.position = "absolute";
    this.domElement[1].style.left = `${GAME_WIDTH - 250}px`;
    this.domElement[1].style.width = "60px";
    this.domElement[1].style.top = "20px";
    this.domElement[1].style.zIndex = "5000";
    root.appendChild(this.domElement[1]);
    this.domElement[2].src = "images/lifes.png";
    this.domElement[2].style.position = "absolute";
    this.domElement[2].style.left = `${GAME_WIDTH - 180}px`;
    this.domElement[2].style.width = "60px";
    this.domElement[2].style.top = "20px";
    this.domElement[2].style.zIndex = "5000";
    root.appendChild(this.domElement[2]);
    this.domElement[3].src = "images/lifes.png";
    this.domElement[3].style.position = "absolute";
    this.domElement[3].style.left = `${GAME_WIDTH - 110}px`;
    this.domElement[3].style.width = "60px";
    this.domElement[3].style.top = "20px";
    this.domElement[3].style.zIndex = "5000";
    root.appendChild(this.domElement[3]);
    // this.domElement[4].src = "images/lifes.png";
    // this.domElement[4].style.position = "absolute";
    // this.domElement[4].style.left = `${GAME_WIDTH - 110}px`;
    // this.domElement[4].style.width = "60px";
    // this.domElement[4].style.top = "20px";
    // this.domElement[4].style.zIndex = "5000";
  }

  // This method will be called when the user presses the left key. See in Engine.js
  // how we relate the key presses to this method
  moveLeft() {
    if (this.x > 0 && !noMovement) {
      this.x = this.x - PLAYER_WIDTH;
    }

    this.domElement[0].style.left = `${this.x}px`;
  }

  // We do the same thing for the right key. See Engine.js to see when this happens.
  moveRight() {
    if (this.x + PLAYER_WIDTH < GAME_WIDTH && !noMovement) {
      this.x = this.x + PLAYER_WIDTH;
    }
    this.domElement[0].style.left = `${this.x}px`;
  }

  lessLife() {
    if (this.lifes >= 0) {
      this.lifes--;
    }
    switch (this.lifes) {
      case 2:
        this.domElement[1].style.display = "none";
        break;
      case 1:
        this.domElement[2].style.display = "none";
        break;
      case 0:
        this.domElement[3].style.display = "none";
        break;
    }
  }
  playerY = () => this.y;
}
