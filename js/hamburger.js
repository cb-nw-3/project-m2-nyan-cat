class Hamburger {
  constructor(theRoot, enemySpot, speed, name) {
    // name to grab it later
    this.name = name;
    // parent to append
    this.root = theRoot;
    // position on board
    this.spot = enemySpot;
    // X value
    this.x = enemySpot * ENEMY_WIDTH;
    // initial Y value
    this.y = -PLAYER_HEIGHT;
    // enemy speed
    this.speed = speed;
    // status
    this.destroyed = false;
    // element creation
    this.domElement = document.createElement('img');
    this.domElement.src = './images/player.png';
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.zIndex = 5;
    theRoot.appendChild(this.domElement);
  }

  update(timeDiff, condition) {
    // update the Y position
    this.y = this.y + timeDiff * this.speed;
    // update parameter to make bonus burger move
    this.domElement.style.top = `${this.y}px`;
    // check if bonus burger is out of board of if condition is true
    if (this.y > GAME_HEIGHT || condition) {
      // remove from html
      this.root.removeChild(this.domElement);
      // change status
      this.destroyed = true;
    }
  }
}
