import { TileMoverAndFiller } from "./tileMoverAndFiller.js";
import { TileBurner } from "./tileBurner.js";
import { Renderer } from "./renderer.js";

export class ClickEventHandler {
    constructor(canvas, blockSize, grid, K, rows, cols, scoreManager, moveCountManager) {
        this.canvas = canvas;
        this.blockSize = blockSize;
        this.grid = grid;
        this.K = K;
        this.rows = rows;
        this.cols = cols;
        this.scoreManager = scoreManager;
        this.tileMoverAndFiller = new TileMoverAndFiller(this.canvas, this.grid, this.cols, this.rows);
        this.tileBurner = new TileBurner(this.grid, scoreManager);
        this.renderer = new Renderer(this.canvas, this.blockSize, this.grid);
        this.moveCountManager = moveCountManager;
        this.addClickEvent();
    }

    addClickEvent() {
        this.canvas.addEventListener('click', async (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const c = Math.floor(x / this.blockSize);
            const r = Math.floor(y / this.blockSize);
            const color = this.grid[r][c];
            if (!color) return;
            const visited = new Array(this.rows).fill(0).map(() => new Array(this.cols).fill(false));
            this.tileBurner.burnAndScore(r, c, color, visited);

            let count = 0;
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    if (visited[i][j]) {
                        count++;
                    }
                }
            }
            if (count >= this.K) {
                this.moveCountManager.reduceMoveCounts()
                let animatedCells = [];
                for (let i = 0; i < this.rows; i++) {
                    for (let j = 0; j < this.cols; j++) {
                        if (visited[i][j]) {
                            animatedCells.push(this.renderer.animateTileDisappearance(i, j));
                            this.grid[i][j] = null;
                        }
                    }
                }
                await Promise.all(animatedCells);
                this.tileMoverAndFiller.moveAndFillTiles();
                this.renderer.draw()
            }

            const score = this.scoreManager.getScore();

            if(score >= 50) {
                return this.renderer.animateGameOver(this.scoreManager, 'You win!')
            }

            const moveCounts = this.moveCountManager.getMoveCounts();
            if(moveCounts === 0) {
                return this.renderer.animateGameOver(this.scoreManager, 'You lose!')
            }
        });
    }
}
