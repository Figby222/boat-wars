class Gameboard {
    constructor() {
        this.board = [];
    }

    static setBoard() {
        const board = [];
        for (let i = 0; i < 10; i+=1) {
            board.push([]);
        }

        return board;
    }

    placeBoat(boat, coordinates) {
        
    }
}

export default Gameboard;