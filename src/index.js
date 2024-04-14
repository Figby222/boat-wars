/* eslint-disable no-unused-vars */
import DOMControl from "./modules/dom-control/dom-control.js";
import Game from "./modules/game/game.js";



const display = new DOMControl();
const game = new Game(display, true, true);

game.player1.gameboard.placeBoats();
game.player2.gameboard.placeBoats();
display.renderPlayer1Gameboard(game, game.player1.gameboard, true);
display.renderPlayer2Gameboard(game, game.player2.gameboard, true);

const randomizeBoatsBtn = document.querySelector(".randomize-boats");
const startGameBtn = document.querySelector(".start-game");

randomizeBoatsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    game.player1.gameboard.placeBoats();
    game.player2.gameboard.placeBoats();

    display.renderPlayer1Gameboard(game, game.player1.gameboard, true);
    display.renderPlayer2Gameboard(game, game.player2.gameboard, true);
})