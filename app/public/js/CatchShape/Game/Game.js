import ShapePresenter from "../Shape/ShapePresenter.js";

export default class Game {

    #timeRemains = 0;

    #shaper = null;
    #presenter = null;
    #counter = null;
    #intervalId = null;
    #progressLineBlock = null;
    #timeRenderBlock = null;

    constructor(ShapeFactory, ShapePresenter, Counter) {
        this.#intervalId = null;

        this.#shaper = ShapeFactory;
        this.#presenter = ShapePresenter;
        this.#counter = Counter;
        this.#progressLineBlock = document.getElementById('progressLine');
        this.#timeRenderBlock = document.getElementById('time_remains');
    }

    start(timeLimit) {
        // Stop previous time if it already in process and we initiate new game start before previous one is done.
        this.#end();
        this.#timeRemains = timeLimit;
        this.#counter.resetScore();
        this.#renewTimeFlow();
        this.showTimer();

        this.#process(true);

        this.intervalId = setInterval(() => {
            if(this.#timeRemains > 0) {
                this.#renewTimeFlow();
            } else {
                this.#end(this.intervalId);

                this.hideTimer();
                this.#counter.showScore();
            }
        }, 1000);
    }

    shapeClicked() {
        this.#process(false);
    }

    #end() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
        }
        this.intervalId = null;

        this.#resetTimeSettings();
        this.#removeShape();
    }


    #process(freshStart) {
        if( ! freshStart) {
            this.#counter.increaseScore();
        }

        this.#presenter.showShape(this.#shaper.createRandomShape());
        this.#counter.showScore();
    }

    #removeShape () {
        let shapeForRemove = document.getElementById(ShapePresenter.getShapeId());

        if(shapeForRemove) {
            shapeForRemove.remove();
        }
    }

    #resetTimeSettings() {
        this.#timeRemains = 0;
    }

    #renewTimeFlow() {
        this.#showTime();
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
