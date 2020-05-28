let gameLoopOn = false;

class Engine {
  constructor(theRoot) {
    this.root = theRoot;
    this.player = new Player(this.root);
    this.enemies = [];
    this.lasers = [];
    this.timesDead = 0;

    // Rendering lives
    this.life1 = document.createElement("img");
    this.life1.setAttribute("src", "../images/heart.png");
    this.life1.style.width = "40px";
    this.life1.style.height = "40px";
    this.life1.style.zIndex = "999";
    this.life1.style.position = "absolute";
    this.life1.style.top = "20px";
    this.life1.style.left = "20px";

    this.life2 = document.createElement("img");
    this.life2.setAttribute("src", "../images/heart.png");
    this.life2.style.width = "40px";
    this.life2.style.height = "40px";
    this.life2.style.zIndex = "999";
    this.life2.style.position = "absolute";
    this.life2.style.top = "20px";
    this.life2.style.left = "50px";

    this.life3 = document.createElement("img");
    this.life3.setAttribute("src", "../images/heart.png");
    this.life3.style.width = "40px";
    this.life3.style.height = "40px";
    this.life3.style.zIndex = "999";
    this.life3.style.position = "absolute";
    this.life3.style.top = "20px";
    this.life3.style.left = "80px";

    this.root.appendChild(this.life1);
    this.root.appendChild(this.life2);
    this.root.appendChild(this.life3);
  }

  gameLoop = () => {
    gameLoopOn = true;
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();

    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    this.enemies = this.enemies.filter((enemy) => !enemy.destroyed);

    this.lasers.forEach((laser) => {
      laser.shoot(timeDiff);
    });

    this.lasers = this.lasers.filter((laser) => !laser.destroyed);

    while (this.enemies.length < MAX_ENEMIES) {
      // ENEMIES
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));

      // Rendering the score
      scoreTally.innerText = `${score}`;
      scoreTally.style.position = "absolute";
      scoreTally.style.left = "290px";
      scoreTally.style.top = "25px";
      scoreTally.style.color = "orange";
      scoreTally.style.fontFamily = "sans-serif";
      scoreTally.style.fontSize = "24px";
      scoreTally.style.zIndex = "999";
      this.root.appendChild(scoreTally);
    }

    if (this.isPlayerDead()) {
      addBackground(this.root);
      this.timesDead++;

      if (this.timesDead === 1) {
        this.root.removeChild(this.life3);
        this.gameLoop();
      } else if (this.timesDead === 2) {
        this.root.removeChild(this.life2);
        this.gameLoop();
      } else if (this.timesDead === 3) {
        this.root.removeChild(this.life1);

        const gameOverMessage = document.createElement("span");
        gameOverMessage.innerText = "Game over";
        gameOverMessage.style.color = "#FF0100";
        gameOverMessage.style.position = "absolute";
        gameOverMessage.style.top = `${GAME_HEIGHT / 2}px`;
        gameOverMessage.style.left = `${GAME_WIDTH / 3}px`;
        this.root.appendChild(gameOverMessage);
      }
      return;
    }

    if (this.isEnemyDead()) {
      score = score + 20;
    }

    setTimeout(this.gameLoop, 20);
  };

  laserShot = () => {
    this.lasers.push(new Laser(this.root, this.player.position));
  };

  isPlayerDead = () => {
    let dead = false;
    this.enemies.forEach((enemy, index) => {
      if (
        enemy.y >= GAME_HEIGHT - PLAYER_HEIGHT * 1.5 &&
        enemy.spot === this.player.position
      ) {
        this.enemies.splice(index, 1);
        dead = true;
        this.root.removeChild(enemy.domElement);
      }
    });
    return dead;
  };

  isEnemyDead = () => {
    let enemyDead = false;
    this.lasers.forEach((laser) => {
      this.enemies.filter((enemy, index) => {
        if (
          laser.position === enemy.spot &&
          Math.round(laser.y) === Math.round(enemy.y)
        ) {
          this.enemies.splice(index, 1);
          enemyDead = true;
          this.root.removeChild(enemy.domElement);
        }
      });
    });
    return enemyDead;
  };
}
