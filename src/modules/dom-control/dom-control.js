import "./styles.css";

const DOMControl = function() {

}

DOMControl.prototype.renderGameboard = function(gameboard, id, setVisible = false) {
    const boardContainer = document.querySelector(`#${id}`);
    boardContainer.textContent = "";

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
                    gameboard.receiveAttack([x, y]);
                    this.renderGameboard(gameboard, id, setVisible);
                })
            }
            boardContainer.appendChild(cellContainer);
        }
    }
}

export default DOMControl;