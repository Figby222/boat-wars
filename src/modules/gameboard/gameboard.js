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

    placeBoat(boatLength, coordinates, direction = "x") {
        const boat = new Boat(boatLength);
        const [x, y] = coordinates;
        const board = Object.assign([], this.board);
        
        const coordinatesArray = [];
        
        let i;
        if (direction === "x") {
            for (i = 0; i < boat.length; i+=1) {
                if (board[x+i][y]) {
                    throw new Error("Boat collides with another boat");
                }
                coordinatesArray.push([x+i, y]);
            }

            if (x + (i-1) >= 10) { // change later
                throw new Error("Boat out of bounds");
            }
        } else {
            for (i = 0; i < boat.length; i+=1) {
                if (board[x][y+i]) {
                    throw new Error("Boat collides with another boat");
                }
                coordinatesArray.push([x, y+i])
            }

            if (y + (i-1) >= 10) {
                throw new Error("Boat out of bounds");
            }
        }

        for (i = 0; i < coordinatesArray.length; i+=1) {
            const currentX = coordinatesArray[i][0];
            const currentY = coordinatesArray[i][1];

            this.board[currentX][currentY] = boat;
        }
        // this.board = board;
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

    placeBoats() {
        this.board = Gameboard.setBoard();
        for (let i = 1; i < 5; i+=1) {
            const x = Math.floor(Math.random() * this.board.length);
            const y = Math.floor(Math.random() * this.board.length);
            const direction = Math.floor(Math.random() * 2) === 0 ? "x" : "y";
            try {
                this.placeBoat(i, [x, y], direction);
            } catch (err) {
                i-=1;
            }
        }
    }
}

export default Gameboard;