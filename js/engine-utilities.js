const nextEnemySpot = (enemies) => {
  const enemySpots = GAME_WIDTH / ENEMY_WIDTH;

  const spotsTaken = [false, false, false, false, false];
  enemies.forEach((enemy) => {
    spotsTaken[enemy.spot] = true;
  });

  let candidate = undefined;
  while (candidate === undefined || spotsTaken[candidate]) {
    candidate = Math.floor(Math.random() * enemySpots);
  }
  return candidate;
};

const addBackground = (root) => {
  // const bg = document.createElement("img");
  // bg.src = "images/background.jpg";
  // bg.style.height = `${GAME_HEIGHT}px`;
  // bg.style.width = `${GAME_WIDTH}px`;
  // root.append(bg);
  // const whiteBox = document.createElement("div");
};
