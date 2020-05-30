// In this file we have functions that will be used in the Engine.js file.
// nextEnemySpot is a variable that refers to a function. The function has one parameter,
// which we called enemies. enemies will refer to an array that will contain instances of the
// Enemy class. To get more information about the argument that will get passed to this function,
// please see the Engine.js file.

// The purpose of this function is to determine in which slot to place our next enemy.
// The possibilities are 0, 1, 2, 3 or 4.
let bg = null;
const nextEnemySpot = (enemies) => {
  // enemySpots will refer to the number of spots available (can you calculate it?)
  const enemySpots = GAME_WIDTH / ENEMY_WIDTH;

  // To find out where to place an enemy, we first need to find out which are the spots available.
  // We don't want to place two enemies in the same lane. To accomplish this, we first create an
  // array with 5 elements (why 5?) and each element is false.
  // We then use forEach to iterate through all the enemies.
  // If you look at the constructor of the Enemy class, you can see that every instance will have a spot property.
  // We can use this property to modify the spotsTaken array.
  const spotsTaken = [false, false, false, false, false];
  enemies.forEach((enemy) => {
    spotsTaken[enemy.spot] = true;
  });

  // We are now in a position to find out position. We declare a variable candidate that is initially undefined.
  // candidate represents a potential spot. The variable will be repeatedly assigned different numbers.
  // We will randomly try different spots until we find out that is available
  let candidate = undefined;
  while (candidate === undefined || spotsTaken[candidate]) {
    // candidate is assigned a random number between 0 and enemySpots (not including enemySpots). (what number is enemySpots?)
    candidate = Math.floor(Math.random() * enemySpots);
  }

  // When the while loop is finished, we are assured that we have a number that corresponds to a free spot, so we return it.
  return candidate;
};

// addBackground contains all the logic to display the starry background of the game.
// It is a variable that refers to a function.
// The function takes one parameter
// The parameter represents the DOM node to which we will add the background
const setupStats = (root) => {
  let livesAndValue = document.createElement("div");
  livesAndValue.setAttribute(
    "style",
    "position: absolute; top: 2%; right:2%; font-size: 25px; color:white; background-color: transparent; display: inline;"
  );
  let livesLabel = document.createElement("span");
  livesLabel.innerHTML = "Lives: ";

  let livesRemain = document.createElement("span");
  livesRemain.id = "lives-remain";
  livesRemain.innerHTML = 3;
  livesAndValue.appendChild(livesLabel);
  livesAndValue.appendChild(livesRemain);
  root.appendChild(livesAndValue);

  let scoreAndValue = document.createElement("div");
  scoreAndValue.setAttribute(
    "style",
    "position: absolute; top: 2%; left:2%; font-size: 25px; color:white; background-color: transparent; display: inline;"
  );
  let scoreLabel = document.createElement("span");
  scoreLabel.innerHTML = "Score: ";

  let scoreValue = document.createElement("span");
  scoreValue.id = "score";
  scoreValue.innerHTML = 0;
  scoreAndValue.appendChild(scoreLabel);
  scoreAndValue.appendChild(scoreValue);
  root.appendChild(scoreAndValue);

  let levelAndValue = document.createElement("div");
  levelAndValue.setAttribute(
    "style",
    "position: absolute; top: 2%; left:50%; font-size: 25px; color:white; background-color: transparent; transform: translate(-50%); transparent; display: inline;"
  );
  let levelLabel = document.createElement("span");
  levelLabel.innerHTML = "Level: ";
  let levelValue = document.createElement("span");
  levelValue.innerHTML = 1;
  levelValue.id = "level-value";
  levelAndValue.appendChild(levelLabel);
  levelAndValue.appendChild(levelValue);
  root.appendChild(levelAndValue);
};

const addBackground = (root) => {
  // We create a new img DOM node.
  bg = document.createElement("img");

  // We set its src attribute and the height and width CSS attributes
  bg.src = "images/stars.png";
  bg.style.height = `${GAME_HEIGHT}px`;
  bg.style.width = `${GAME_WIDTH}px`;

  // We add it to the root DOM node
  root.append(bg);

  // We don't want the enemies to go beyond the lower edge of the image
  // so we place a white div to hide the enemies after they reach the bottom.
  // To see what it does, you can comment out all the remaining lines in the function to see the effect.
  const whiteBox = document.createElement("div");

  // We put a high z-index so that the div is placed over all other DOM nodes
  whiteBox.style.zIndex = 100;
  whiteBox.style.position = "absolute";
  whiteBox.style.top = `${GAME_HEIGHT}px`;
  whiteBox.style.height = `${ENEMY_HEIGHT}px`;
  whiteBox.style.width = `${GAME_WIDTH}px`;
  whiteBox.style.background = "#fff";
  root.append(whiteBox);
};
