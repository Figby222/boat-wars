/* eslint-disable no-unused-vars */
import DOMControl from "./modules/dom-control/dom-control.js";
import Game from "./modules/game/game.js";



const display = new DOMControl();
const game = new Game(display, true, true);

display.placeBoats(game.player1.gameboard);
display.placeBoats(game.player2.gameboard);
display.renderPlayer1Gameboard(game, game.player1.gameboard, true);
display.renderPlayer2Gameboard(game, game.player2.gameboard, false);