import "./styles.css";

const DOMControl = function() {

}

DOMControl.prototype.renderGameboard = function(gameboard, id) {
    const boardContainer = document.createElement("div");
    boardContainer.id = id;
    boardContainer.classList.add("board");

    for (let i = 0; i < gameboard.board.length; i+=1) {
        for (let i2 = 0; i2 < gameboard.board.length; i2+=1) {
            const cellContainer = document.createElement("div");
            cellContainer.classList.add("cell");

            const x = i;
            const y = i2;

            if (gameboard.board[x][y] == null) {
                cellContainer.classList.add("notHit"); // hasn't been hit yet
            } else if (gameboard.board[x][y] === false) {
                cellContainer.classList.add("miss");
            } else {
                cellContainer.classList.add("hit");
            }
            boardContainer.appendChild(cellContainer);
        }
    }

    document.querySelector("body").appendChild(boardContainer);
}

export default DOMControl;