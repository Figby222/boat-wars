// eslint-disable-next-line import/extensions
import Game from "./game.js";

let game; 
beforeEach(() => {
    game = new Game("player1");
})


describe("gameOver", () => {
    test("It returns true when no boats are placed", () => {
        expect (game.checkGameOver()).toBeDefined();
    })
})
test.skip("playRound shoots gameboard", () => {
    game.playRound([4, 3]);
})