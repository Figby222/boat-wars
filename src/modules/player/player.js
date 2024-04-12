const Player = function(gameboard, name) {
    this.gameboard = gameboard;
    this.isTurn = false;
    this.name = name;
}

Player.prototype.shoot = function(enemyBoard, coordinates) {
    enemyBoard.receiveAttack(coordinates);
}

export default Player;