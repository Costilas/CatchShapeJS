import Shape from "./Shape.js";

export default class ShapePresenter {
    #shapeField = '#interact_area';
    static #fieldWidth = 500;
    static #fieldHeight = 400;

    showShape(factoryDesignedShape) {
        let container = this.#getContainerObject();
        let newShape = this.#renderShape(factoryDesignedShape);
        this.#clearPresentationArea(container);
        this.#placeShapeInContainer(container, newShape);

        document.getElementById('added_shape').addEventListener('mouseover', this.randomizeCurrentPosition);
    }

    #renderShape(factoryDesignedShape) {
        let newShape = document.createElement("div");
        let size = factoryDesignedShape.getSize();
        newShape.id = "added_shape";
        newShape.classList.add(factoryDesignedShape.getForm(), factoryDesignedShape.getColor());
        newShape = this.#setSize(newShape, size);
        newShape = this.#randomizeStartShapePosition(newShape, size);

        return newShape;
    }

    randomizeCurrentPosition() {
        let currentHeight = this.style.height;
        let currentWidth = this.style.width;
        let currentLeftOffset = this.style.left;
        let currentTopOffset = this.style.top;
        let newLeft = ShapePresenter.#setRandomNewPosition(currentWidth, currentLeftOffset, ShapePresenter.#fieldWidth);
        let newTop = ShapePresenter.#setRandomNewPosition(currentHeight, currentTopOffset, ShapePresenter.#fieldHeight);

        this.style.cssText = this.style.cssText + 'left: ' + newLeft + 'px; top: ' + newTop + 'px;';
    }

    #randomizeStartShapePosition(newShape, size) {
        let left = Math.floor(Math.random() * (ShapePresenter.#fieldWidth - size));
        let top = Math.floor(Math.random() * (ShapePresenter.#fieldHeight - size));
        newShape.style.cssText = newShape.style.cssText + 'left: ' + left + 'px; top: ' + top + 'px;';

        return newShape;
    }

    static #setRandomNewPosition(size, currentOffset, areaSize) {
        let max = (areaSize - parseInt(currentOffset.match(/\d+/))) - parseInt(size.match(/\d+/));

        return Math.floor(Math.random() * max);
    }

    #setSize(newShape, int) {
        newShape.style.cssText = newShape.style.cssText + "width:" + int + 'px;height:' + int + 'px;';
        return newShape;
    }

    #getContainerObject() {
        return document.querySelector(this.#shapeField);
    }

    #clearPresentationArea(container) {
        container.innerHTML = '';
    }

    #placeShapeInContainer(container, newShape) {
        container.appendChild(newShape);
    }
}