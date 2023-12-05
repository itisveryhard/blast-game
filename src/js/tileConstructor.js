export class TileConstructor {
    generateRandomTile() {
        const images = ['blue-cube.png', 'green-cube.png', 'purple-cube.png', 'red-cube.png', 'yellow-cube.png'];
        return images[Math.floor(Math.random() * images.length)];
    }
}
