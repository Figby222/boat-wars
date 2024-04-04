/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import Gameboard from "./gameboard.js";

describe("Gameboard constructor", () => {
    test ("It has board property", () => {
        expect(new Gameboard()).toHaveProperty("board")
    })
})

describe("#set-board", () => {
    test("setBoard returns a 3d array", () => {
        const board = Gameboard.setBoard();
        expect(board[0][0]).not.toBeNull();
    })
})

describe.skip("#place-boat", () => {
    test("fake boat is placed in board", () => {
        const myBoard = new Gameboard();

        jest.mock("./boat.js", () => {
            myBoat: true
        })

        const boat = new Boat(4);
        myBoard.placeBoat(boat, [0, 1]);
        expect(myBoard.board[0][1]).toMatch(boat);
    })
})