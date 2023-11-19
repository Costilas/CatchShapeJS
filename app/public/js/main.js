"use strict"

import ShapePresenter from "./CatchShape/Shape/ShapePresenter.js";
import ShapeFactory from "./CatchShape/Shape/ShapeFactory.js";
import Counter from "./CatchShape/Counter/Counter.js";
import Timer from "./CatchShape/Timer/Timer.js";
import Game from "./CatchShape/Game/Game.js";

let game = createGameApp();
let settingInput = document.getElementById('settings');

window.addEventListener('click', function (event) {
    event.stopPropagation();
    let target = event.target;
    let timeLimit = settingInput.value;

    game.run(target, timeLimit);
});

function createGameApp() {
    return new Game(new Timer, new ShapeFactory(), new ShapePresenter(), new Counter());
}

function toggleMusicPlay() {
    let audioElement = document.getElementById('currentMusic');

    if(audioElement.paused) {
        audioElement.volume = 0.1;
        audioElement.loop = true;
        audioElement.play();
    }else {
        audioElement.pause();
    }
}