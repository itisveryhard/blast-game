export class TileBurner {
    constructor(grid, scoreManager) {
        this.grid = grid;
        this.scoreManager = scoreManager;
    }

    burnArea(row, col, color, visited) {
        if (
            row < 0 ||
            col < 0 ||
            row >= this.grid.length ||
            col >= this.grid[0].length ||
            this.grid[row][col] !== color ||
            visited[row][col]
        ) {
            return 0;
        }

        visited[row][col] = true;

        let count = 1;

        count += this.burnArea(row + 1, col, color, visited);
        count += this.burnArea(row - 1, col, color, visited);
        count += this.burnArea(row, col + 1, color, visited);
        count += this.burnArea(row, col - 1, color, visited);

        return count;
    }

    burnAndScore(row, col, color, visited) {
        const count = this.burnArea(row, col, color, visited);

        if (count > 1) {
            this.scoreManager.addPoints(count);
        }
    }
}

