export default class Counter {
    scoreSection = document.getElementById('resultLine');
    scoreBlock = document.getElementById('resultValue');
    count = 0;

    increaseScore () {
        this.count += 1;
    }

    resetScore() {
        this.count = 0;
        this.scoreBlock.textContent = '' + this.count;
    }

    showScore() {
        this.scoreSection.style.display = 'block';
        this.scoreBlock.textContent = '' + this.count;
    }
}