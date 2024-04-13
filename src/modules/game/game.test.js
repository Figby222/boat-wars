// eslint-disable-next-line import/extensions
import Game from "./game.js";

let game;
let player1Gameboard;
let player2Gameboard;
beforeEach(() => {
    game = new Game("player1");
    player1Gameboard = game.player1.gameboard;
    player2Gameboard = game.player2.gameboard;
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

describe("playRound", () => {
    test("playRound shoots gameboard", () => {
        game.player1.gameboard.placeBoat(1, [4, 3]);
        game.player2.gameboard.placeBoat(1, [4, 3]);
        game.playRound([4, 3]);

        expect(game.checkGameOver()).toBeTruthy();
    })

})