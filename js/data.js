// In this file we have some data that the other source files will use.
// Most of this data is stored in constants.
// Constants are just variables that never change. By convention,
// We write constants with upper case letters.

// The GAME_WIDTH and GAME_HEIGHT constants denote the size
// of the game area in pixels and is used in engine-utilities.js.
const GAME_WIDTH = 375;
const GAME_HEIGHT = 500;

// These constants represent the width and height of an enemy in pixels
// as well as the maximum number of enemies on screen at any given time.
const ENEMY_WIDTH = 75;
const ENEMY_HEIGHT = 156;


// These constants represent the player width and height.
const PLAYER_WIDTH = 75;
const PLAYER_HEIGHT = 54;

// Constant for background music
const audio = new Audio(src="\John_Bartmann_-_13_-_Robot_Gypsy_Jazz.mp3");

//Variables for the difficulty levels change
let MAX_ENEMIES = 3; //Subject to change later in the program based on the difficulty level
let level = "normal"; //default choice
let currentScore = 0;