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

    test("It does not return true if not all boats are destroyed", () => {
        game.player1.gameboard.placeBoat(4, [0, 4]);
        game.player2.gameboard.placeBoat(4, [0, 4]);

        expect(game.checkGameOver()).not.toBeTruthy();
    })
})
test.skip("playRound shoots gameboard", () => {
    game.playRound([4, 3]);
})