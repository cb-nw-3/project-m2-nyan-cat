https://eloquent-thompson-86e709.netlify.app/

# Object Oriented Programming Game Project

<p align="center"><img src="./images/screenshot.png"></p>

# Introduction

This project was designed as a way for you to practice and learn about Object Oriented Programming. A good bit of code has already been provided for you, and it makes for an _almost_ working game.

The project is divided in two parts. In a first part, you will fix and implement some basic functionality. In the second part, you will be able to customize the game as you wish!

Because there is a fair bit of JavaScript in this app, we have split code into more manageable pieces. You will find all of the code in the `js` folder.

_Because we split the code into many files, we need to add the `<script>` tags in the right order in the `index.html` file._ This is already done for you, but it's important not to change the order.

## The game

This game is called **I CAN HAZ CHEEZBURGER?!??**. In the game, you play as an anthropomorphic cheeseburger. The only thing you can do is move left or right with the arrows of your keyboard.

The goal of the game is to stay alive as long as possible by avoiding the Nyan Cats who are raining from the sky and trying to _haz_ you. The longer you stay alive, the higher your score!

At the moment, the game is a bit broken. This project will have you first fix the broken game, then add your own features to it. :)

## Instructions

1. Open the `index.html` file in your browser, and observe what goes on when you load it.
2. After reading the instructions of the project, **take a look at the provided code**. Don't worry if you don't understand _everything_, but try to get a general feel for what the code is doing. There are extensive comments throughout the code.
3. Once the provided code has been consulted, go through the Assignment section at your own pace.

## Assignment

### 1. Let's make the game actually end

If a Nyan Cat gets to you and eats you, the game keeps going on. Let's fix this!

First, look at the `gameLoop` method of the `Engine`. There's a part of the function that calls `this.isPlayerDead()` to verify if the player has died based on the current situation.

Next, look at the `isPlayerDead` method of the `Engine`. Notice that it's always returning `false`, which means that the player is always reported to be alive.

Here, we are going to rewrite the code of this function to actually check if the player should be dead. We will do this by looping over all the enemies, and checking if their box overlaps the player box.

If at least one enemy overlaps the player, then your function should return `true`. Otherwise it should return `false.

A good strategy would be to `console.log` both `this.player` and `this.enemies`. When you look in the console, you will see that those two objects contain the information necessary to detect a collision.

_HINT:_ In Javascript, the 0,0 position is the _top left_ corner. This means that if an item is at `{x: 0, y: 0}`, it's in the top left, not the bottom left. As `y` values increase, items move down.

_HINT:_ A collision takes place when one of the enemy's boxes overlaps the players. All enemies and players are positioned with `x` and `y` coordinates. There are also helpful constants like `ENEMY_HEIGHT` and `PLAYER_HEIGHT` you can use.

_HINT:_ Try calling `console.log` on the player. You might notice that you don't have all the information you need. Feel free to modify `Player.js` to add some more info to `this`.

### 2. Flavor it!

Having completed the basic section of this project is already great! However, next up is the fun part: customizing and evolving the game. Since this is an open-ended activity, we will give you some suggestions. Feel free to use them or not.

<!-- - Instead of completely stopping the game when it's over, allow the player to start a new game -->
 <!-- - Add a sound track and sound effects to the game -->
<!-- // Add the possibility of having lives -->
<!-- - Increase the difficulty level of the game as time passes by making the enemies go faster -->
- Allow the enemies and player to have animated sprites instead of the current static ones. You could do this by defining a sprite as an array of images and setting a speed at which these images should switch. This could be implemented in the `render` method.
<!-- - Allow the player to shoot bullets at the Nyan Cats -->
<!-- - Add another type of entity called `Bonus` that will also fall from the sky and add points to the score -->
<!-- - Make the game more hardcore by allowing the player to also move up/down --> and making Nyan Cats also shoot from the left of the screen 
- **Don't stop!** These suggestions are only here to get you started :)

## Project Success guidelines

In order for the project to be deemed _successful_ and for you to receive a passing grade

- you need to complete step 1 completely.
- add at least 1 major improvement to the game (that changes the gameplay), and 1 minor improvement (eg. sound effects, "new game" button).

### Submission

- Open a PR, as you normally would, against the parent repository.
- Be sure to add a screenshot to the PR.
  - For MacOS, you can use cmd + shift + 4 to open the screenshot tool. Draw a box around the screen. The screenshot will be saved to the Desktop.
  - For Windows, use the "Snip & Sketch" tool that is provided with Win 10, or "Print Screen" if you are on an earlier version of Windows.
- Deploy the project to Netlify
  - View this guide: https://docs.google.com/document/d/1J7ff9h77RMrQadgCM54eziW_Rj5_PAHYpQHYjf2ojZU/edit?usp=sharing
