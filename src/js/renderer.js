import { ImageLoader } from './imageLoader.js';

export class Renderer {
    constructor(canvas, blockSize, grid, images) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.blockSize = blockSize;
        this.grid = grid;
        this.images = images;
        this.imageLoader = new ImageLoader();
        this.loadImages().then(() => this.draw());
    }

    async loadImages() {
        const imageNames = this.getAllImageNames();
        this.images = await this.imageLoader.loadImages(imageNames);
    }


    getAllImageNames() {
        const imageNames = [];
        for (let r = 0; r < this.grid.length; r++) {
            for (let c = 0; c < this.grid[0].length; c++) {
                const imageName = this.grid[r][c];
                if (imageName && !imageNames.includes(imageName)) {
                    imageNames.push(imageName);
                }
            }
        }
        return imageNames;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (let r = 0; r < this.grid.length; r++) {
            for (let c = 0; c < this.grid[0].length; c++) {
                const imageName = this.grid[r][c];
                if (imageName && this.images[imageName]) {
                    const image = this.images[imageName];
                    this.ctx.drawImage(image, c * this.blockSize, r * this.blockSize, this.blockSize, this.blockSize);
                }
            }
        }
    }

    animateTileDisappearance(row, col) {
        return new Promise((resolve) => {
            const imageName = this.grid[row][col];
            const image = this.getImageByName(imageName);
            const x = col * this.blockSize;
            const y = row * this.blockSize;

            let opacity = 1;
            const animationFrame = () => {
                this.ctx.clearRect(x, y, this.blockSize, this.blockSize);
                this.ctx.globalAlpha = opacity;
                this.ctx.drawImage(image, x, y, this.blockSize, this.blockSize);
                this.ctx.globalAlpha = 1;
                opacity -= 0.05;
                if (opacity > 0) {
                    requestAnimationFrame(animationFrame);
                } else {
                    resolve();
                }
            };
            requestAnimationFrame(animationFrame);
        });
    }

    clearCanvas = (duration) => {
        return new Promise((resolve) => {
            const animate = () => {
                let n = (Date.now() - duration) * 0.0001;
                n = Math.max(0, Math.min(1, n));

                this.ctx.beginPath();
                this.ctx.rect(0, 0,  this.canvas.width,  this.canvas.width);
                this.ctx.fillStyle = `rgb(24, 62, 121, ${n})`;
                this.ctx.fill();
                this.ctx.closePath();

                if (n < 0.1) {
                    requestAnimationFrame(() => animate(duration));
                } else {
                    this.ctx.fillStyle = `rgb(24, 62, 121)`;
                    this.ctx.fill();
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        });
    }

    async animateGameOver(scoreManager, message) {
        await this.clearCanvas(Date.now());
        const score = scoreManager.getScore()
        this.ctx.font = '30px Marvin';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`${message} Your score: ${score}`, 50, 100);

        const restartButton = document.createElement('button');
        const gameContainer = document.getElementsByClassName('canvas-container');
        restartButton.textContent = 'Try again';
        restartButton.className = 'restart-button'

        gameContainer[0].appendChild(restartButton);

        restartButton.addEventListener('click', () => {
            window.location.reload();
        });
    }

    getImageByName(imageName) {
        return this.images[imageName];
    }
}
