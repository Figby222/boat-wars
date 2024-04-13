/* eslint-disable no-unused-vars */
import DOMControl from "./modules/dom-control/dom-control.js";
import Game from "./modules/game/game.js";


const game = new Game("player1", "player2");

const display = new DOMControl(game);