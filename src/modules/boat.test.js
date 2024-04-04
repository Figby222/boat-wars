/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
import Boat from "./boat.js";

describe("Boat constructor works", () => {
    test ("Boat has property: hitCount", () => { // delete test if it breaks
        expect(new Boat()).toHaveProperty("hitCount")
    })

    test("Boat has property: length", () => {
        expect(new Boat()).toHaveProperty("length")
    })

    test("Boat has property isSunk", () => {
        expect(new Boat()).toHaveProperty("isSunk");
    })

    test("Boat returns obj containing correct properties", () => {
        const boat = new Boat(4);
        expect(boat).toMatchObject({
            length: 4,
            hitCount: 0,
            isSunk: false,
        })
    })
})

describe("Boat.hit", () => {
    test("It increments hitCount", () => {
        const boat = new Boat(4);
        boat.hit();
        expect(boat.hitCount).toBe(1);
    })

    test("isSunk is true when hitCount >= length", () => {
        const boat = new Boat(1);
        boat.hit();
        expect(boat.isSunk).toBe(true);
    })
})