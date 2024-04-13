import Player from "../player/player.js";
import Gameboard from "../gameboard/gameboard.js";
import Computer from "../computer/computer.js";

class Game {
    constructor(player1Name, player2Name = "computer") {
        this.player1 = new Player(new Gameboard(), player1Name);
        this.player2 = new Player(new Gameboard(), player2Name);
    }

    checkGameOver() {
        return true;
    }
}

export default Game;