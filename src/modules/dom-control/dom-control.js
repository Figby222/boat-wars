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
            const cell = gameboard.board[x][y];

            
            if (setVisible) {
                this.addVisibleAttributes(cell, cellContainer)
            } else { // not setVisible
                this.addAttributes(cell, cellContainer);
            }

            
            if (!(cell.hit)) {
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
            const cell = gameboard.board[x][y];

            
            if (setVisible) {
                this.addVisibleAttributes(cell, cellContainer)
            } else { // not setVisible
                this.addAttributes(cell, cellContainer);
            }

            
            if (!(cell.hit)) {
                cellContainer.addEventListener("click", () => {
                    game.playRound([x, y]);
                })
            }
            boardContainer.appendChild(cellContainer);
        }
    }
}

DOMControl.prototype.addVisibleAttributes = function(cell, container) {
    const {value} = cell;
    
    
    if (value === false) { // or if value is unavailable
        container.classList.add("miss");
        return;
    }
    
    if (value === "destroyed") {
        container.classList.add("boat");
        container.classList.add("hit");
        return;
    }

    if (typeof value === "object" && value != null) {
        container.classList.add("visible");
        container.classList.add("boat");
        return;
    }
    
    if (!cell.hit) {
        container.classList.add("notShot");
    }
    
}

DOMControl.prototype.addAttributes = function(cell, container) {
    const {value} = cell;
    if (!cell.hit) {
        container.classList.add("notShot");
        return;
    }

    if (value === false) { // or if value is unavailable
        container.classList.add("miss");
        return;
    }

    if (value === "destroyed") {
        container.classList.add("boat");
        container.classList.add("hit");
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