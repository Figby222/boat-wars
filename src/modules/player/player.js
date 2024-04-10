const Player = function(gameboard) {
    this.gameboard = gameboard;
    this.isTurn = false;
}

Player.prototype.shoot = function(enemyBoard, coordinates) {
    enemyBoard.receiveAttack(coordinates);
}

export default Player;