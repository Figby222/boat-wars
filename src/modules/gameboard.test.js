/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import Gameboard from "./gameboard.js";
import Boat from "./boat.js";

const myBoard = new Gameboard();

beforeEach(() => {
    myBoard.board = Gameboard.setBoard();
})

describe("Gameboard constructor", () => {
    test ("It has board property", () => {
        expect(myBoard).toHaveProperty("board")
    })
})

describe.skip("#set-board", () => {
    test("setBoard returns a 3d array", () => {
        const board = Gameboard.setBoard();
        expect(board[0][0]).not.toBeNull();
    })

    test("setBoard[9] exists", () => {
        expect(myBoard[9]).not.toBeNull();
    })
})

describe("#place-boat", () => {
    const MockBoat = jest.fn((length) => { length });
    const boat = new MockBoat(4);

    test("fake boat is placed in board", () => {
        myBoard.placeBoat(boat, [0, 1]);
        expect(myBoard.board[0][1]).toEqual(boat);
    })

    test("boat placed out of bounds throws error", () => {
        expect(() => myBoard.placeBoat(boat, [10][10])).toThrow(Error);
    })
})