const app = document.querySelector("#app");
const gameEngine = new Engine(app);
const laser = new Laser(app, gameEngine.player.x, gameEngine.player.position);

let score = 0;
const scoreTally = document.createElement("span");

const startMessage = document.createElement("span");
startMessage.innerText = "Press 'Enter' to begin";
startMessage.style.position = "absolute";
startMessage.style.top = `${GAME_HEIGHT / 2}px`;
startMessage.style.left = `${GAME_WIDTH / 5.5}px`;

app.appendChild(startMessage);

const keydownHandler = (event) => {
  console.log(event.code);

  if (event.code === "ArrowLeft") {
    gameEngine.player.moveLeft();
  }

  if (event.code === "ArrowRight") {
    gameEngine.player.moveRight();
  }

  // if (event.code === "Space") {
  //   laser.shoot();
  // }

  if (event.code === "Enter") {
    app.removeChild(startMessage);
    gameEngine.gameLoop();
  }
};

document.addEventListener("keydown", keydownHandler);
