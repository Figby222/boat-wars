/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
import DOMControl from "./dom-control.js";

const MockDOM = () => ({
    append: jest.fn(() => {}),
    addEventListener: () => {},
    bgColor: "white",
});
const MockGameboard = () => ({
    receiveAttack: jest.fn(() => true)
})

let myDOM = new MockDOM();
let myGameboard = new MockGameboard();
beforeEach(() => {
    myDOM = new MockDOM();
    myGameboard = new MockGameboard();
})

describe("Constructor", () => {
    test("It exists", () => {
        expect(new DOMControl()).toBeDefined();
    })
})

describe("#renderGameboard", () => {

})