# Game with Blast mechanics

https://itisveryhard.github.io/blast-game

## Description of the general mechanics of the game

Test task for a gamedev company. The requirements indicate to use only html + javascript. The use of frameworks such as React/Vue/Angular is prohibited.

* The game consists of a playing field of arbitrary size N*M
* Each cell of the field contains a game object (hereinafter referred to as a tile) of a certain color. The number of possible color options is C.
* The initial state of the field is set randomly (the probability of the color of the tile is equally probable).
* When you click on a tile, an area (shape) is burned (deleted), consisting of a group of adjacent tiles of the same color; the size of the group cannot be less than K (default K=2). 
* After burning tiles, empty cells are formed. Next, adjacent tiles are moved to empty cells according to the given physics of moving tiles on the field.
* The process of moving and adding new tiles continues until the field is completely filled again.
* The goal of the game is to score X points in Y moves, otherwise you lose.

## Stack

* HTML 5, CSS
* JS
