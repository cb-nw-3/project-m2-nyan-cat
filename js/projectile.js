class Projectile {
  constructor(root) {
    this.root = root;
    
    this.x = Player.x + (PLAYER_WIDTH / 2 - 7);

    this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;

    this.destroyed = false;

    this.domElement = document.createElement('div');
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${this.y}px`;
    this.domElement.style.width = '7px';
    this.domElement.style.height = '7px';
    this.domElement.style.zIndex = '200';
    root.appendChild(this.domElement);
  }

  update(timeDiff, condition) {
    this.y = this.y - timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;

    if (this.y < 0 || condition) {
      this.root.removeChild(this.domElement);

      this.destroyed = true;
    }
  }
}
