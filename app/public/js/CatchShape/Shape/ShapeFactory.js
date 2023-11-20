import Shape from "./Shape.js";

export default class ShapeFactory {
    #shapes = ['square', 'circle'];
    #color = ['red', 'green', 'yellow', 'blue'];
    #minSize = 30;
    #maxSize = 160;

    createRandomShape() {
        return new Shape(this.#randomizeForm(), this.#randomizeColor(), this.#randomizeSize());
    }

    #randomizeForm() {
        return this.#shapes[Math.floor(Math.random() * this.#shapes.length)];
    }

    #randomizeColor() {
        return this.#color[Math.floor(Math.random() * this.#color.length)];
    }

    #randomizeSize() {
        return Math.floor(Math.random() * (this.#maxSize - this.#minSize + 1)) + this.#minSize;
    }
}