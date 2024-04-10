// class Player {
//     constructor() {
//         this.shotsArr = [];
//     }

//     shoot(enemyBoard, coordinates) {
//         // if (this.shotsArr.includes(JSON.stringify(coordinates))) {
//         //     throw new Error("Cell has already been shot");
//         // }

//         // this.shotsArr.push(JSON.stringify(coordinates))
//         enemyBoard.receiveAttack(coordinates);
//     }
// }

const Player = function(gameboard) {
    this.gameboard = gameboard;
    this.isTurn = false;
}

Player.prototype.shoot = function(enemyBoard, coordinates) {
    enemyBoard.receiveAttack(coordinates);
}

export default Player;