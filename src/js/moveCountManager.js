export class MoveCountManager {
    constructor(initialMoveCount = 10) {
        this.moveCount = initialMoveCount;
        this.moveCountElement = document.getElementById('movesLeft');
    }

    reduceMoveCounts() {
        this.moveCount -= 1;
        this.moveCountElement.textContent = String(this.moveCount);
    }

    getMoveCounts() {
        return this.moveCount
    }
}
