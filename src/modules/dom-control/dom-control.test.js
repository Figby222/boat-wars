/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import DOMControl from "./dom-control.js";
import Gameboard from "../gameboard/gameboard.js";

const MockDOM = () => ({
    append: jest.fn(() => {}),
    addEventListener: () => {},
    bgColor: "white",
    querySelector: jest.fn(() => ({
        classList: {
            add: jest.fn(() => null)
        },
        append: jest.fn(() => {}),
        addEventListener: () => {},
        bgColor: "white",
    })),
    createElement: jest.fn(() => ({
        classList: {
            add: jest.fn(() => null)
        },
        append: jest.fn(() => {}),
        addEventListener: () => {},
        bgColor: "white",
    })),
});

let myDOM = new MockDOM();
let DOMCtrl = new DOMControl();
beforeEach(() => {
    myDOM = new MockDOM();
    DOMCtrl = new DOMControl();
})

describe("Constructor", () => {
    test("It exists", () => {
        expect(new DOMControl()).toBeDefined();
    })
})

describe("#renderGameboard", () => {
    test("It creates at least 20 elements", () => {
        DOMCtrl.renderGameboard(new Gameboard(), "player", myDOM)
        expect(myDOM.createElement.mock.calls.length).toBeGreaterThan(20);
    });
})