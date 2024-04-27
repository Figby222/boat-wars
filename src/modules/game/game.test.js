// eslint-disable-next-line import/extensions
import Game from "./game.js";
import DOMControl from "../dom-control/dom-control.js";

let game;
let player1Gameboard;
let player2Gameboard;
beforeEach(() => {
    game = new Game(new DOMControl(), "player1");
    player1Gameboard = game.player1.gameboard;
    player2Gameboard = game.player2.gameboard;
})


describe("gameOver", () => {
    test("It returns true when no boats are placed", () => {
        expect (game.checkGameOver()).toBeDefined();
    })

    test("It does not return true if not all boats are destroyed", () => {
        game.player1.gameboard.placeBoatHorizontal(4, [0, 4]);
        game.player2.gameboard.placeBoatHorizontal(4, [0, 4]);

        expect(game.checkGameOver()).not.toBeTruthy();
    })
})

describe("playRound", () => {
    test("playRound shoots gameboard", () => {
        player1Gameboard.placeBoatHorizontal(1, [4, 3]);
        player2Gameboard.placeBoatHorizontal(1, [4, 3]);
        game.playRound([4, 3]);

        expect(game.checkGameOver()).toBeTruthy();
    })

    test("It switches turn after each call", () => {
        player1Gameboard.placeBoatHorizontal(1, [4, 3]);
        player2Gameboard.placeBoatHorizontal(1, [4, 3]);
        game.playRound([3, 3]);
        game.playRound([4, 3]);
        
        expect(game.checkGameOver()).toBe("player2");
    })
    
    test("Player1 shoots on the first turn", () => {
        player1Gameboard.placeBoatHorizontal(1, [4, 3]);
        player2Gameboard.placeBoatHorizontal(1, [4, 3]);
        game.playRound([4, 3]);
        
        expect(game.checkGameOver()).toBe("player1");
    })

})