/* eslint-disable func-names */
class Computer {
    constructor(advancedMode = false) {
        this.advancedMode = advancedMode;
        this.shotsArr = [];

        if (this.advancedMode) {
            this.shoot = function() {
                
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