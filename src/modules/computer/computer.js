/* eslint-disable func-names */
class Computer {
    constructor(gameboard, advancedMode = false) {
        this.advancedMode = advancedMode;
        this.shotsArr = [];
        this.gameboard = gameboard;
        this.name = "computer";

        if (this.advancedMode) {
            const stack = [];
            this.shoot = function(enemyBoard) {
                stack.pop();
                const currentCoordinates = stack[stack.length-1];
                if (this.shotsArr.includes(JSON.stringify(currentCoordinates))) {
                    this.shoot(enemyBoard);
                }
            };
        } else {
            this.shoot = function(enemyBoard) {
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);
                const coordinates = [x, y];

                if (this.shotsArr.includes(JSON.stringify(coordinates))) {
                    this.shoot(enemyBoard);
                    return;
                }

                this.shotsArr.push(JSON.stringify(coordinates));
                enemyBoard.receiveAttack(coordinates);
            };
        }
    }
}

export default Computer;