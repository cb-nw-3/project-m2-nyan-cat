class Player {
  constructor(root) {
    this.x = 2 * PLAYER_WIDTH;
    this.position = 2;

    const y = GAME_HEIGHT - PLAYER_HEIGHT;

    this.domElement = document.createElement("img");
    this.domElement.src = "images/rocket.png";
    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${y + 20}px`;
    this.domElement.style.zIndex = "10";
    this.domElement.style.width = "70px";
    root.appendChild(this.domElement);
  }

  moveLeft() {
    if (this.x > 0) {
      this.position--;
      this.x = this.x - PLAYER_WIDTH;
    }

    this.domElement.style.left = `${this.x}px`;
  }

  moveRight() {
    if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
      this.position++;
      this.x = this.x + PLAYER_WIDTH;
    }
    this.domElement.style.left = `${this.x}px`;
  }
}
