export class ImageLoader {
    constructor() {
        this.images = {};
    }

    loadImage(src) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = src;
        });
    }

    async loadImages(imageNames) {
        const promises = imageNames.map(imageName => {
            if (!this.images[imageName]) {
                return this.loadImage(`src/img/${imageName}`).then(image => {
                    this.images[imageName] = image;
                });
            }
        });
        await Promise.all(promises);
        return this.images;
    }
}
