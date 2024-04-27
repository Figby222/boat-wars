/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import DOMControl from "./dom-control.js";
import Gameboard from "../gameboard/gameboard.js";
import Boat from "../boat/boat.js";
import Game from "../game/game.js";

// const MockDOM = () => ({
//     append: jest.fn(() => {}),
//     addEventListener: () => {},
//     bgColor: "white",
//     querySelector: jest.fn(() => ({
//         classList: {
//             add: jest.fn(() => null)
//         },
//         append: jest.fn(() => {}),
//         addEventListener: () => {},
//         bgColor: "white",
//     })),
//     createElement: jest.fn(() => ({
//         classList: {
//             add: jest.fn(() => null)
//         },
//         append: jest.fn(() => {}),
//         addEventListener: () => {},
//         bgColor: "white",
//     })),
// });

// let myDOM = new MockDOM();
let DOMCtrl = new DOMControl();
let myBoard = new Gameboard();
beforeEach(() => {
    // myDOM = new MockDOM();
    DOMCtrl = new DOMControl();
    myBoard = new Gameboard();
})

describe("Constructor", () => {
    test.skip("It exists", () => {
        expect(new DOMControl()).toBeDefined();
    })
})

describe("#renderGameboard", () => {
    // test("It creates at least 20 elements", () => {
    //     DOMCtrl.renderGameboard(new Gameboard(), "player", myDOM)
    //     expect(myDOM.createElement.mock.calls.length).toBeGreaterThan(20);
    // });

    test.skip("It creates divs for board", () => {
        myBoard.placeBoat(new Boat(4), [0, 0], "x");
        DOMCtrl.renderGameboard(myBoard, "player1");
        expect(document.querySelector(".6 .4")).toBeDefined();
    })

    test.skip("It adds red background to div if boat exists at coordinates", () => {
        myBoard.placeBoat(new Boat(4), [0, 0], "x");
        DOMCtrl.renderGameboard(myBoard, "player1");
        expect(document.querySelector(".0 .0").bgColor).toEqual("darkGray");
    })
    
})

// describe("#placeBoats", () => {
//     test ("it does not throw error", () => {
//         const game = new Game("player1", "player2")
//         expect(() => DOMCtrl.placeBoats(
//             game.player1.gameboard,
//             game.player2.gameboard
//         )).not.toThrow();
//     });
//     test ("it sets gameboards with boats", () => {
//         const game = new Game("player1", "player2");
//         DOMCtrl.placeBoats(game.player1.gameboard, game.player2.gameboard);
//         expect(game.player1.gameboard.checkFleetDestruction()).toBeFalsy();
//     })
// })