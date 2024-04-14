/* eslint-disable no-unused-vars */
import DOMControl from "./modules/dom-control/dom-control.js";
import Game from "./modules/game/game.js";



const display = new DOMControl();
const game = new Game(display, "player1", "player2");

display.placeBoats(game.player1.gameboard, game.player2.gameboard);
display.renderPlayer1Gameboard(true);
display.renderPlayer2Gameboard(false);