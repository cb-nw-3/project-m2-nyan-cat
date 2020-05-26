class Laser {
  constructor(root) {
    this.laserBeam = document.createElement("div");
    this.laserBeam.style.width = "1px";
    this.laserBeam.style.height = "2px";
    this.laserBeam.style.color = "red";
    root.appendChild(this.laserBeam);
  }

  shoot() {}
}
