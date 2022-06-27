"use strict"

class ShapeFactory {
    #shapes = ['square', 'circle'];
    #color = ['red', 'green', 'yellow', 'blue'];

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
        return Math.floor(Math.random() * 200);
    }
}

class Shape {
    constructor(form, color, size) {
        this.formClassCss = form;
        this.colorClassCss = color;
        this.size = size;
    }

    getForm() {
        return this.formClassCss;
    }

    getColor() {
        return this.colorClassCss;
    }

    getSize() {
        return this.size;
    }
}

class ShapePresenter {
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

class Counter {
    scoreSection = document.getElementById('resultLine');
    scoreBlock = document.getElementById('resultValue');
    count = 0;

    increaseScore () {
        this.count = this.count + 1;
    }

    hideScore() {
        this.#resetScore();
        this.scoreSection.style.display = 'none';
    }

    showScore() {
        this.scoreSection.style.display = 'block';
        console.log(this.scoreSection);
        this.scoreBlock.textContent = this.#getScore();
    }

    #getScore() {
        return this.count;
    }

    #resetScore() {
        this.count = 0;
    }
}

class Timer {
    #progressLineBlock = document.getElementById('progressLine');
    #timeRenderBlock = document.getElementById('time_remains');
    #timeRemains = 0;
    isWorking = false;

    run() {
        this.isWorking = true;
        let timePassed = setInterval(() => {
            if(this.#timeRemains > 0) {
                this.#timeFlow()
            }
            else {
                clearInterval(timePassed);
                this.#resetTimeSettings();
            }
        }, 1000);
    }

    setTimerSettings(limit) {
        this.#timeRemains = limit;
    }

    #resetTimeSettings() {
        this.#timeRemains = 0;
        this.isWorking = false;
    }

    #timeFlow() {
        this.#showTime()
        this.#changeTimeRemains(this.#timeRemains - 1);
    }

    #showTime() {
        this.#timeRenderBlock.textContent = this.#timeRemains;
    }

    #changeTimeRemains(changedTimeValue) {
        this.#timeRemains = changedTimeValue;
    }

    hideTimer() {
        this.#progressLineBlock.style.display = 'none';
    }

    showTimer() {
        this.#progressLineBlock.style.display = 'block';
    }
}

class Game {
    constructor(Timer, ShapeFactory, ShapePresenter, Counter) {
        this.timer = Timer;
        this.shaper = ShapeFactory;
        this.presenter = ShapePresenter;
        this.counter = Counter;
    }

    run (target, timeLimit) {
        if (target.id === 'start_game') {
            this.#start(timeLimit);
            if(this.#isGoing()){
                this.#addShape();
            }else {
                this.#end();
            }
        }else {
            this.#process(target);
        }
    }

    #process(target) {
        if(target.id === 'added_shape') {
            this.#removeShape(target.id);
            this.counter.increaseScore();
            if(this.#isGoing()){
                this.#addShape();
            }else {
                this.#end()
            }
        }
    }

    #isGoing() {
        return this.timer.isWorking;
    }

    #storeGameSettings(settings) {
        this.timer.setTimerSettings(settings);
    }

    #addShape() {
       this.presenter.showShape(this.shaper.createRandomShape());
    }

    #removeShape (elementId) {
        document.getElementById(elementId).remove();
    }

    #start(timeLimit) {
        this.#storeGameSettings(timeLimit);
        this.counter.hideScore();
        this.timer.run();
        this.timer.showTimer();
    }

    #end() {
        this.counter.showScore();
        this.timer.hideTimer();
    }
}

function makeShapeFactory() {
    return new ShapeFactory()
}

function makePresenter() {
    return new ShapePresenter();
}

function makeTimer() {
   return new Timer();
}

function makeCounter() {
    return new Counter();
}

function createGameApp(Timer, ShapeFactory, ShapePresenter, Counter) {
    return new Game(Timer, ShapeFactory, ShapePresenter, Counter);
}

let game = createGameApp(makeTimer(), makeShapeFactory(), makePresenter(), makeCounter());
let settingInput = document.getElementById('settings');

window.addEventListener('click', function (event) {
    event.stopPropagation();
    let target = event.target;
    let timeLimit = settingInput.value;

    game.run(target, timeLimit);
});