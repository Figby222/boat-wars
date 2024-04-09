/* eslint-disable no-unused-vars */
import Boat from "./modules/boat/boat.js";
import Computer from "./modules/computer/computer.js";
import Gameboard from "./modules/gameboard/gameboard.js";
import Player from "./modules/player/player.js";
import DOMControl from "./modules/dom-control/dom-control.js";

const player1 = new Player();
const player2 = new Computer(false);
player1.gameboard = new Gameboard();
player2.gameboard = new Gameboard();
const DOMCtrl = new DOMControl();

let currentTurn = player1;
let continueGame = true;

player1.gameboard.board.placeBoat(new Boat(4), [6, 4], "y");
player1.gameboard.board.placeBoat(new Boat(1), [3, 3]);
player1.gameboard.board.placeBoat(new Boat(2), [1, 1]);
player1.gameboard.board.placeBoat(new Boat(3), [7, 6], "y");

player2.gameboard.board.placeBoat(new Boat(4), [6, 4], "y");
player2.gameboard.board.placeBoat(new Boat(1), [3, 3]);
player2.gameboard.board.placeBoat(new Boat(2), [1, 1]);
player2.gameboard.board.placeBoat(new Boat(3), [7, 6], "y")

if (currentTurn === player1) {
    DOMCtrl.renderGameboard(player1.gameboard, "player1", true);
    DOMCtrl.renderGameboard(player2.gameboard, "player2", false);

} else {
    DOMCtrl.renderGameboard(player1.gameboard, "player1", false);
    DOMCtrl.renderGameboard(player2.gameboard, "player2", true);
}