// eslint-disable-next-line import/extensions
import Boat from "../boat/boat.js";

class Gameboard {
    constructor() {
        this.board = Gameboard.setBoard();
    }

    static setBoard() {
        const board = [];
        for (let i = 0; i < 10; i+=1) {
            board.push([]);
        }

        return board;
    }

    placeBoat(boat, coordinates, direction = "x") {
        const [x, y] = coordinates;
        const board = Object.assign([], this.board);
        let i = 0;
        if (direction === "x") {
            for (; i < boat.length; i+=1) {
                if (board[x+i][y]) {
                    throw new Error("Boat collides with another boat");
                }
                board[x+i][y] = boat;
            }

            if (x + (i-1) > 10) { // change later
                throw new Error("Boat out of bounds");
            }
        } else {
            for (; i < boat.length; i+=1) {
                if (board[x][y+i]) {
                    throw new Error("Boat collides with another boat");
                }
                board[x][y+i] = boat;
            }

            if (y + (i-1) > 10) {
                throw new Error("Boat out of bounds");
            }
        }

        this.board = board;
    }

    receiveAttack(coordinates) {
        const [x, y] = coordinates;
        if (!(x >= 0 && x < this.board.length) || !(y >= 0 && y < this.board.length)) {
            throw new Error("Coordinates are out of bounds");
        }

        if(typeof this.board[x][y] === "object") {
            this.board[x][y].hit();
            this.board[x][y] = "destroyed";
            return true;
        }

        this.board[x][y] = false;
        return false;
    }

    checkFleetDestruction() {
        for (let row = 0; row < this.board.length; row+=1) {
            for(let column = 0; column < this.board[row].length; column+=1) {
                const currentCell = this.board[row][column];
                if (currentCell && currentCell !== "destroyed" && !(currentCell.isSunk())) {
                    return false;
                }
            }
        }
        return true;
    }
}

export default Gameboard;