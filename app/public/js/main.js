"use strict"

import ShapePresenter from "./CatchShape/Shape/ShapePresenter.js";
import ShapeFactory from "./CatchShape/Shape/ShapeFactory.js";
import Counter from "./CatchShape/Counter/Counter.js";
import Game from "./CatchShape/Game/Game.js";

let game = createGameApp();
let settingInput = document.getElementById('settings');

window.addEventListener('click', function (event) {
    event.stopPropagation();
    let event_name = event.target.id;
    let timeLimit = settingInput.value;

    if(event_name === 'start_game') {
        game.start(timeLimit);
    }else if (event_name === ShapePresenter.getShapeId()) {
        game.shapeClicked();
    }
});

function createGameApp() {
    return new Game(new ShapeFactory(), new ShapePresenter(), new Counter());
}