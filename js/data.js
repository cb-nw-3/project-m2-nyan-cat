// In this file we have some data that the other source files will use.
// Most of this data is stored in constants.
// Constants are just variables that never change. By convention,
// We write constants with upper case letters.

// The GAME_WIDTH and GAME_HEIGHT constants denote the size
// of the game area in pixels and is used in engine-utilities.js.
const GAME_WIDTH = 525;
const GAME_HEIGHT = 675;

// These constants represent the width and height of an enemy in pixels
// as well as the maximum number of enemies on screen at any given time.
const ENEMY_WIDTH = 75;
const ENEMY_HEIGHT = 156;
const MAX_ENEMIES = 5;

// These constants represent the player width and height.
const PLAYER_WIDTH = 75;
const PLAYER_HEIGHT = 54;
const PLAYER_LIVES = 5;

const BONUS_BULLET_HEIGHT = 75;
const BONUS_BULLET_WIDTH = 75;
const AMOUNT_OF_BULLETS = 5;

// audio files https://www.findsounds.com/
let death1 = new Audio('sounds/death1.wav');
let death2 = new Audio('sounds/death2.mp3');
let death3 = new Audio('sounds/death3.wav');
let death4 = new Audio('sounds/death4.wav');
let death5 = new Audio('sounds/death5.mp3');
let eatingNoise = new Audio('sounds/eating noise.wav');
let laserSound = new Audio('sounds/GUN_SHOT.wav');
let explosion = new Audio('sounds/explosion.wav');
let bell = new Audio('sounds/bell.wav');
let backgroundSound = new Audio('sounds/brasil_la_la_la_la_la_la_la_la_canzone.mp3');