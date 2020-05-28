class Projectile {
  constructor(root, playerY, playerX, speed) {
    this.root = root;
    
    this.x = playerX + (PLAYER_WIDTH - 7) / 2;

    this.y = playerY;

    this.speed = speed

    this.destroyed = false;

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
    this.y = this.y - timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;

    if (this.y < 0 || condition) {
      this.root.removeChild(this.domElement);
      gameEngine.bullet = [];
      this.destroyed = true;
    }
  }
}
