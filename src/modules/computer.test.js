/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import Computer from "./computer.js";

describe("Constructor", () => {
    test("It creates object", () => {
        expect(typeof new Computer()).toBe("object");
    })

    test("It creates object with advanced mode", () => {
        expect(new Computer(true).advancedMode).toBe(true);
    })
})