export class ScoreManager {
    constructor(initialScore = 0) {
        this.score = initialScore;
        this.scoreElement = document.getElementById('currentScore');
    }

    addPoints(points) {
        if (typeof points === 'number' && !isNaN(points)) {
            this.score += points;
            this.scoreElement.textContent = String(this.score);
        } else {
            console.error('Ошибка: Неверное значение очков');
        }
    }

    getScore() {
        return this.score
    }
}
