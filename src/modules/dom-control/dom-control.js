import "./styles.css";

const DOMControl = function() {

}

DOMControl.prototype.renderGameboard = function(gameboard, id, setVisible = false) {
    const boardContainer = document.querySelector(`#${id}`);
    boardContainer.textContent = "";

    for (let i = 0; i < gameboard.board.length; i+=1) {
        for (let i2 = 0; i2 < gameboard.board.length; i2+=1) {
            const cellContainer = document.createElement("div");
            cellContainer.classList.add("cell");

            const x = i;
            const y = i2;
            if (setVisible) {
                if (gameboard.board[x][y] == null) {
                    cellContainer.classList.add("notHit"); // hasn't been hit yet
                } else if (gameboard.board[x][y] === false) {
                    cellContainer.classList.add("miss");
                } else {
                    cellContainer.classList.add("boat");
                    cellContainer.classList.add("visible");
                    if (gameboard.board[x][y] === "destroyed") {
                        cellContainer.classList.add("hit");
                    }

                }
            } 
            
            // not setVisible
            else if (gameboard.board[x][y] !== false && gameboard.board[x][y] !== "destroyed") {
                cellContainer.classList.add("notHit"); // hasn't been hit yet
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

            
            if (cellContainer.classList.contains("notHit")) {
                cellContainer.addEventListener("click", () => {
                    cellContainer.classList.remove("notHit");
                    gameboard.receiveAttack([x, y]);
                    this.renderGameboard(gameboard, id, setVisible);
                })
            }
            boardContainer.appendChild(cellContainer);
        }
    }
}

export default DOMControl;