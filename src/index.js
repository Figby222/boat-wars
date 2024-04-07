/* eslint-disable no-unused-vars */
import Boat from "./modules/boat/boat.js";
import Computer from "./modules/computer/computer.js";
import Gameboard from "./modules/gameboard/gameboard.js";
import Player from "./modules/player/player.js";
import DOMControl from "./modules/dom-control/dom-control.js";

const player1 = new Player();
const computer = new Computer(false);
const player1Board = new Gameboard();
const computerBoard = new Gameboard();
const DOMCtrl = new DOMControl();

player1Board.placeBoat(new Boat(4), [6, 4], "y");
player1Board.placeBoat(new Boat(1), [3, 3]);
player1Board.placeBoat(new Boat(2), [1, 1]);
player1Board.placeBoat(new Boat(3), [7, 6], "y");

computerBoard.placeBoat(new Boat(4), [6, 4], "y");
computerBoard.placeBoat(new Boat(1), [3, 3]);
computerBoard.placeBoat(new Boat(2), [1, 1]);
computerBoard.placeBoat(new Boat(3), [7, 6], "y")

DOMCtrl.renderGameboard(player1Board, "player1", true);
DOMCtrl.renderGameboard(computerBoard, "player2", false);

player1Board.receiveAttack([0, 1]);
DOMCtrl.renderGameboard(player1Board, "player1", true);