// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
	// The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
	// You need to provide the DOM node when you create an instance of the class
	constructor(theRoot) {
		// We need the DOM element every time we create a new enemy so we
		// store a reference to it in a property of the instance.
		this.root = theRoot;
		// We create our hamburger.
		// Please refer to Player.js for more information about what happens when you create a player
		this.player = new Player(this.root);
		// Initially, we have no enemies in the game. The enemies property refers to an array
		// that contains instances of the Enemy class
		this.enemies = [];
		// We add the background image to the game
		addBackground(this.root);
		// console.log(this.player);
	}

	// The gameLoop will run every few milliseconds. It does several things
	//  - Updates the enemy positions
	//  - Detects a collision between the player and any enemy
	//  - Removes enemies that are too low from the enemies array
	gameLoop = () => {
		// This code is to see how much time, in milliseconds, has elapsed since the last
		// time this method was called.
		// (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
		if (this.lastFrame === undefined) {
			this.lastFrame = new Date().getTime();
		}

		let timeDiff = new Date().getTime() - this.lastFrame;

		this.lastFrame = new Date().getTime();
		// We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
		// Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
		this.enemies.forEach((enemy) => {
			enemy.update(timeDiff);
		});

		// We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
		// We use filter to accomplish this.
		// Remember: this.enemies only contains instances of the Enemy class.
		this.enemies = this.enemies.filter((enemy) => {
			return !enemy.destroyed;
		});

		// We need to perform the addition of enemies until we have enough enemies.
		while (this.enemies.length < MAX_ENEMIES) {
			// We find the next available spot and, using this spot, we create an enemy.
			// We add this enemy to the enemies array
			const spot = nextEnemySpot(this.enemies);
			this.enemies.push(new Enemy(this.root, spot));
			// console.log(this.enemies);
		}

		// We check if the player is dead. If he is, we alert the user
		// and return from the method (Why is the return statement important?)
		if (this.isPlayerDead()) {
			window.alert("Game over");
			return;
		}

		// If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
		setTimeout(this.gameLoop, 20);
	};

	// This method is not implemented correctly, which is why
	// the burger never dies. In your exercises you will fix this method.
	isPlayerDead = () => {
		for (let i = 0; i <= this.enemies.length; i++) {
			// console.log(this.enemies[i].y)
			// console.log(this.player);

			if (
				this.enemies[i] &&
				this.enemies[i].x === this.player.x &&
				this.enemies[i].y + ENEMY_HEIGHT >= this.player.y
			) {
				// Sound method here?
				return true;
			}
		}
		return false;
	};
}
