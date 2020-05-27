class Laser {
  constructor(root, playerPosition) {
    console.log(playerPosition);

    this.root = root;
    this.position = playerPosition;

    this.x = this.position * PLAYER_WIDTH;
    this.y = GAME_HEIGHT;

    this.laserBeam = document.createElement("div");

    this.speed = 2;
  }

  shoot = () => {
    this.laserBeam.style.width = "100px";
    this.laserBeam.style.height = "200px";
    this.laserBeam.style.color = "red";
    this.laserBeam.style.position = "absolute";
    this.laserBeam.style.top = "200px";
    this.laserBeam.style.left = "100px";
    this.laserBeam.style.zIndex = "111111";
    this.root.appendChild(this.laserBeam);
  };
}
