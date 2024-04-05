class Gameboard {
    constructor() {
        this.board = Gameboard.setBoard();
        this.hits = [];
    }

    static setBoard() {
        const board = [];
        for (let i = 0; i < 10; i+=1) {
            board.push([]);
        }

        return board;
    }

    placeBoat(boat, coordinates) {
        const [x, y] = coordinates;
        this.board[x][y] = boat;
    }

    receiveAttack(coordinates) {
        const [x, y] = coordinates;
        if (!(x > 0 && x < this.board.length) || !(y > 0 && y < this.board.length)) {
            throw new Error("Coordinates are out of bounds");
        }

        if (this.hits.includes(JSON.stringify(coordinates))) {
            throw new Error("Cell has already been hit");
        }

        if(this.board[x][y]) {
            this.board[x][y].hit();
        }

        this.hits.push(JSON.stringify(coordinates));
    }

    checkFleet() {
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