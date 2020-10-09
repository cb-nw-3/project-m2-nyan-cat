class Projectile {
  constructor(root, playerY, playerX, speed) {
    // parent to append
    this.root = root;
    // initial X position
    this.x = playerX + (PLAYER_WIDTH - 7) / 2;
    // initial Y position
    this.y = playerY;
    // speed of projectile
    this.speed = speed
    // status
    this.destroyed = false;
    // creation of projectile
    this.domElement = document.createElement('div');
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${this.y}px`;
    this.domElement.style.width = '7px';
    this.domElement.style.height = '7px';
    this.domElement.style.zIndex = '200';
    this.domElement.style.background = 'red';
    root.appendChild(this.domElement);
  }

  update(timeDiff, condition) {
    // update the y position
    this.y = this.y - timeDiff * this.speed;
    // update the parameter
    this.domElement.style.top = `${this.y}px`;
    // check if condition is true or out of game board
    if (this.y < 0 || condition) {
      // remove element from html
      this.root.removeChild(this.domElement);
      // reinitialize bullet
      gameEngine.bullet = [];
      // change status
      this.destroyed = true;
    }
  }
}
