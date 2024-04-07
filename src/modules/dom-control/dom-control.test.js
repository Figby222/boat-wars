/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
import DOMControl from "./dom-control.js";

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
const MockGameboard = () => ({
    receiveAttack: jest.fn(() => true)
})

let myDOM = new MockDOM();
let myGameboard = new MockGameboard();
let DOMCtrl = new DOMControl();
beforeEach(() => {
    myDOM = new MockDOM();
    myGameboard = new MockGameboard();
    DOMCtrl = new DOMControl();
})

describe("Constructor", () => {
    test("It exists", () => {
        expect(new DOMControl()).toBeDefined();
    })
})

describe("#renderGameboard", () => {
    test("It creates at least 20 elements", () => {

        expect()
    })
})