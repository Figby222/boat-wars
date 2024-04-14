import Player from "../player/player.js";
import Gameboard from "../gameboard/gameboard.js";
import Computer from "../computer/computer.js";

class Game {
    constructor(display, player1Name, player2Name = "computer") {
        this.display = display;
        this.player1 = new Player(new Gameboard(), player1Name);
        this.player2 = new Player(new Gameboard(), player2Name);

        this.currentTurn = this.player1;
    }

    switchTurn() {
        this.currentTurn = this.currentTurn === this.player1 ? this.player2 : this.player1;
    }

    playRound(coordinates) {
        if (this.player2.name === "computer") {

        } else {
            if (this.currentTurn === this.player1) {
                const enemyBoard = this.player2.gameboard;
                this.player1.shoot(enemyBoard, coordinates);
                this.display.renderPlayer1Gameboard(this, this.player1.gameboard, false);
                this.display.renderPlayer2Gameboard(this, this.player2.gameboard, true);
            } else {
                const enemyBoard = this.player1.gameboard;
                this.player2.shoot(enemyBoard, coordinates);
                this.display.renderPlayer1Gameboard(this, this.player1.gameboard, true);
                this.display.renderPlayer2Gameboard(this, this.player2.gameboard, false);
            }
            
            this.switchTurn();
        }

        const winner = this.checkGameOver();
        if (winner) {
            this.display.gameOver(winner);
        }
    }

    checkGameOver() {
        const player1Gameboard = this.player1.gameboard;
        const player2Gameboard = this.player2.gameboard;
        if (player1Gameboard.checkFleetDestruction()) {
            return "player2";
        }

        if (player2Gameboard.checkFleetDestruction()) {
            return "player1";
        }

        return false;
    }
}

export default Game;