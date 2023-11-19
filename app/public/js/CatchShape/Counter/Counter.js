export default class Counter {
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