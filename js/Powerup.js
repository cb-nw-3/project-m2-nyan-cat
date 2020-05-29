class PowerUp {
  constructor(theRoot, powerUpSpot) {
    this.root = theRoot;
    this.spot = powerUpSpot;

    this.x = powerUpSpot * POWERUP_WIDTH;

    this.y = -POWERUP_HEIGHT;
    this.destroyed = false;

    this.domElement = document.createElement("img");
    let randomPowerup = Math.ceil(Math.random() * 2);
    switch (randomPowerup) {
      case 1: {
        this.domElement.src = "./images/star.png";
        this.type = "star";
        break;
      }
      case 2: {
        this.domElement.src = "./images/1up.png";
        this.type = "1up";
        break;
      }
    }
    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.zIndex = 5;

    // Show that the user can actually see the img DOM node, we append it to the root DOM node.
    theRoot.appendChild(this.domElement);
    this.speed = Math.random() / 2 + 0.25;
  }

  update(timeDiff) {
    this.y = this.y + timeDiff * this.speed + 0.5;
    this.domElement.style.top = `${this.y}px`;

    if (this.y > GAME_HEIGHT) {
      this.root.removeChild(this.domElement);

      this.destroyed = true;
    }
  }

  destroy() {
    this.root.removeChild(this.domElement);
    this.destroyed = true;
  }
}
