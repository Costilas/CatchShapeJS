export default class Timer {
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