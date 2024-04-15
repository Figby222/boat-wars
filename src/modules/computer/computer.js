/* eslint-disable func-names */
class Computer {
    constructor(gameboard, advancedMode = false) {
        this.advancedMode = advancedMode;
        this.shotsArr = [];
        this.gameboard = gameboard;
        this.name = "computer";

        if (this.advancedMode) {
            let coordinateStack = [];
            this.shoot = function(enemyBoard) {
                const currentCoordinates = coordinateStack[coordinateStack.length-1];
                coordinateStack.pop();
                if (this.shotsArr.includes(JSON.stringify(currentCoordinates))) {
                    this.shoot(enemyBoard);
                    return;
                }

                if (currentCoordinates) {
                    this.shotsArr.push(JSON.stringify(currentCoordinates));
                    // try {
                        const cell = enemyBoard.getCell(currentCoordinates);
                        if (cell == null || cell.hit) {
                            this.shoot(enemyBoard);
                            return;
                        }
                        enemyBoard.receiveAttack(currentCoordinates);
                        if (cell.hasBoat) {
                            const [x, y] = currentCoordinates;

                            coordinateStack.push([x-1, y]);
                            coordinateStack.push([x, y-1]);
                            coordinateStack.push([x+1, y]);
                            coordinateStack.push([x, y+1]);
                        }
                    // } catch (err) {
                    //     this.shoot(enemyBoard);
                    // }

                    return;
                }

                // shoot random
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);
                const coordinates = [x, y];

                coordinateStack.push(coordinates);
                this.shoot(enemyBoard);
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

                const cell = enemyBoard.getCell(coordinates);
                if (cell == null || cell.hit) {
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