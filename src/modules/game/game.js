import Player from "../player/player.js";
import Gameboard from "../gameboard/gameboard.js";
import Computer from "../computer/computer.js";

class Game {
    constructor(player1Name, player2Name = "computer") {
        this.player1 = new Player(new Gameboard(), player1Name);
        this.player2 = new Player(new Gameboard(), player2Name);
    }

    playRound(coordinates) {
        const enemyBoard = this.player2.gameboard;
        this.player1.shoot(enemyBoard, coordinates);
    }

    checkGameOver() {
        const player1Gameboard = this.player1.gameboard;
        const player2Gameboard = this.player2.gameboard;
        if (player1Gameboard.checkFleetDestruction()) {
            return "player1";
        }

        if (player2Gameboard.checkFleetDestruction()) {
            return "player2";
        }
    }
}

export default Game;