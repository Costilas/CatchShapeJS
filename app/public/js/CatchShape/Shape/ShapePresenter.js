export default class ShapePresenter {
    #shapeField = '#interact_area';
    static #fieldWidth = 500;
    static #fieldHeight = 400;
    static #newShapeId = 'added_shape';

    showShape(ShapeObject) {
        let container = this.#getContainerObject();
        let newShape = this.#createShapeHTML(ShapeObject);
        this.#clearPresentationArea(container);
        this.#placeShapeInContainer(container, newShape);

        ShapeObject = null;
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

    static getShapeId() {
        return this.#newShapeId;
    }

    static #setRandomNewPosition(size, currentOffset, areaSize) {
        let max = (areaSize - parseInt(currentOffset.match(/\d+/))) - parseInt(size.match(/\d+/));

        return Math.floor(Math.random() * max);
    }

    #createShapeHTML(factoryDesignedShape) {
        let newShape = document.createElement("div");
        let size = factoryDesignedShape.getSize();
        newShape.id = ShapePresenter.getShapeId();
        newShape.classList.add(factoryDesignedShape.getForm(), factoryDesignedShape.getColor());
        newShape = this.#setSize(newShape, size);
        newShape = this.#randomizeStartShapePosition(newShape, size);

        return newShape;
    }

    #randomizeStartShapePosition(newShape, size) {
        let left = Math.floor(Math.random() * (ShapePresenter.#fieldWidth - size));
        let top = Math.floor(Math.random() * (ShapePresenter.#fieldHeight - size));
        newShape.style.cssText = newShape.style.cssText + 'left: ' + left + 'px; top: ' + top + 'px;';

        return newShape;
    }

    #setSize(newShape, int) {
        newShape.style.cssText = newShape.style.cssText + "width:" + int + 'px;height:' + int + 'px;';
        return newShape;
    }

    #getContainerObject() {
        return document.querySelector(this.#shapeField);
    }

    #clearPresentationArea(container) {
        let oldShape = document.getElementById(ShapePresenter.getShapeId());
        if(oldShape) {
            oldShape.removeEventListener('mouseover', this.randomizeCurrentPosition);
        }
        container.innerHTML = '';
    }

    #placeShapeInContainer(container, newShape) {
        container.appendChild(newShape);

        let addedShapeElement = document.getElementById(ShapePresenter.getShapeId());

        if(addedShapeElement) {
            addedShapeElement.addEventListener('mouseover', this.randomizeCurrentPosition);
        }
    }
}