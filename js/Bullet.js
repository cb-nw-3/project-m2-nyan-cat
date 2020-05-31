class Bullet {
  constructor(theRoot, xPos) {
    this.x = xPos;
    this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;
    this.domElement = document.createElement("span");
    this.domElement.style.position = "absolute";
    this.domElement.style.width = "3px";
    this.domElement.style.height = "3px";
    this.domElement.style.backgroundColor = "blue";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.zIndex = 10;

    theRoot.appendChild(this.domElement);
    this.speed = Math.random() / 3;
  }
  update(timeDiff) {
    // We update the y property of the instance in proportion of the amount of time
    // since the last call to update. We also update the top css property so that the image
    // is updated on screen
    this.y = this.y - timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;

    // If the y position of the DOM element is greater than the GAME_HEIGHT then the enemy is at the bottom
    // of the screen and should be removed. We remove the DOM element from the root DOM element and we set
    // the destroyed property to indicate that the enemy should no longer be in play
    if (this.y <= 0) {
      this.root.removeChild(this.domElement);

      //   this.destroyed = true;
    }
  }
}
