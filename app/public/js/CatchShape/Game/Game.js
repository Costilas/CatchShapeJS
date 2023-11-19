export default class Game {
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
