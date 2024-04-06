/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import Computer from "./computer.js";

const MockGameboard = {receiveAttack: jest.fn(() => true)};
describe("Constructor", () => {
    test("It creates object", () => {
        expect(typeof new Computer()).toBe("object");
    })

    test("It creates object with advanced mode", () => {
        expect(new Computer(true).advancedMode).toBe(true);
    })
})

describe("#shoot", () => {
    test("It calls receiveAttack once", () => {
        const computer = new Computer(false);
        computer.shoot(MockGameboard);
        expect (MockGameboard.receiveAttack.mock.calls).toHaveLength(1);
    })
})