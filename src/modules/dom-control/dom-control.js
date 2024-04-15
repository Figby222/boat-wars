const DOMControl = function(game) {
    this.game = game;
}

DOMControl.prototype.switchTurn = function(player1, player2) {
    this.currentTurn = this.currentTurn === player1 ? player2 : player1;
}

DOMControl.prototype.renderPlayer1Gameboard = function(game, gameboard, setVisible = false) {
    const boardContainer = document.querySelector("#player1");
    boardContainer.textContent = "";
    
    for (let x = gameboard.minX; x <= gameboard.maxX; x+=1) {
        for (let y = gameboard.minY; y <= gameboard.maxY; y+=1) {
            const cellContainer = document.createElement("div");
            cellContainer.classList.add("cell");

            
            if (setVisible) {
                if (gameboard.board[x][y].value === false) {
                    cellContainer.classList.add("miss");
                } else if (gameboard.board[x][y].value != null) {
                    cellContainer.classList.add("boat");
                    cellContainer.classList.add("visible");
                    if (gameboard.board[x][y].value === "destroyed") {
                        cellContainer.classList.add("hit");
                    }

                }
            } 
            
            // not setVisible
            else if (gameboard.board[x][y].value !== false && gameboard.board[x][y].value !== "destroyed") {
                cellContainer.classList.add("notShot"); // hasn't been hit yet
            } else if (gameboard.board[x][y].value === false) {
                cellContainer.classList.add("miss");
            } else {
                cellContainer.classList.add("boat");
                if (gameboard.board[x][y].value === "destroyed") {
                    cellContainer.classList.add("hit");
                } else if (setVisible) {
                    cellContainer.classList.add("visible");
                }
            }

            
            if (cellContainer.classList.contains("notShot")) {
                cellContainer.addEventListener("click", () => {
                    game.playRound([x, y]);
                })
            }
            boardContainer.appendChild(cellContainer);
        }
    }
}

DOMControl.prototype.renderPlayer2Gameboard = function(game, gameboard, setVisible) {
    const boardContainer = document.querySelector("#player2");
    boardContainer.textContent = "";
    
    for (let x = gameboard.minX; x <= gameboard.maxX; x+=1) {
        for (let y = gameboard.minY; y <= gameboard.maxY; y+=1) {
            const cellContainer = document.createElement("div");
            cellContainer.classList.add("cell");

            
            if (setVisible) {
                if (gameboard.board[x][y].value === false) {
                    cellContainer.classList.add("miss");
                } else if (gameboard.board[x][y].value != null) {
                    cellContainer.classList.add("boat");
                    cellContainer.classList.add("visible");
                    if (gameboard.board[x][y].value === "destroyed") {
                        cellContainer.classList.add("hit");
                    }

                }
            } 
            
            // not setVisible
            else if (gameboard.board[x][y].value !== false && gameboard.board[x][y].value !== "destroyed") {
                cellContainer.classList.add("notShot"); // hasn't been hit yet
            } else if (gameboard.board[x][y].value === false) {
                cellContainer.classList.add("miss");
            } else {
                cellContainer.classList.add("boat");
                if (gameboard.board[x][y].value === "destroyed") {
                    cellContainer.classList.add("hit");
                } else if (setVisible) {
                    cellContainer.classList.add("visible");
                }
            }

            
            if (cellContainer.classList.contains("notShot")) {
                cellContainer.addEventListener("click", () => {
                    game.playRound([x, y]);
                })
            }
            boardContainer.appendChild(cellContainer);
        }
    }
}


DOMControl.prototype.gameOver = function(winner) {
    document.querySelector(".grid-container").remove();
    
    const winBanner = document.createElement("div");
    winBanner.classList.add("win-banner");
    winBanner.textContent = `${winner} wins!`;
    
    document.querySelector("body").appendChild(winBanner);

}

export default DOMControl;