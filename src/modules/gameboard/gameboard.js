class Gameboard {
    constructor() {
        this.board = Gameboard.setBoard();
        this.missedShots = [];
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
        const board = Object.assign([], this.board); // pretty sure this isn't working
        let i = 0;
        if (direction === "x") {
            for (; i < boat.length; i+=1) {
                if (board[x+i][y]) {
                    throw new Error("Boat collides with another boat");
                }
                board[x+i][y] = boat;
            }

            if (x + (i-1) > 10) {
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
        if (!(x > 0 && x < this.board.length) || !(y > 0 && y < this.board.length)) {
            throw new Error("Coordinates are out of bounds");
        }

        // if (this.hits.includes(JSON.stringify(coordinates))) {
        //     throw new Error("Cell has already been hit");
        // }

        if(this.board[x][y]) {
            this.board[x][y].hit();
            return true;
        }

        this.missedShots.push(JSON.stringify(coordinates));
        return false;
    }

    checkFleetDestruction() {
        for (let row = 0; row < this.board.length; row+=1) {
            for(let column = 0; column < this.board[row].length; column+=1) {
                if (this.board[row][column] && !(this.board[row][column].isSunk())) {
                    return false;
                }
            }
        }
        return true;
    }
}

export default Gameboard;