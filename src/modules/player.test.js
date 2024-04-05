/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import Player from "./player.js";

let player = new Player();

beforeEach(() => {
    player = new Player();
})
describe("#PlayerConstructor", () => {
    test("It structs obj", () => {
        expect(typeof(new Player())).toBe("object");
    })
})

describe("#shoot", () => {
    test("It returns coordinates", () => {
        const coordinates = [2, 2];
        expect(player.shoot(coordinates)).toEqual(coordinates)
    })

    test("It pushes coordinates to shotsArr", () => { // delete later
        player.shoot([2, 2]);
        expect(player.shotsArr).toContainEqual("[2,2]")
    })

    test("It throws error if coordinates have already been shot", () => {
        const coordinates = [2, 2]
        player.shoot(coordinates);
        expect(() => player.shoot(coordinates))
            .toThrow(new Error("Cell has already been shot"));
    })
})