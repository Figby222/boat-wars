/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import Computer from "./computer.js";
import Gameboard from "../gameboard/gameboard.js";

let MockGameboard = {receiveAttack: jest.fn(() => true)};
let myBoard = new Gameboard();
beforeEach(() => {
    myBoard = new Gameboard();
})
describe("Constructor", () => {
    test("It creates object", () => {
        expect(typeof new Computer()).toBe("object");
    })

    test("It creates object with advanced mode", () => {
        expect(new Computer(null, true).advancedMode).toBe(true);
    })
})

describe("#shoot", () => {
    // test("It calls receiveAttack once", () => {
    //     const computer = new Computer(null, false);
    //     computer.shoot(MockGameboard);
    //     expect (MockGameboard.receiveAttack.mock.calls).toHaveLength(1);
    // })

    // test ("Mock is called with args", () => {
    //     const computer = new Computer(null, false);
    //     computer.shoot(MockGameboard);
    //     expect (MockGameboard.receiveAttack.mock.calls[0][0]).toBeDefined();
    // })
})

describe("#shoot advancedMode", () => {
    // test("It shoots adjascent squares", () => {
    //     const computer = new Computer(null, true);
    //     for (let i = 0; i < 6; i+=1) {
    //         computer.shoot(MockGameboard);
    //     }

    //     const firstShot =
    //         MockGameboard.receiveAttack.mock.calls[0][0];
    //     const shouldBeShot = [firstShot[0]+1, firstShot[1]];

    //     expect(MockGameboard.receiveAttack.mock.calls[0]).toContainEqual(shouldBeShot);
    // })

    test("It shoots real gameboard", () => {
        const computer = new Computer(null, true);
        const board = new Gameboard();
        expect(() => computer.shoot(board)).not.toThrow(Error);
    })

    test("It shoots gameboard 64 times", () => {
        const computer = new Computer(null, true);
        const board = new Gameboard();
        expect(() => {
            for (let i = 0; i < 64; i+=1) {
                computer.shoot(board);
            }
        }).not.toThrow(Error);
    })
})
