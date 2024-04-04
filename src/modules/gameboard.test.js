/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import Gameboard from "./gameboard.js";

describe("Gameboard constructor", () => {
    test ("It has board property", () => {
        expect(new Gameboard()).toHaveProperty("board")
    })
})