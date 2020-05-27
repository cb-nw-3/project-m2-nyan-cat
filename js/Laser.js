class Laser {
  constructor(root, player, positionX, positionY) {
    this.root = root;
    this.player = player;
    this.x = positionX;
    this.y = positionY;

    this.laserBeam = document.createElement("div");
    this.laserBeam.style.width = "100px";
    this.laserBeam.style.height = "200px";
    this.laserBeam.style.color = "red";
    this.laserBeam.style.position = "absolute";
    this.laserBeam.style.top = "200px";
    this.laserBeam.style.left = "100px";
    this.laserBeam.style.zIndex = "111111";
  }

  shoot = () => {
    this.root.appendChild(this.laserBeam);
  };
}
