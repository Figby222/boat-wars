/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import Player from "./player.js";

describe("#PlayerConstructor", () => {
    test("It structs obj", () => {
        expect(typeof(new Player())).toBe("object");
    })
})