class Hamburger {
  constructor(theRoot, enemySpot, speed, name) {
    this.name = name;
    this.root = theRoot;
    this.spot = enemySpot;
    this.x = enemySpot * ENEMY_WIDTH;
    this.y = -PLAYER_HEIGHT;
    this.destroyed = false;
    this.domElement = document.createElement('img');
    this.domElement.src = './images/player.png';
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.zIndex = 5;
    theRoot.appendChild(this.domElement);
    this.speed = speed;
  }
  update(timeDiff) {
    this.y = this.y + timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;

    if (this.y > GAME_HEIGHT) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
    }
  }
}
