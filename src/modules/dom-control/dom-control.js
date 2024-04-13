const DOMControl = function(game) {
    this.game = game;
}

DOMControl.prototype.switchTurn = function(player1, player2) {
    this.currentTurn = this.currentTurn === player1 ? player2 : player1;
}

DOMControl.prototype.renderPlayer1Gameboard = function(setVisible = false) {
    const boardContainer = document.querySelector("#player1");
    boardContainer.textContent = "";
    const {gameboard} = this.game.player1;
    
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
                })
            }
            boardContainer.appendChild(cellContainer);
        }
    }
}

DOMControl.prototype.renderPlayer2Gameboard = function(setVisible) {
    const boardContainer = document.querySelector("#player2");
    boardContainer.textContent = "";
    const {gameboard} = this.game.player2;
    
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

DOMControl.prototype.placeBoats = function(player1Gameboard, player2Gameboard) {
    for (let i = 1; i < 5; i+=1) {
        const x = Math.floor(Math.random() * player1Gameboard.board.length);
        const y = Math.floor(Math.random() * player1Gameboard.board.length);
        const direction = Math.random() * 2 === 0 ? "x" : "y";
        let error = true;
        while (error) {
            error = false;
            try {
                player1Gameboard.placeBoat(i, [x, y], direction);
            } catch (err) {
                error = true;
            }
        }
        
        
    }

    for (let i = 1; i < 5;i+=1) {
        const x = Math.floor(Math.random() * player2Gameboard.board.length);
        const y = Math.floor(Math.random() * player2Gameboard.board.length);
        const direction = Math.random() * 2 === 0 ? "x" : "y";
        let error = true;
        while (error) {
            error = false;
            try {
                player2Gameboard.placeBoat(i, [x, y], direction);
            } catch (err) {
                error = true;
            }

        }

        
     } 
}

export default DOMControl;