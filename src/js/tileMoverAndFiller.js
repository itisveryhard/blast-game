import { TileConstructor } from "./tileConstructor.js";

export class TileMoverAndFiller {
    constructor(canvas, grid, cols, rows) {
        this.canvas = canvas;
        this.grid = grid;
        this.cols = cols;
        this.rows = rows;
        this.tileConstructor = new TileConstructor()
    }
    moveAndFillTiles() {
        for (let c = 0; c < this.cols; c++) {
            let emptyCells = 0;
            for (let r = this.rows - 1; r >= 0; r--) {
                if (this.grid[r][c] === null) {
                    emptyCells++;
                } else if (emptyCells > 0) {
                    this.grid[r + emptyCells][c] = this.grid[r][c];
                    this.grid[r][c] = null;
                }
            }
            for (let i = 0; i < emptyCells; i++) {
                this.grid[i][c] = this.tileConstructor.generateRandomTile();
            }
        }
    }
}
