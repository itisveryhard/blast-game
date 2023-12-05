import { ClickEventHandler } from "./clickEventHandler.js";
import { TileConstructor } from "./tileConstructor.js";
import { ScoreManager } from "./scoreManager.js";
import { MoveCountManager } from "./moveCountManager.js";

class Game {
    constructor(canvas, blockSize, rows, cols, K) {
        this.canvas = canvas;
        this.blockSize = blockSize;
        this.rows = rows;
        this.cols = cols;
        this.K = K;
        this.moveCountManager = new MoveCountManager(10);
        this.scoreManager = new ScoreManager();
        this.tileConstructor = new TileConstructor();
        this.grid = this.createGrid();
        new ClickEventHandler(this.canvas, this.blockSize, this.grid, this.K, this.rows, this.cols, this.scoreManager, this.moveCountManager);
    }

    createGrid() {
        const grid = [];
        for (let r = 0; r < this.rows; r++) {
            grid[r] = [];
            for (let c = 0; c < this.cols; c++) {
                grid[r][c] = this.tileConstructor.generateRandomTile();
            }
        }
        return grid;
    }
}

const N = 15
const M = 15
const K = 2; // minimum for burn tile
const blockSize = 40;

const canvas = document.getElementById('gameCanvas');
canvas.width = N * blockSize;
canvas.height = M * blockSize;

const rows = canvas.height / blockSize;
const cols = canvas.width / blockSize;

new Game(canvas, blockSize, rows, cols, K);

