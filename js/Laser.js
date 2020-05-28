class Laser {
  constructor(root, position) {
    this.position = position;
    this.root = root;
    this.x = position * PLAYER_WIDTH + PLAYER_WIDTH / 2;
    this.y = GAME_HEIGHT - PLAYER_HEIGHT;
    this.destroyed = false;

    this.laserBeam = document.createElement("div");
    this.laserBeam.style.width = "4px";
    this.laserBeam.style.height = "8px";
    this.laserBeam.style.backgroundColor = "red";
    this.laserBeam.style.position = "absolute";
    this.laserBeam.style.top = `${this.y}px`;
    this.laserBeam.style.left = `${this.x}px`;
    this.laserBeam.style.zIndex = 4;

    this.root.appendChild(this.laserBeam);

    this.speed = 0.5;
  }

  shoot = (timeDiff) => {
    this.y = this.y - timeDiff * this.speed;
    this.laserBeam.style.top = `${this.y}px`;
    this.root.appendChild(this.laserBeam);

    if (this.y < 0) {
      this.root.removeChild(this.laserBeam);

      this.destroyed = true;
    }
  };
}
