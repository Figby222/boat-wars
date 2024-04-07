/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
import DOMControl from "./dom-control.js";

const MockDOM = () => ({
    append: jest.fn(() => {}),
    addEventListener: () => {},
    bgColor: "white",
});

let myDOM = new MockDOM();
beforeEach(() => {
    myDOM = new MockDOM();
})

describe("Constructor", () => {
    test("It exists", () => {
        expect(new DOMControl()).toBeDefined();
    })
})