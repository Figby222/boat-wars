// eslint-disable-next-line import/extensions
import Boat from "../boat/boat.js";

class Gameboard {
    constructor() {
        this.board = Gameboard.setBoard();
        this.minX = 0;
        this.maxX = 9;
        this.minY = 0;
        this.maxY = 9;
    }

    static setBoard() {
        const board = [];
        for (let i = 0; i <= 9; i+=1) {
            board.push([]);
            for (let i2 = 0; i2 <= 9; i2+=1) {
                board[i].push({ value: null });
            }
        }

        return board;
    }

    placeBoatHorizontal(boatLength, coordinates) {
        const boat = new Boat(boatLength);
        const [x, y] = coordinates;
        const board = Object.assign([], this.board);
        
        const coordinatesArray = [];
        for (let i = 0; i < boat.length; i+=1) {
            if (this.checkIfOutOfBounds([x + i, y])) { // change later
                throw new Error("Boat out of bounds");
            }

            if (board[x+i][y].value != null) {
                throw new Error("Boat collides with another boat");
            }
            coordinatesArray.push([x+i, y]);
        }

        for (let i = 0; i < coordinatesArray.length; i+=1) {
            const currentX = coordinatesArray[i][0];
            const currentY = coordinatesArray[i][1];

            this.board[currentX][currentY].value = boat;
        }
        // this.board = board;
    }

    placeBoatVertical(boatLength, coordinates) {
        const boat = new Boat(boatLength);
        const [x, y] = coordinates;
        const board = Object.assign([], this.board);

        const coordinatesArray = [];
        for (let i = 0; i < boat.length; i+=1) {
            if (this.checkIfOutOfBounds([x, y + i])) {
                throw new Error("Boat out of bounds");
            }

            if (board[x][y+i].value != null) {
                throw new Error("Boat collides with another boat");
            }
            coordinatesArray.push([x, y+i])
        }

        for (let i = 0; i < coordinatesArray.length; i+=1) {
            const currentX = coordinatesArray[i][0];
            const currentY = coordinatesArray[i][1];

            this.board[currentX][currentY].value = boat;
        }
            })

        }
    }

    getCell(coordinates) {
        const [x, y] = coordinates;

        return this.board[x][y];
    }

    getAdjacentCellCoordinates(coordinates) {
        const [x, y] = coordinates;
        return [
            [x - 1, y],
            [x + 1, y],
            [x, y - 1],
            [x, y + 1],
            [x - 1, y - 1],
            [x + 1, y- 1],
            [x - 1, y + 1],
            [x + 1, y + 1],
        ]
    }

    shootAdjacentCells(coordinates) {
        const coordinatesArr = this.getAdjacentCellsCoordinates(coordinates);

        coordinatesArr.forEach((currentCoordinates) => {
            if (this.getCell(currentCoordinates)) {
                this.receiveAttack(currentCoordinates);
            }
        })
    }

    checkIfOutOfBounds(coordinates) {
        const [x, y] = coordinates;

        if (x < this.minX || x > this.maxX || y < this.minY || y > this.maxY) {
            return true;
        }

        return false;
    }

    receiveAttack(coordinates) {
        const [x, y] = coordinates;

        if (this.checkIfOutOfBounds(coordinates)) {
            throw new Error("Coordinates are out of bounds")
        }
        if(this.board[x][y].value instanceof Boat) {
            this.board[x][y].value.hit();
            this.board[x][y].value = "destroyed";
            return true;
        }

        this.board[x][y].value = false;
        return false;
    }

    checkFleetDestruction() {
        for (let row = this.minX; row <= this.maxX; row+=1) {
            for(let column = this.minY; column < this.maxY; column+=1) {
                const currentCell = this.board[row][column];
                if (currentCell.value instanceof Boat && !(currentCell.value.isSunk())) {
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
            if (direction === "x") {
                try {
                    this.placeBoatHorizontal(i, [x, y]);
                } catch (err) {
                    i-=1;
                }

            } else if (direction === "y") {
                try {
                    this.placeBoatVertical(i, [x, y]);
                } catch (err) {
                    i-=1;
                }
            }
        }
    }
}

export default Gameboard;