/* eslint-disable arrow-body-style */
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

describe("#set-board", () => {
    test("setBoard returns a 3d array", () => {
        const board = Gameboard.setBoard();
        expect(board[0][0]).not.toBeNull();
    })

    test("setBoard[9] exists", () => {
        expect(myBoard[9]).not.toBeNull();
    })
})

describe("#place-boat", () => {
    const MockBoat = jest.fn((length) => { 
        return { length } 
    });
    const boat = new MockBoat(4);

    test("fake boat is placed in board", () => {
        myBoard.placeBoat(boat, [0, 1]);
        expect(myBoard.board[0][1]).toEqual(boat);
    })

    test("boat placed out of bounds throws error", () => {
        expect(() => myBoard.placeBoat(boat, [10][10])).toThrow(Error);
    })

    test("It places a boat with the length specified", () => {
        myBoard.placeBoat(boat, [0, 0], "x");
        expect (myBoard.board[3][0]).toBeDefined();
    })

    test("It places a boat with the length specified vertically", () => {
        myBoard.placeBoat(boat, [0, 0], "y");
        expect (myBoard.board[0][3]).toBeDefined();
    })

    test("It doesn't place boats out of bounds", () => {
        expect(() => myBoard.placeBoat(boat, [9, 9], "y"))
            .toThrow(new Error("Boat out of bounds"));
    })
})

describe("#receive-attack", () => {
    beforeEach(() => {
        myBoard.board = Gameboard.setBoard();
    });

    test("It throws error if coordinates are out of bounds", () => {
        expect(() => myBoard.receiveAttack([4, 12])).toThrow(new Error("Coordinates are out of bounds"));
    })

    test("It does not throw error if coordinates are in bounds", () => {
        expect(() => myBoard.receiveAttack([4, 4])).not.toThrow(Error);
    })

    // test("It throws error if cell has already been hit", () => {
    //     myBoard.receiveAttack([5, 5]);
    //     expect (() => myBoard.receiveAttack([5, 5]))
    //         .toThrow(new Error("Cell has already been hit"));
    // })

    test ("It hits boat at coordinates", () => {
        const boat = new Boat(4);
        myBoard.placeBoat(boat, [4, 5]);
        myBoard.receiveAttack([4, 5]);
        expect(myBoard.board[4][5].hitCount).toBe(1);
    })
})

describe("#checkFleet", () => {
    test("It works when board is empty", () => {
        expect(myBoard.checkFleetDestruction()).toBe(true);
    })

    test("It works when the board is not empty", () => {
        myBoard.placeBoat(new Boat(1), [4, 7]);
        expect(myBoard.checkFleetDestruction()).toBe(false);
    })

    test("It works after all boats are destroyed", () => {
        myBoard.receiveAttack([4, 7]);
        expect(myBoard.checkFleetDestruction()).toBe(true);
    })
})