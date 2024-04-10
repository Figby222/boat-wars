const DOMControl = function(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentTurn = player1;
}

DOMControl.prototype.switchTurn = function(player1, player2) {
    this.currentTurn = this.currentTurn === player1 ? player2 : player1;
}

DOMControl.prototype.renderGameboard = function(player, id, setVisible = false) {
    const boardContainer = document.querySelector(`#${id}`);
    boardContainer.textContent = "";
    const {gameboard} = player;
    
    for (let x = 0; x < gameboard.board.length; x+=1) {
        for (let y = 0; y < gameboard.board.length; y+=1) {
            const cellContainer = document.createElement("div");
            cellContainer.classList.add("cell");

            
            if (setVisible) {
                if (gameboard.board[x][y] === false) {
                    cellContainer.classList.add("miss");
                } else if (gameboard.board[x][y] != null) {
                    cellContainer.classList.add("boat");
                    cellContainer.classList.add("visible");
                    if (gameboard.board[x][y] === "destroyed") {
                        cellContainer.classList.add("hit");
                    }

                }
            } 
            
            // not setVisible
            else if (gameboard.board[x][y] !== false && gameboard.board[x][y] !== "destroyed") {
                cellContainer.classList.add("notShot"); // hasn't been hit yet
            } else if (gameboard.board[x][y] === false) {
                cellContainer.classList.add("miss");
            } else {
                cellContainer.classList.add("boat");
                if (gameboard.board[x][y] === "destroyed") {
                    cellContainer.classList.add("hit");
                } else if (setVisible) {
                    cellContainer.classList.add("visible");
                }
            }

            
            if (cellContainer.classList.contains("notShot")) {
                cellContainer.addEventListener("click", () => {
                    if (this.currentTurn !== this.player2) {
                        gameboard.receiveAttack([x, y]);
                    }

                    this.player2.shoot(this.player1.gameboard);
                    
                    if (this.player1.gameboard.checkFleetDestruction()) {
                        this.gameOver("Player2")
                        return;
                    } 
                    
                    if (this.player2.gameboard.checkFleetDestruction()) {
                        this.gameOver("Player1")
                        return;
                    }

                    this.renderGameboard(this.player1, "player1", true);
                    this.renderGameboard(this.player2, "player2", false);
                    
                    this.switchTurn();
                })
            }
            boardContainer.appendChild(cellContainer);
        }
    }
}


DOMControl.prototype.gameOver = function(winner) {
    document.querySelector("#player1").remove();
    document.querySelector("#player2").remove();
    
    const winBanner = document.createElement("div");
    winBanner.classList.add("win-banner");
    winBanner.textContent = `${winner} wins!`;
    
    document.querySelector("body").appendChild(winBanner);

}

export default DOMControl;