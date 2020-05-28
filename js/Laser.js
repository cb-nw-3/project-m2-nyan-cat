class Laser {
  constructor(root, spot) {
    this.root = root;
    this.spot = spot;
    this.x = spot * ENEMY_WIDTH;
    this.y = -ENEMY_HEIGHT;
    this.destroyed = false;

    this.laserBeam = document.createElement("div");
    this.laserBeam.style.width = "4px";
    this.laserBeam.style.height = "8px";
    this.laserBeam.style.backgroundColor = "red";
    // this.laserBeam.style.position = "absolute";
    // this.laserBeam.style.top = `${this.y}px`;
    // this.laserBeam.style.left = `${this.x}px`;
    this.laserBeam.style.zIndex = "111111";

    this.root.appendChild(this.laserBeam);

    this.speed = 3;
  }

  shoot = (timeDiff) => {
    this.y = this.y + timeDiff * this.speed;
    this.laserBeam.style.bottom = `${this.y}px`;
    this.root.appendChild(this.laserBeam);

    if (this.y > GAME_HEIGHT) {
      this.root.removeChild(this.laserBeam);

      this.destroyed = true;
      score = score + 20;
    }
  };
}
