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

    placeBoat(boat, coordinates) {
        const [x, y] = coordinates;
        this.board[x][y] = boat;
    }
}

export default Gameboard;