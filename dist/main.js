"use strict";
(self["webpackChunkwebpack_template"] = self["webpackChunkwebpack_template"] || []).push([["main"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_dom_control_dom_control_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/dom-control/dom-control.js */ "./src/modules/dom-control/dom-control.js");
/* harmony import */ var _modules_game_game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/game/game.js */ "./src/modules/game/game.js");
/* eslint-disable no-unused-vars */


const display = new _modules_dom_control_dom_control_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const game = new _modules_game_game_js__WEBPACK_IMPORTED_MODULE_1__["default"](display, true, true);
game.player1.gameboard.placeBoats();
game.player2.gameboard.placeBoats();
display.renderPlayer1Gameboard(game, game.player1.gameboard, true);
display.renderPlayer2Gameboard(game, game.player2.gameboard, true);
const randomizeBoatsBtn = document.querySelector(".randomize-boats");
const startGameBtn = document.querySelector(".start-game");
randomizeBoatsBtn.addEventListener("click", e => {
  e.preventDefault();
  game.player1.gameboard.placeBoats();
  game.player2.gameboard.placeBoats();
  display.renderPlayer1Gameboard(game, game.player1.gameboard, true);
  display.renderPlayer2Gameboard(game, game.player2.gameboard, true);
});
startGameBtn.addEventListener("click", e => {
  e.preventDefault();
  randomizeBoatsBtn.remove();
  startGameBtn.remove();
  display.renderPlayer1Gameboard(game, game.player1.gameboard, true);
  display.renderPlayer2Gameboard(game, game.player2.gameboard, false);
});

/***/ }),

/***/ "./src/modules/boat/boat.js":
/*!**********************************!*\
  !*** ./src/modules/boat/boat.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable no-underscore-dangle */
class Boat {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
    this._isSunk = false;
    this.adjacentCoordinatesArr = [];
  }
  hit() {
    this.hitCount += 1;
  }
  isSunk() {
    if (this.hitCount >= this.length) {
      this._isSunk = true;
    }
    return this._isSunk;
  }
}
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Boat);

/***/ }),

/***/ "./src/modules/computer/computer.js":
/*!******************************************!*\
  !*** ./src/modules/computer/computer.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable func-names */
class Computer {
  constructor(gameboard) {
    let advancedMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    this.advancedMode = advancedMode;
    this.shotsArr = [];
    this.gameboard = gameboard;
    this.name = "computer";
    if (this.advancedMode) {
      let coordinateStack = [];
      this.shoot = function (enemyBoard) {
        const currentCoordinates = coordinateStack[coordinateStack.length - 1];
        coordinateStack.pop();
        if (this.shotsArr.includes(JSON.stringify(currentCoordinates))) {
          this.shoot(enemyBoard);
          return;
        }
        if (currentCoordinates) {
          this.shotsArr.push(JSON.stringify(currentCoordinates));
          // try {
          const cell = enemyBoard.getCell(currentCoordinates);
          if (cell == null || cell.hit) {
            this.shoot(enemyBoard);
            return;
          }
          enemyBoard.receiveAttack(currentCoordinates);
          if (cell.hasBoat) {
            const [x, y] = currentCoordinates;
            coordinateStack.push([x - 1, y]);
            coordinateStack.push([x, y - 1]);
            coordinateStack.push([x + 1, y]);
            coordinateStack.push([x, y + 1]);
          }
          // } catch (err) {
          //     this.shoot(enemyBoard);
          // }

          return;
        }

        // shoot random
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const coordinates = [x, y];
        coordinateStack.push(coordinates);
        this.shoot(enemyBoard);
      };
    } else {
      this.shoot = function (enemyBoard) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const coordinates = [x, y];
        if (this.shotsArr.includes(JSON.stringify(coordinates))) {
          this.shoot(enemyBoard);
          return;
        }
        const cell = enemyBoard.getCell(coordinates);
        if (cell == null || cell.hit) {
          this.shoot(enemyBoard);
          return;
        }
        this.shotsArr.push(JSON.stringify(coordinates));
        enemyBoard.receiveAttack(coordinates);
      };
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Computer);

/***/ }),

/***/ "./src/modules/dom-control/dom-control.js":
/*!************************************************!*\
  !*** ./src/modules/dom-control/dom-control.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const DOMControl = function (game) {
  this.game = game;
};
DOMControl.prototype.switchTurn = function (player1, player2) {
  this.currentTurn = this.currentTurn === player1 ? player2 : player1;
};
DOMControl.prototype.renderPlayer1Gameboard = function (game, gameboard) {
  let setVisible = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  const boardContainer = document.querySelector("#player1");
  boardContainer.textContent = "";
  for (let x = gameboard.minX; x <= gameboard.maxX; x += 1) {
    for (let y = gameboard.minY; y <= gameboard.maxY; y += 1) {
      const cellContainer = document.createElement("div");
      cellContainer.classList.add("cell");
      const cell = gameboard.board[x][y];
      if (setVisible) {
        this.addVisibleAttributes(cell, cellContainer);
      } else {
        // not setVisible
        this.addAttributes(cell, cellContainer);
      }
      if (!setVisible && !cell.hit) {
        cellContainer.addEventListener("click", () => {
          game.playRound([x, y]);
        });
      }
      boardContainer.appendChild(cellContainer);
    }
  }
};
DOMControl.prototype.renderPlayer2Gameboard = function (game, gameboard, setVisible) {
  const boardContainer = document.querySelector("#player2");
  boardContainer.textContent = "";
  for (let x = gameboard.minX; x <= gameboard.maxX; x += 1) {
    for (let y = gameboard.minY; y <= gameboard.maxY; y += 1) {
      const cellContainer = document.createElement("div");
      cellContainer.classList.add("cell");
      const cell = gameboard.board[x][y];
      if (setVisible) {
        this.addVisibleAttributes(cell, cellContainer);
      } else {
        // not setVisible
        this.addAttributes(cell, cellContainer);
      }
      if (!setVisible && !cell.hit) {
        cellContainer.addEventListener("click", () => {
          game.playRound([x, y]);
        });
      }
      boardContainer.appendChild(cellContainer);
    }
  }
};
DOMControl.prototype.addVisibleAttributes = function (cell, container) {
  const {
    value
  } = cell;
  if (value === false) {
    // or if value is unavailable
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
};
DOMControl.prototype.addAttributes = function (cell, container) {
  const {
    value
  } = cell;
  if (!cell.hit) {
    container.classList.add("notShot");
    return;
  }
  if (value === false) {
    // or if value is unavailable
    container.classList.add("miss");
    return;
  }
  if (value === "destroyed") {
    container.classList.add("boat");
    container.classList.add("hit");
  }
};
DOMControl.prototype.gameOver = function (winner) {
  document.querySelector(".grid-container").remove();
  const winBanner = document.createElement("div");
  winBanner.classList.add("win-banner");
  winBanner.textContent = `${winner} wins!`;
  document.querySelector("body").appendChild(winBanner);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOMControl);

/***/ }),

/***/ "./src/modules/game/game.js":
/*!**********************************!*\
  !*** ./src/modules/game/game.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _player_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../player/player.js */ "./src/modules/player/player.js");
/* harmony import */ var _gameboard_gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gameboard/gameboard.js */ "./src/modules/gameboard/gameboard.js");
/* harmony import */ var _computer_computer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../computer/computer.js */ "./src/modules/computer/computer.js");



class Game {
  constructor(display) {
    let player2Computer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let advancedMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    this.display = display;
    this.player1 = new _player_player_js__WEBPACK_IMPORTED_MODULE_0__["default"](new _gameboard_gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"](), "player1");
    if (player2Computer) {
      this.player2 = new _computer_computer_js__WEBPACK_IMPORTED_MODULE_2__["default"](new _gameboard_gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"](), advancedMode);
    } else {
      this.player2 = new _player_player_js__WEBPACK_IMPORTED_MODULE_0__["default"](new _gameboard_gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"](), "player2");
    }
    this.currentTurn = this.player1;
  }
  switchTurn() {
    this.currentTurn = this.currentTurn === this.player1 ? this.player2 : this.player1;
  }
  playRound(coordinates) {
    if (this.player2.name === "computer") {
      const enemyBoard = this.player2.gameboard;
      const playerBoard = this.player1.gameboard;
      this.player1.shoot(enemyBoard, coordinates);
      this.player2.shoot(playerBoard);
      this.display.renderPlayer1Gameboard(this, playerBoard, true);
      this.display.renderPlayer2Gameboard(this, enemyBoard, false);
    } else {
      if (this.currentTurn === this.player1) {
        const enemyBoard = this.player2.gameboard;
        this.player1.shoot(enemyBoard, coordinates);
        this.display.renderPlayer1Gameboard(this, this.player1.gameboard, false);
        this.display.renderPlayer2Gameboard(this, this.player2.gameboard, true);
      } else {
        const enemyBoard = this.player1.gameboard;
        this.player2.shoot(enemyBoard, coordinates);
        this.display.renderPlayer1Gameboard(this, this.player1.gameboard, true);
        this.display.renderPlayer2Gameboard(this, this.player2.gameboard, false);
      }
      this.switchTurn();
    }
    const winner = this.checkGameOver();
    if (winner) {
      this.display.gameOver(winner);
    }
  }
  checkGameOver() {
    const player1Gameboard = this.player1.gameboard;
    const player2Gameboard = this.player2.gameboard;
    if (player1Gameboard.checkFleetDestruction()) {
      return "player2";
    }
    if (player2Gameboard.checkFleetDestruction()) {
      return "player1";
    }
    return false;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

/***/ }),

/***/ "./src/modules/gameboard/gameboard.js":
/*!********************************************!*\
  !*** ./src/modules/gameboard/gameboard.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _boat_boat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../boat/boat.js */ "./src/modules/boat/boat.js");
// eslint-disable-next-line import/extensions

class Gameboard {
  constructor() {
    this.board = Gameboard.setBoard();
    this.minX = 0;
    this.maxX = 9;
    this.minY = 0;
    this.maxY = 9;
  }
  static setBoard() {
    const board = [];
    for (let i = 0; i <= 9; i += 1) {
      board.push([]);
      for (let i2 = 0; i2 <= 9; i2 += 1) {
        board[i].push({
          value: null,
          hit: false,
          hasBoat: false,
          coordinates: [i, i2]
        });
      }
    }
    return board;
  }
  placeBoatHorizontal(boatLength, coordinates) {
    const boat = new _boat_boat_js__WEBPACK_IMPORTED_MODULE_0__["default"](boatLength);
    const [x, y] = coordinates;
    const board = Object.assign([], this.board);
    const coordinatesArray = [];
    for (let i = 0; i < boat.length; i += 1) {
      if (this.checkIfOutOfBounds([x + i, y])) {
        // change later
        throw new Error("Boat out of bounds");
      }
      if (board[x + i][y].value != null) {
        throw new Error("Boat collides with another boat");
      }
      coordinatesArray.push([x + i, y]);
    }
    for (let i = 0; i < coordinatesArray.length; i += 1) {
      const currentX = coordinatesArray[i][0];
      const currentY = coordinatesArray[i][1];
      this.board[currentX][currentY].value = boat;
      this.board[currentX][currentY].hasBoat = true;
    }
    // this.board = board;
    for (let i = 0; i < coordinatesArray.length; i += 1) {
      const currentX = coordinatesArray[i][0];
      const currentY = coordinatesArray[i][1];
      const adjacentCells = this.getAdjacentCellCoordinates([currentX, currentY]);
      adjacentCells.forEach(coordinates => {
        if (!this.checkIfOutOfBounds(coordinates) && !(this.getCell(coordinates).value instanceof _boat_boat_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
          this.getCell(coordinates).value = "unavailable";
          boat.adjacentCoordinatesArr.push(coordinates);
        }
      });
    }
    // this.board = board;
  }
  placeBoatVertical(boatLength, coordinates) {
    const boat = new _boat_boat_js__WEBPACK_IMPORTED_MODULE_0__["default"](boatLength);
    const [x, y] = coordinates;
    const board = Object.assign([], this.board);
    const coordinatesArray = [];
    for (let i = 0; i < boat.length; i += 1) {
      if (this.checkIfOutOfBounds([x, y + i])) {
        throw new Error("Boat out of bounds");
      }
      if (board[x][y + i].value != null) {
        throw new Error("Boat collides with another boat");
      }
      coordinatesArray.push([x, y + i]);
    }
    for (let i = 0; i < coordinatesArray.length; i += 1) {
      const currentX = coordinatesArray[i][0];
      const currentY = coordinatesArray[i][1];
      this.board[currentX][currentY].value = boat;
      this.board[currentX][currentY].hasBoat = true;
    }
    for (let i = 0; i < coordinatesArray.length; i += 1) {
      const currentX = coordinatesArray[i][0];
      const currentY = coordinatesArray[i][1];
      const adjacentCells = this.getAdjacentCellCoordinates([currentX, currentY]);
      adjacentCells.forEach(coordinates => {
        if (!this.checkIfOutOfBounds(coordinates) && !(this.getCell(coordinates).value instanceof _boat_boat_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
          this.getCell(coordinates).value = "unavailable";
          boat.adjacentCoordinatesArr.push(coordinates);
        }
      });
    }
  }
  getCell(coordinates) {
    const [x, y] = coordinates;
    if (x < this.minX || x > this.maxX || y < this.minX || y > this.maxX) {
      return null;
    }
    return this.board[x][y];
  }
  getAdjacentCellCoordinates(coordinates) {
    const [x, y] = coordinates;
    return [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1], [x - 1, y - 1], [x + 1, y - 1], [x - 1, y + 1], [x + 1, y + 1]];
  }
  shootAdjacentCells(cell) {
    const {
      adjacentCoordinatesArr
    } = cell.value;
    // const adjacentCoordinates = this.getAdjacentCellCoordinates(coordinates);

    adjacentCoordinatesArr.forEach(currentCoordinates => {
      const currCell = this.getCell(currentCoordinates);
      if (currCell) {
        this.receiveAttack(currentCoordinates);
      }
    });
  }
  checkIfOutOfBounds(coordinates) {
    const [x, y] = coordinates;
    if (x < this.minX || x > this.maxX || y < this.minY || y > this.maxY) {
      return true;
    }
    return false;
  }
  receiveAttack(coordinates) {
    const [x, y] = coordinates;
    if (this.checkIfOutOfBounds(coordinates)) {
      throw new Error("Coordinates are out of bounds");
    }
    const cell = this.board[x][y];
    cell.hit = true;
    if (cell.value instanceof _boat_boat_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
      cell.value.hit();
      if (cell.value.isSunk()) {
        this.shootAdjacentCells(cell);
      }
      cell.value = "destroyed";
      return cell;
    }
    this.board[x][y].value = false;
    return cell;
  }
  checkFleetDestruction() {
    for (let row = this.minX; row <= this.maxX; row += 1) {
      for (let column = this.minY; column < this.maxY; column += 1) {
        const currentCell = this.board[row][column];
        if (currentCell.value instanceof _boat_boat_js__WEBPACK_IMPORTED_MODULE_0__["default"] && !currentCell.value.isSunk()) {
          return false;
        }
      }
    }
    return true;
  }
  placeBoats() {
    this.board = Gameboard.setBoard();
    for (let i = 1; i < 5; i += 1) {
      const x = Math.floor(Math.random() * this.board.length);
      const y = Math.floor(Math.random() * this.board.length);
      const direction = Math.floor(Math.random() * 2) === 0 ? "x" : "y";
      if (direction === "x") {
        try {
          this.placeBoatHorizontal(i, [x, y]);
        } catch (err) {
          i -= 1;
        }
      } else if (direction === "y") {
        try {
          this.placeBoatVertical(i, [x, y]);
        } catch (err) {
          i -= 1;
        }
      }
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/modules/player/player.js":
/*!**************************************!*\
  !*** ./src/modules/player/player.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Player = function (gameboard, name) {
  this.gameboard = gameboard;
  this.isTurn = false;
  this.name = name;
};
Player.prototype.shoot = function (enemyBoard, coordinates) {
  enemyBoard.receiveAttack(coordinates);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUM4RDtBQUNwQjtBQUkxQyxNQUFNRSxPQUFPLEdBQUcsSUFBSUYsMkVBQVUsQ0FBQyxDQUFDO0FBQ2hDLE1BQU1HLElBQUksR0FBRyxJQUFJRiw2REFBSSxDQUFDQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztBQUUxQ0MsSUFBSSxDQUFDQyxPQUFPLENBQUNDLFNBQVMsQ0FBQ0MsVUFBVSxDQUFDLENBQUM7QUFDbkNILElBQUksQ0FBQ0ksT0FBTyxDQUFDRixTQUFTLENBQUNDLFVBQVUsQ0FBQyxDQUFDO0FBQ25DSixPQUFPLENBQUNNLHNCQUFzQixDQUFDTCxJQUFJLEVBQUVBLElBQUksQ0FBQ0MsT0FBTyxDQUFDQyxTQUFTLEVBQUUsSUFBSSxDQUFDO0FBQ2xFSCxPQUFPLENBQUNPLHNCQUFzQixDQUFDTixJQUFJLEVBQUVBLElBQUksQ0FBQ0ksT0FBTyxDQUFDRixTQUFTLEVBQUUsSUFBSSxDQUFDO0FBRWxFLE1BQU1LLGlCQUFpQixHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztBQUNwRSxNQUFNQyxZQUFZLEdBQUdGLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGFBQWEsQ0FBQztBQUUxREYsaUJBQWlCLENBQUNJLGdCQUFnQixDQUFDLE9BQU8sRUFBR0MsQ0FBQyxJQUFLO0VBQy9DQSxDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0VBQ2xCYixJQUFJLENBQUNDLE9BQU8sQ0FBQ0MsU0FBUyxDQUFDQyxVQUFVLENBQUMsQ0FBQztFQUNuQ0gsSUFBSSxDQUFDSSxPQUFPLENBQUNGLFNBQVMsQ0FBQ0MsVUFBVSxDQUFDLENBQUM7RUFFbkNKLE9BQU8sQ0FBQ00sc0JBQXNCLENBQUNMLElBQUksRUFBRUEsSUFBSSxDQUFDQyxPQUFPLENBQUNDLFNBQVMsRUFBRSxJQUFJLENBQUM7RUFDbEVILE9BQU8sQ0FBQ08sc0JBQXNCLENBQUNOLElBQUksRUFBRUEsSUFBSSxDQUFDSSxPQUFPLENBQUNGLFNBQVMsRUFBRSxJQUFJLENBQUM7QUFDdEUsQ0FBQyxDQUFDO0FBRUZRLFlBQVksQ0FBQ0MsZ0JBQWdCLENBQUMsT0FBTyxFQUFHQyxDQUFDLElBQUs7RUFDMUNBLENBQUMsQ0FBQ0MsY0FBYyxDQUFDLENBQUM7RUFFbEJOLGlCQUFpQixDQUFDTyxNQUFNLENBQUMsQ0FBQztFQUMxQkosWUFBWSxDQUFDSSxNQUFNLENBQUMsQ0FBQztFQUVyQmYsT0FBTyxDQUFDTSxzQkFBc0IsQ0FBQ0wsSUFBSSxFQUFFQSxJQUFJLENBQUNDLE9BQU8sQ0FBQ0MsU0FBUyxFQUFFLElBQUksQ0FBQztFQUNsRUgsT0FBTyxDQUFDTyxzQkFBc0IsQ0FBQ04sSUFBSSxFQUFFQSxJQUFJLENBQUNJLE9BQU8sQ0FBQ0YsU0FBUyxFQUFFLEtBQUssQ0FBQztBQUN2RSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDbENGO0FBQ0EsTUFBTWEsSUFBSSxDQUFDO0VBQ1BDLFdBQVdBLENBQUNDLE1BQU0sRUFBRTtJQUNoQixJQUFJLENBQUNBLE1BQU0sR0FBR0EsTUFBTTtJQUNwQixJQUFJLENBQUNDLFFBQVEsR0FBRyxDQUFDO0lBQ2pCLElBQUksQ0FBQ0MsT0FBTyxHQUFHLEtBQUs7SUFDcEIsSUFBSSxDQUFDQyxzQkFBc0IsR0FBRyxFQUFFO0VBQ3BDO0VBRUFDLEdBQUdBLENBQUEsRUFBRztJQUNGLElBQUksQ0FBQ0gsUUFBUSxJQUFFLENBQUM7RUFHcEI7RUFFQUksTUFBTUEsQ0FBQSxFQUFHO0lBQ0wsSUFBSSxJQUFJLENBQUNKLFFBQVEsSUFBSSxJQUFJLENBQUNELE1BQU0sRUFBRTtNQUM5QixJQUFJLENBQUNFLE9BQU8sR0FBRyxJQUFJO0lBQ3ZCO0lBRUEsT0FBTyxJQUFJLENBQUNBLE9BQU87RUFDdkI7QUFDSjtBQUFDO0FBRUQsaUVBQWVKLElBQUk7Ozs7Ozs7Ozs7Ozs7O0FDeEJuQjtBQUNBLE1BQU1RLFFBQVEsQ0FBQztFQUNYUCxXQUFXQSxDQUFDZCxTQUFTLEVBQXdCO0lBQUEsSUFBdEJzQixZQUFZLEdBQUFDLFNBQUEsQ0FBQVIsTUFBQSxRQUFBUSxTQUFBLFFBQUFDLFNBQUEsR0FBQUQsU0FBQSxNQUFHLEtBQUs7SUFDdkMsSUFBSSxDQUFDRCxZQUFZLEdBQUdBLFlBQVk7SUFDaEMsSUFBSSxDQUFDRyxRQUFRLEdBQUcsRUFBRTtJQUNsQixJQUFJLENBQUN6QixTQUFTLEdBQUdBLFNBQVM7SUFDMUIsSUFBSSxDQUFDMEIsSUFBSSxHQUFHLFVBQVU7SUFFdEIsSUFBSSxJQUFJLENBQUNKLFlBQVksRUFBRTtNQUNuQixJQUFJSyxlQUFlLEdBQUcsRUFBRTtNQUN4QixJQUFJLENBQUNDLEtBQUssR0FBRyxVQUFTQyxVQUFVLEVBQUU7UUFDOUIsTUFBTUMsa0JBQWtCLEdBQUdILGVBQWUsQ0FBQ0EsZUFBZSxDQUFDWixNQUFNLEdBQUMsQ0FBQyxDQUFDO1FBQ3BFWSxlQUFlLENBQUNJLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksSUFBSSxDQUFDTixRQUFRLENBQUNPLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDQyxTQUFTLENBQUNKLGtCQUFrQixDQUFDLENBQUMsRUFBRTtVQUM1RCxJQUFJLENBQUNGLEtBQUssQ0FBQ0MsVUFBVSxDQUFDO1VBQ3RCO1FBQ0o7UUFFQSxJQUFJQyxrQkFBa0IsRUFBRTtVQUNwQixJQUFJLENBQUNMLFFBQVEsQ0FBQ1UsSUFBSSxDQUFDRixJQUFJLENBQUNDLFNBQVMsQ0FBQ0osa0JBQWtCLENBQUMsQ0FBQztVQUN0RDtVQUNJLE1BQU1NLElBQUksR0FBR1AsVUFBVSxDQUFDUSxPQUFPLENBQUNQLGtCQUFrQixDQUFDO1VBQ25ELElBQUlNLElBQUksSUFBSSxJQUFJLElBQUlBLElBQUksQ0FBQ2pCLEdBQUcsRUFBRTtZQUMxQixJQUFJLENBQUNTLEtBQUssQ0FBQ0MsVUFBVSxDQUFDO1lBQ3RCO1VBQ0o7VUFDQUEsVUFBVSxDQUFDUyxhQUFhLENBQUNSLGtCQUFrQixDQUFDO1VBQzVDLElBQUlNLElBQUksQ0FBQ0csT0FBTyxFQUFFO1lBQ2QsTUFBTSxDQUFDQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxHQUFHWCxrQkFBa0I7WUFFakNILGVBQWUsQ0FBQ1EsSUFBSSxDQUFDLENBQUNLLENBQUMsR0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDO1lBQzlCZCxlQUFlLENBQUNRLElBQUksQ0FBQyxDQUFDSyxDQUFDLEVBQUVDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QmQsZUFBZSxDQUFDUSxJQUFJLENBQUMsQ0FBQ0ssQ0FBQyxHQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUM7WUFDOUJkLGVBQWUsQ0FBQ1EsSUFBSSxDQUFDLENBQUNLLENBQUMsRUFBRUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO1VBQ2xDO1VBQ0o7VUFDQTtVQUNBOztVQUVBO1FBQ0o7O1FBRUE7UUFDQSxNQUFNRCxDQUFDLEdBQUdFLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3hDLE1BQU1ILENBQUMsR0FBR0MsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDeEMsTUFBTUMsV0FBVyxHQUFHLENBQUNMLENBQUMsRUFBRUMsQ0FBQyxDQUFDO1FBRTFCZCxlQUFlLENBQUNRLElBQUksQ0FBQ1UsV0FBVyxDQUFDO1FBQ2pDLElBQUksQ0FBQ2pCLEtBQUssQ0FBQ0MsVUFBVSxDQUFDO01BQzFCLENBQUM7SUFDTCxDQUFDLE1BQU07TUFDSCxJQUFJLENBQUNELEtBQUssR0FBRyxVQUFTQyxVQUFVLEVBQUU7UUFDOUIsTUFBTVcsQ0FBQyxHQUFHRSxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN4QyxNQUFNSCxDQUFDLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3hDLE1BQU1DLFdBQVcsR0FBRyxDQUFDTCxDQUFDLEVBQUVDLENBQUMsQ0FBQztRQUUxQixJQUFJLElBQUksQ0FBQ2hCLFFBQVEsQ0FBQ08sUUFBUSxDQUFDQyxJQUFJLENBQUNDLFNBQVMsQ0FBQ1csV0FBVyxDQUFDLENBQUMsRUFBRTtVQUNyRCxJQUFJLENBQUNqQixLQUFLLENBQUNDLFVBQVUsQ0FBQztVQUN0QjtRQUNKO1FBRUEsTUFBTU8sSUFBSSxHQUFHUCxVQUFVLENBQUNRLE9BQU8sQ0FBQ1EsV0FBVyxDQUFDO1FBQzVDLElBQUlULElBQUksSUFBSSxJQUFJLElBQUlBLElBQUksQ0FBQ2pCLEdBQUcsRUFBRTtVQUMxQixJQUFJLENBQUNTLEtBQUssQ0FBQ0MsVUFBVSxDQUFDO1VBQ3RCO1FBQ0o7UUFFQSxJQUFJLENBQUNKLFFBQVEsQ0FBQ1UsSUFBSSxDQUFDRixJQUFJLENBQUNDLFNBQVMsQ0FBQ1csV0FBVyxDQUFDLENBQUM7UUFDL0NoQixVQUFVLENBQUNTLGFBQWEsQ0FBQ08sV0FBVyxDQUFDO01BQ3pDLENBQUM7SUFDTDtFQUNKO0FBQ0o7QUFFQSxpRUFBZXhCLFFBQVE7Ozs7Ozs7Ozs7Ozs7O0FDMUV2QixNQUFNMUIsVUFBVSxHQUFHLFNBQUFBLENBQVNHLElBQUksRUFBRTtFQUM5QixJQUFJLENBQUNBLElBQUksR0FBR0EsSUFBSTtBQUNwQixDQUFDO0FBRURILFVBQVUsQ0FBQ21ELFNBQVMsQ0FBQ0MsVUFBVSxHQUFHLFVBQVNoRCxPQUFPLEVBQUVHLE9BQU8sRUFBRTtFQUN6RCxJQUFJLENBQUM4QyxXQUFXLEdBQUcsSUFBSSxDQUFDQSxXQUFXLEtBQUtqRCxPQUFPLEdBQUdHLE9BQU8sR0FBR0gsT0FBTztBQUN2RSxDQUFDO0FBRURKLFVBQVUsQ0FBQ21ELFNBQVMsQ0FBQzNDLHNCQUFzQixHQUFHLFVBQVNMLElBQUksRUFBRUUsU0FBUyxFQUFzQjtFQUFBLElBQXBCaUQsVUFBVSxHQUFBMUIsU0FBQSxDQUFBUixNQUFBLFFBQUFRLFNBQUEsUUFBQUMsU0FBQSxHQUFBRCxTQUFBLE1BQUcsS0FBSztFQUN0RixNQUFNMkIsY0FBYyxHQUFHNUMsUUFBUSxDQUFDQyxhQUFhLENBQUMsVUFBVSxDQUFDO0VBQ3pEMkMsY0FBYyxDQUFDQyxXQUFXLEdBQUcsRUFBRTtFQUUvQixLQUFLLElBQUlYLENBQUMsR0FBR3hDLFNBQVMsQ0FBQ29ELElBQUksRUFBRVosQ0FBQyxJQUFJeEMsU0FBUyxDQUFDcUQsSUFBSSxFQUFFYixDQUFDLElBQUUsQ0FBQyxFQUFFO0lBQ3BELEtBQUssSUFBSUMsQ0FBQyxHQUFHekMsU0FBUyxDQUFDc0QsSUFBSSxFQUFFYixDQUFDLElBQUl6QyxTQUFTLENBQUN1RCxJQUFJLEVBQUVkLENBQUMsSUFBRSxDQUFDLEVBQUU7TUFDcEQsTUFBTWUsYUFBYSxHQUFHbEQsUUFBUSxDQUFDbUQsYUFBYSxDQUFDLEtBQUssQ0FBQztNQUNuREQsYUFBYSxDQUFDRSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7TUFDbkMsTUFBTXZCLElBQUksR0FBR3BDLFNBQVMsQ0FBQzRELEtBQUssQ0FBQ3BCLENBQUMsQ0FBQyxDQUFDQyxDQUFDLENBQUM7TUFHbEMsSUFBSVEsVUFBVSxFQUFFO1FBQ1osSUFBSSxDQUFDWSxvQkFBb0IsQ0FBQ3pCLElBQUksRUFBRW9CLGFBQWEsQ0FBQztNQUNsRCxDQUFDLE1BQU07UUFBRTtRQUNMLElBQUksQ0FBQ00sYUFBYSxDQUFDMUIsSUFBSSxFQUFFb0IsYUFBYSxDQUFDO01BQzNDO01BR0EsSUFBSSxDQUFFUCxVQUFXLElBQUksQ0FBRWIsSUFBSSxDQUFDakIsR0FBSSxFQUFFO1FBQzlCcUMsYUFBYSxDQUFDL0MsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07VUFDMUNYLElBQUksQ0FBQ2lFLFNBQVMsQ0FBQyxDQUFDdkIsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUM7TUFDTjtNQUNBUyxjQUFjLENBQUNjLFdBQVcsQ0FBQ1IsYUFBYSxDQUFDO0lBQzdDO0VBQ0o7QUFDSixDQUFDO0FBRUQ3RCxVQUFVLENBQUNtRCxTQUFTLENBQUMxQyxzQkFBc0IsR0FBRyxVQUFTTixJQUFJLEVBQUVFLFNBQVMsRUFBRWlELFVBQVUsRUFBRTtFQUNoRixNQUFNQyxjQUFjLEdBQUc1QyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxVQUFVLENBQUM7RUFDekQyQyxjQUFjLENBQUNDLFdBQVcsR0FBRyxFQUFFO0VBRS9CLEtBQUssSUFBSVgsQ0FBQyxHQUFHeEMsU0FBUyxDQUFDb0QsSUFBSSxFQUFFWixDQUFDLElBQUl4QyxTQUFTLENBQUNxRCxJQUFJLEVBQUViLENBQUMsSUFBRSxDQUFDLEVBQUU7SUFDcEQsS0FBSyxJQUFJQyxDQUFDLEdBQUd6QyxTQUFTLENBQUNzRCxJQUFJLEVBQUViLENBQUMsSUFBSXpDLFNBQVMsQ0FBQ3VELElBQUksRUFBRWQsQ0FBQyxJQUFFLENBQUMsRUFBRTtNQUNwRCxNQUFNZSxhQUFhLEdBQUdsRCxRQUFRLENBQUNtRCxhQUFhLENBQUMsS0FBSyxDQUFDO01BQ25ERCxhQUFhLENBQUNFLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztNQUNuQyxNQUFNdkIsSUFBSSxHQUFHcEMsU0FBUyxDQUFDNEQsS0FBSyxDQUFDcEIsQ0FBQyxDQUFDLENBQUNDLENBQUMsQ0FBQztNQUdsQyxJQUFJUSxVQUFVLEVBQUU7UUFDWixJQUFJLENBQUNZLG9CQUFvQixDQUFDekIsSUFBSSxFQUFFb0IsYUFBYSxDQUFDO01BQ2xELENBQUMsTUFBTTtRQUFFO1FBQ0wsSUFBSSxDQUFDTSxhQUFhLENBQUMxQixJQUFJLEVBQUVvQixhQUFhLENBQUM7TUFDM0M7TUFHQSxJQUFJLENBQUVQLFVBQVcsSUFBSSxDQUFFYixJQUFJLENBQUNqQixHQUFJLEVBQUU7UUFDOUJxQyxhQUFhLENBQUMvQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtVQUMxQ1gsSUFBSSxDQUFDaUUsU0FBUyxDQUFDLENBQUN2QixDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQztNQUNOO01BQ0FTLGNBQWMsQ0FBQ2MsV0FBVyxDQUFDUixhQUFhLENBQUM7SUFDN0M7RUFDSjtBQUNKLENBQUM7QUFFRDdELFVBQVUsQ0FBQ21ELFNBQVMsQ0FBQ2Usb0JBQW9CLEdBQUcsVUFBU3pCLElBQUksRUFBRTZCLFNBQVMsRUFBRTtFQUNsRSxNQUFNO0lBQUNDO0VBQUssQ0FBQyxHQUFHOUIsSUFBSTtFQUdwQixJQUFJOEIsS0FBSyxLQUFLLEtBQUssRUFBRTtJQUFFO0lBQ25CRCxTQUFTLENBQUNQLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUMvQjtFQUNKO0VBRUEsSUFBSU8sS0FBSyxLQUFLLFdBQVcsRUFBRTtJQUN2QkQsU0FBUyxDQUFDUCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDL0JNLFNBQVMsQ0FBQ1AsU0FBUyxDQUFDQyxHQUFHLENBQUMsS0FBSyxDQUFDO0lBQzlCO0VBQ0o7RUFFQSxJQUFJLE9BQU9PLEtBQUssS0FBSyxRQUFRLElBQUlBLEtBQUssSUFBSSxJQUFJLEVBQUU7SUFDNUNELFNBQVMsQ0FBQ1AsU0FBUyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBQ2xDTSxTQUFTLENBQUNQLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUMvQjtFQUNKO0VBRUEsSUFBSSxDQUFDdkIsSUFBSSxDQUFDakIsR0FBRyxFQUFFO0lBQ1g4QyxTQUFTLENBQUNQLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztFQUN0QztBQUVKLENBQUM7QUFFRGhFLFVBQVUsQ0FBQ21ELFNBQVMsQ0FBQ2dCLGFBQWEsR0FBRyxVQUFTMUIsSUFBSSxFQUFFNkIsU0FBUyxFQUFFO0VBQzNELE1BQU07SUFBQ0M7RUFBSyxDQUFDLEdBQUc5QixJQUFJO0VBQ3BCLElBQUksQ0FBQ0EsSUFBSSxDQUFDakIsR0FBRyxFQUFFO0lBQ1g4QyxTQUFTLENBQUNQLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUNsQztFQUNKO0VBRUEsSUFBSU8sS0FBSyxLQUFLLEtBQUssRUFBRTtJQUFFO0lBQ25CRCxTQUFTLENBQUNQLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUMvQjtFQUNKO0VBRUEsSUFBSU8sS0FBSyxLQUFLLFdBQVcsRUFBRTtJQUN2QkQsU0FBUyxDQUFDUCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDL0JNLFNBQVMsQ0FBQ1AsU0FBUyxDQUFDQyxHQUFHLENBQUMsS0FBSyxDQUFDO0VBQ2xDO0FBQ0osQ0FBQztBQUdEaEUsVUFBVSxDQUFDbUQsU0FBUyxDQUFDcUIsUUFBUSxHQUFHLFVBQVNDLE1BQU0sRUFBRTtFQUM3QzlELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUNLLE1BQU0sQ0FBQyxDQUFDO0VBRWxELE1BQU15RCxTQUFTLEdBQUcvRCxRQUFRLENBQUNtRCxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQy9DWSxTQUFTLENBQUNYLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFlBQVksQ0FBQztFQUNyQ1UsU0FBUyxDQUFDbEIsV0FBVyxHQUFJLEdBQUVpQixNQUFPLFFBQU87RUFFekM5RCxRQUFRLENBQUNDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQ3lELFdBQVcsQ0FBQ0ssU0FBUyxDQUFDO0FBRXpELENBQUM7QUFFRCxpRUFBZTFFLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekhnQjtBQUNTO0FBQ0g7QUFFL0MsTUFBTUMsSUFBSSxDQUFDO0VBQ1BrQixXQUFXQSxDQUFDakIsT0FBTyxFQUFnRDtJQUFBLElBQTlDMkUsZUFBZSxHQUFBakQsU0FBQSxDQUFBUixNQUFBLFFBQUFRLFNBQUEsUUFBQUMsU0FBQSxHQUFBRCxTQUFBLE1BQUcsSUFBSTtJQUFBLElBQUVELFlBQVksR0FBQUMsU0FBQSxDQUFBUixNQUFBLFFBQUFRLFNBQUEsUUFBQUMsU0FBQSxHQUFBRCxTQUFBLE1BQUcsS0FBSztJQUM3RCxJQUFJLENBQUMxQixPQUFPLEdBQUdBLE9BQU87SUFDdEIsSUFBSSxDQUFDRSxPQUFPLEdBQUcsSUFBSXVFLHlEQUFNLENBQUMsSUFBSUMsK0RBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDO0lBQ3JELElBQUlDLGVBQWUsRUFBRTtNQUNqQixJQUFJLENBQUN0RSxPQUFPLEdBQUcsSUFBSW1CLDZEQUFRLENBQUMsSUFBSWtELCtEQUFTLENBQUMsQ0FBQyxFQUFFakQsWUFBWSxDQUFDO0lBQzlELENBQUMsTUFBTTtNQUNILElBQUksQ0FBQ3BCLE9BQU8sR0FBRyxJQUFJb0UseURBQU0sQ0FBQyxJQUFJQywrREFBUyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUM7SUFDekQ7SUFFQSxJQUFJLENBQUN2QixXQUFXLEdBQUcsSUFBSSxDQUFDakQsT0FBTztFQUNuQztFQUVBZ0QsVUFBVUEsQ0FBQSxFQUFHO0lBQ1QsSUFBSSxDQUFDQyxXQUFXLEdBQUcsSUFBSSxDQUFDQSxXQUFXLEtBQUssSUFBSSxDQUFDakQsT0FBTyxHQUFHLElBQUksQ0FBQ0csT0FBTyxHQUFHLElBQUksQ0FBQ0gsT0FBTztFQUN0RjtFQUVBZ0UsU0FBU0EsQ0FBQ2xCLFdBQVcsRUFBRTtJQUNuQixJQUFJLElBQUksQ0FBQzNDLE9BQU8sQ0FBQ3dCLElBQUksS0FBSyxVQUFVLEVBQUU7TUFDbEMsTUFBTUcsVUFBVSxHQUFHLElBQUksQ0FBQzNCLE9BQU8sQ0FBQ0YsU0FBUztNQUN6QyxNQUFNeUUsV0FBVyxHQUFHLElBQUksQ0FBQzFFLE9BQU8sQ0FBQ0MsU0FBUztNQUUxQyxJQUFJLENBQUNELE9BQU8sQ0FBQzZCLEtBQUssQ0FBQ0MsVUFBVSxFQUFFZ0IsV0FBVyxDQUFDO01BQzNDLElBQUksQ0FBQzNDLE9BQU8sQ0FBQzBCLEtBQUssQ0FBQzZDLFdBQVcsQ0FBQztNQUUvQixJQUFJLENBQUM1RSxPQUFPLENBQUNNLHNCQUFzQixDQUFDLElBQUksRUFBRXNFLFdBQVcsRUFBRSxJQUFJLENBQUM7TUFDNUQsSUFBSSxDQUFDNUUsT0FBTyxDQUFDTyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUV5QixVQUFVLEVBQUUsS0FBSyxDQUFDO0lBQ2hFLENBQUMsTUFBTTtNQUNILElBQUksSUFBSSxDQUFDbUIsV0FBVyxLQUFLLElBQUksQ0FBQ2pELE9BQU8sRUFBRTtRQUNuQyxNQUFNOEIsVUFBVSxHQUFHLElBQUksQ0FBQzNCLE9BQU8sQ0FBQ0YsU0FBUztRQUN6QyxJQUFJLENBQUNELE9BQU8sQ0FBQzZCLEtBQUssQ0FBQ0MsVUFBVSxFQUFFZ0IsV0FBVyxDQUFDO1FBQzNDLElBQUksQ0FBQ2hELE9BQU8sQ0FBQ00sc0JBQXNCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQ0osT0FBTyxDQUFDQyxTQUFTLEVBQUUsS0FBSyxDQUFDO1FBQ3hFLElBQUksQ0FBQ0gsT0FBTyxDQUFDTyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDRixPQUFPLENBQUNGLFNBQVMsRUFBRSxJQUFJLENBQUM7TUFDM0UsQ0FBQyxNQUFNO1FBQ0gsTUFBTTZCLFVBQVUsR0FBRyxJQUFJLENBQUM5QixPQUFPLENBQUNDLFNBQVM7UUFDekMsSUFBSSxDQUFDRSxPQUFPLENBQUMwQixLQUFLLENBQUNDLFVBQVUsRUFBRWdCLFdBQVcsQ0FBQztRQUMzQyxJQUFJLENBQUNoRCxPQUFPLENBQUNNLHNCQUFzQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUNKLE9BQU8sQ0FBQ0MsU0FBUyxFQUFFLElBQUksQ0FBQztRQUN2RSxJQUFJLENBQUNILE9BQU8sQ0FBQ08sc0JBQXNCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQ0YsT0FBTyxDQUFDRixTQUFTLEVBQUUsS0FBSyxDQUFDO01BQzVFO01BRUEsSUFBSSxDQUFDK0MsVUFBVSxDQUFDLENBQUM7SUFDckI7SUFFQSxNQUFNcUIsTUFBTSxHQUFHLElBQUksQ0FBQ00sYUFBYSxDQUFDLENBQUM7SUFDbkMsSUFBSU4sTUFBTSxFQUFFO01BQ1IsSUFBSSxDQUFDdkUsT0FBTyxDQUFDc0UsUUFBUSxDQUFDQyxNQUFNLENBQUM7SUFDakM7RUFDSjtFQUVBTSxhQUFhQSxDQUFBLEVBQUc7SUFDWixNQUFNQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM1RSxPQUFPLENBQUNDLFNBQVM7SUFDL0MsTUFBTTRFLGdCQUFnQixHQUFHLElBQUksQ0FBQzFFLE9BQU8sQ0FBQ0YsU0FBUztJQUMvQyxJQUFJMkUsZ0JBQWdCLENBQUNFLHFCQUFxQixDQUFDLENBQUMsRUFBRTtNQUMxQyxPQUFPLFNBQVM7SUFDcEI7SUFFQSxJQUFJRCxnQkFBZ0IsQ0FBQ0MscUJBQXFCLENBQUMsQ0FBQyxFQUFFO01BQzFDLE9BQU8sU0FBUztJQUNwQjtJQUVBLE9BQU8sS0FBSztFQUNoQjtBQUNKO0FBRUEsaUVBQWVqRixJQUFJOzs7Ozs7Ozs7Ozs7Ozs7QUNwRW5CO0FBQ21DO0FBRW5DLE1BQU0yRSxTQUFTLENBQUM7RUFDWnpELFdBQVdBLENBQUEsRUFBRztJQUNWLElBQUksQ0FBQzhDLEtBQUssR0FBR1csU0FBUyxDQUFDTyxRQUFRLENBQUMsQ0FBQztJQUNqQyxJQUFJLENBQUMxQixJQUFJLEdBQUcsQ0FBQztJQUNiLElBQUksQ0FBQ0MsSUFBSSxHQUFHLENBQUM7SUFDYixJQUFJLENBQUNDLElBQUksR0FBRyxDQUFDO0lBQ2IsSUFBSSxDQUFDQyxJQUFJLEdBQUcsQ0FBQztFQUNqQjtFQUVBLE9BQU91QixRQUFRQSxDQUFBLEVBQUc7SUFDZCxNQUFNbEIsS0FBSyxHQUFHLEVBQUU7SUFDaEIsS0FBSyxJQUFJbUIsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxJQUFJLENBQUMsRUFBRUEsQ0FBQyxJQUFFLENBQUMsRUFBRTtNQUMxQm5CLEtBQUssQ0FBQ3pCLElBQUksQ0FBQyxFQUFFLENBQUM7TUFDZCxLQUFLLElBQUk2QyxFQUFFLEdBQUcsQ0FBQyxFQUFFQSxFQUFFLElBQUksQ0FBQyxFQUFFQSxFQUFFLElBQUUsQ0FBQyxFQUFFO1FBQzdCcEIsS0FBSyxDQUFDbUIsQ0FBQyxDQUFDLENBQUM1QyxJQUFJLENBQUM7VUFBRStCLEtBQUssRUFBRSxJQUFJO1VBQUUvQyxHQUFHLEVBQUUsS0FBSztVQUFFb0IsT0FBTyxFQUFFLEtBQUs7VUFBRU0sV0FBVyxFQUFFLENBQUNrQyxDQUFDLEVBQUVDLEVBQUU7UUFBRSxDQUFDLENBQUM7TUFDcEY7SUFDSjtJQUVBLE9BQU9wQixLQUFLO0VBQ2hCO0VBRUFxQixtQkFBbUJBLENBQUNDLFVBQVUsRUFBRXJDLFdBQVcsRUFBRTtJQUN6QyxNQUFNc0MsSUFBSSxHQUFHLElBQUl0RSxxREFBSSxDQUFDcUUsVUFBVSxDQUFDO0lBQ2pDLE1BQU0sQ0FBQzFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLEdBQUdJLFdBQVc7SUFDMUIsTUFBTWUsS0FBSyxHQUFHd0IsTUFBTSxDQUFDQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQ3pCLEtBQUssQ0FBQztJQUUzQyxNQUFNMEIsZ0JBQWdCLEdBQUcsRUFBRTtJQUMzQixLQUFLLElBQUlQLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0ksSUFBSSxDQUFDcEUsTUFBTSxFQUFFZ0UsQ0FBQyxJQUFFLENBQUMsRUFBRTtNQUNuQyxJQUFJLElBQUksQ0FBQ1Esa0JBQWtCLENBQUMsQ0FBQy9DLENBQUMsR0FBR3VDLENBQUMsRUFBRXRDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFBRTtRQUN2QyxNQUFNLElBQUkrQyxLQUFLLENBQUMsb0JBQW9CLENBQUM7TUFDekM7TUFFQSxJQUFJNUIsS0FBSyxDQUFDcEIsQ0FBQyxHQUFDdUMsQ0FBQyxDQUFDLENBQUN0QyxDQUFDLENBQUMsQ0FBQ3lCLEtBQUssSUFBSSxJQUFJLEVBQUU7UUFDN0IsTUFBTSxJQUFJc0IsS0FBSyxDQUFDLGlDQUFpQyxDQUFDO01BQ3REO01BQ0FGLGdCQUFnQixDQUFDbkQsSUFBSSxDQUFDLENBQUNLLENBQUMsR0FBQ3VDLENBQUMsRUFBRXRDLENBQUMsQ0FBQyxDQUFDO0lBQ25DO0lBRUEsS0FBSyxJQUFJc0MsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHTyxnQkFBZ0IsQ0FBQ3ZFLE1BQU0sRUFBRWdFLENBQUMsSUFBRSxDQUFDLEVBQUU7TUFDL0MsTUFBTVUsUUFBUSxHQUFHSCxnQkFBZ0IsQ0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQ3ZDLE1BQU1XLFFBQVEsR0FBR0osZ0JBQWdCLENBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUV2QyxJQUFJLENBQUNuQixLQUFLLENBQUM2QixRQUFRLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLENBQUN4QixLQUFLLEdBQUdpQixJQUFJO01BQzNDLElBQUksQ0FBQ3ZCLEtBQUssQ0FBQzZCLFFBQVEsQ0FBQyxDQUFDQyxRQUFRLENBQUMsQ0FBQ25ELE9BQU8sR0FBRyxJQUFJO0lBQ2pEO0lBQ0E7SUFDQSxLQUFLLElBQUl3QyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdPLGdCQUFnQixDQUFDdkUsTUFBTSxFQUFFZ0UsQ0FBQyxJQUFFLENBQUMsRUFBRTtNQUMvQyxNQUFNVSxRQUFRLEdBQUdILGdCQUFnQixDQUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDdkMsTUFBTVcsUUFBUSxHQUFHSixnQkFBZ0IsQ0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BRXZDLE1BQU1ZLGFBQWEsR0FBRyxJQUFJLENBQUNDLDBCQUEwQixDQUFDLENBQUNILFFBQVEsRUFBRUMsUUFBUSxDQUFDLENBQUM7TUFDM0VDLGFBQWEsQ0FBQ0UsT0FBTyxDQUFFaEQsV0FBVyxJQUFLO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMwQyxrQkFBa0IsQ0FBQzFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDUixPQUFPLENBQUNRLFdBQVcsQ0FBQyxDQUFDcUIsS0FBSyxZQUFZckQscURBQUksQ0FBQyxFQUFFO1VBQzdGLElBQUksQ0FBQ3dCLE9BQU8sQ0FBQ1EsV0FBVyxDQUFDLENBQUNxQixLQUFLLEdBQUcsYUFBYTtVQUMvQ2lCLElBQUksQ0FBQ2pFLHNCQUFzQixDQUFDaUIsSUFBSSxDQUFDVSxXQUFXLENBQUM7UUFDakQ7TUFDSixDQUFDLENBQUM7SUFDTjtJQUNBO0VBQ0o7RUFFQWlELGlCQUFpQkEsQ0FBQ1osVUFBVSxFQUFFckMsV0FBVyxFQUFFO0lBQ3ZDLE1BQU1zQyxJQUFJLEdBQUcsSUFBSXRFLHFEQUFJLENBQUNxRSxVQUFVLENBQUM7SUFDakMsTUFBTSxDQUFDMUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsR0FBR0ksV0FBVztJQUMxQixNQUFNZSxLQUFLLEdBQUd3QixNQUFNLENBQUNDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDekIsS0FBSyxDQUFDO0lBRTNDLE1BQU0wQixnQkFBZ0IsR0FBRyxFQUFFO0lBQzNCLEtBQUssSUFBSVAsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHSSxJQUFJLENBQUNwRSxNQUFNLEVBQUVnRSxDQUFDLElBQUUsQ0FBQyxFQUFFO01BQ25DLElBQUksSUFBSSxDQUFDUSxrQkFBa0IsQ0FBQyxDQUFDL0MsQ0FBQyxFQUFFQyxDQUFDLEdBQUdzQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3JDLE1BQU0sSUFBSVMsS0FBSyxDQUFDLG9CQUFvQixDQUFDO01BQ3pDO01BRUEsSUFBSTVCLEtBQUssQ0FBQ3BCLENBQUMsQ0FBQyxDQUFDQyxDQUFDLEdBQUNzQyxDQUFDLENBQUMsQ0FBQ2IsS0FBSyxJQUFJLElBQUksRUFBRTtRQUM3QixNQUFNLElBQUlzQixLQUFLLENBQUMsaUNBQWlDLENBQUM7TUFDdEQ7TUFDQUYsZ0JBQWdCLENBQUNuRCxJQUFJLENBQUMsQ0FBQ0ssQ0FBQyxFQUFFQyxDQUFDLEdBQUNzQyxDQUFDLENBQUMsQ0FBQztJQUNuQztJQUVBLEtBQUssSUFBSUEsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHTyxnQkFBZ0IsQ0FBQ3ZFLE1BQU0sRUFBRWdFLENBQUMsSUFBRSxDQUFDLEVBQUU7TUFDL0MsTUFBTVUsUUFBUSxHQUFHSCxnQkFBZ0IsQ0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQ3ZDLE1BQU1XLFFBQVEsR0FBR0osZ0JBQWdCLENBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUV2QyxJQUFJLENBQUNuQixLQUFLLENBQUM2QixRQUFRLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLENBQUN4QixLQUFLLEdBQUdpQixJQUFJO01BQzNDLElBQUksQ0FBQ3ZCLEtBQUssQ0FBQzZCLFFBQVEsQ0FBQyxDQUFDQyxRQUFRLENBQUMsQ0FBQ25ELE9BQU8sR0FBRyxJQUFJO0lBRWpEO0lBRUEsS0FBSyxJQUFJd0MsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHTyxnQkFBZ0IsQ0FBQ3ZFLE1BQU0sRUFBRWdFLENBQUMsSUFBRSxDQUFDLEVBQUU7TUFDL0MsTUFBTVUsUUFBUSxHQUFHSCxnQkFBZ0IsQ0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQ3ZDLE1BQU1XLFFBQVEsR0FBR0osZ0JBQWdCLENBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUV2QyxNQUFNWSxhQUFhLEdBQUcsSUFBSSxDQUFDQywwQkFBMEIsQ0FBQyxDQUFDSCxRQUFRLEVBQUVDLFFBQVEsQ0FBQyxDQUFDO01BQzNFQyxhQUFhLENBQUNFLE9BQU8sQ0FBRWhELFdBQVcsSUFBSztRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDMEMsa0JBQWtCLENBQUMxQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQ1IsT0FBTyxDQUFDUSxXQUFXLENBQUMsQ0FBQ3FCLEtBQUssWUFBWXJELHFEQUFJLENBQUMsRUFBRTtVQUM3RixJQUFJLENBQUN3QixPQUFPLENBQUNRLFdBQVcsQ0FBQyxDQUFDcUIsS0FBSyxHQUFHLGFBQWE7VUFDL0NpQixJQUFJLENBQUNqRSxzQkFBc0IsQ0FBQ2lCLElBQUksQ0FBQ1UsV0FBVyxDQUFDO1FBQ2pEO01BQ0osQ0FBQyxDQUFDO0lBRU47RUFDSjtFQUVBUixPQUFPQSxDQUFDUSxXQUFXLEVBQUU7SUFDakIsTUFBTSxDQUFDTCxDQUFDLEVBQUVDLENBQUMsQ0FBQyxHQUFHSSxXQUFXO0lBRTFCLElBQUlMLENBQUMsR0FBRyxJQUFJLENBQUNZLElBQUksSUFBSVosQ0FBQyxHQUFHLElBQUksQ0FBQ2EsSUFBSSxJQUFJWixDQUFDLEdBQUcsSUFBSSxDQUFDVyxJQUFJLElBQUlYLENBQUMsR0FBRyxJQUFJLENBQUNZLElBQUksRUFBRTtNQUNsRSxPQUFPLElBQUk7SUFDZjtJQUVBLE9BQU8sSUFBSSxDQUFDTyxLQUFLLENBQUNwQixDQUFDLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDO0VBQzNCO0VBRUFtRCwwQkFBMEJBLENBQUMvQyxXQUFXLEVBQUU7SUFDcEMsTUFBTSxDQUFDTCxDQUFDLEVBQUVDLENBQUMsQ0FBQyxHQUFHSSxXQUFXO0lBQzFCLE9BQU8sQ0FDSCxDQUFDTCxDQUFDLEdBQUcsQ0FBQyxFQUFFQyxDQUFDLENBQUMsRUFDVixDQUFDRCxDQUFDLEdBQUcsQ0FBQyxFQUFFQyxDQUFDLENBQUMsRUFDVixDQUFDRCxDQUFDLEVBQUVDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDVixDQUFDRCxDQUFDLEVBQUVDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDVixDQUFDRCxDQUFDLEdBQUcsQ0FBQyxFQUFFQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ2QsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsRUFBRUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxFQUNiLENBQUNELENBQUMsR0FBRyxDQUFDLEVBQUVDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDZCxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxFQUFFQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ2pCO0VBQ0w7RUFFQXNELGtCQUFrQkEsQ0FBQzNELElBQUksRUFBRTtJQUNyQixNQUFNO01BQUNsQjtJQUFzQixDQUFDLEdBQUdrQixJQUFJLENBQUM4QixLQUFLO0lBQzNDOztJQUVBaEQsc0JBQXNCLENBQUMyRSxPQUFPLENBQUUvRCxrQkFBa0IsSUFBSztNQUNuRCxNQUFNa0UsUUFBUSxHQUFHLElBQUksQ0FBQzNELE9BQU8sQ0FBQ1Asa0JBQWtCLENBQUM7TUFDakQsSUFBSWtFLFFBQVEsRUFBRTtRQUNWLElBQUksQ0FBQzFELGFBQWEsQ0FBQ1Isa0JBQWtCLENBQUM7TUFDMUM7SUFDSixDQUFDLENBQUM7RUFDTjtFQUVBeUQsa0JBQWtCQSxDQUFDMUMsV0FBVyxFQUFFO0lBQzVCLE1BQU0sQ0FBQ0wsQ0FBQyxFQUFFQyxDQUFDLENBQUMsR0FBR0ksV0FBVztJQUUxQixJQUFJTCxDQUFDLEdBQUcsSUFBSSxDQUFDWSxJQUFJLElBQUlaLENBQUMsR0FBRyxJQUFJLENBQUNhLElBQUksSUFBSVosQ0FBQyxHQUFHLElBQUksQ0FBQ2EsSUFBSSxJQUFJYixDQUFDLEdBQUcsSUFBSSxDQUFDYyxJQUFJLEVBQUU7TUFDbEUsT0FBTyxJQUFJO0lBQ2Y7SUFFQSxPQUFPLEtBQUs7RUFDaEI7RUFFQWpCLGFBQWFBLENBQUNPLFdBQVcsRUFBRTtJQUN2QixNQUFNLENBQUNMLENBQUMsRUFBRUMsQ0FBQyxDQUFDLEdBQUdJLFdBQVc7SUFFMUIsSUFBSSxJQUFJLENBQUMwQyxrQkFBa0IsQ0FBQzFDLFdBQVcsQ0FBQyxFQUFFO01BQ3RDLE1BQU0sSUFBSTJDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQztJQUNwRDtJQUVBLE1BQU1wRCxJQUFJLEdBQUcsSUFBSSxDQUFDd0IsS0FBSyxDQUFDcEIsQ0FBQyxDQUFDLENBQUNDLENBQUMsQ0FBQztJQUM3QkwsSUFBSSxDQUFDakIsR0FBRyxHQUFHLElBQUk7SUFFZixJQUFHaUIsSUFBSSxDQUFDOEIsS0FBSyxZQUFZckQscURBQUksRUFBRTtNQUMzQnVCLElBQUksQ0FBQzhCLEtBQUssQ0FBQy9DLEdBQUcsQ0FBQyxDQUFDO01BQ2hCLElBQUlpQixJQUFJLENBQUM4QixLQUFLLENBQUM5QyxNQUFNLENBQUMsQ0FBQyxFQUFFO1FBQ3JCLElBQUksQ0FBQzJFLGtCQUFrQixDQUFDM0QsSUFBSSxDQUFDO01BQ2pDO01BQ0FBLElBQUksQ0FBQzhCLEtBQUssR0FBRyxXQUFXO01BQ3hCLE9BQU85QixJQUFJO0lBQ2Y7SUFFQSxJQUFJLENBQUN3QixLQUFLLENBQUNwQixDQUFDLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLENBQUN5QixLQUFLLEdBQUcsS0FBSztJQUM5QixPQUFPOUIsSUFBSTtFQUNmO0VBRUF5QyxxQkFBcUJBLENBQUEsRUFBRztJQUNwQixLQUFLLElBQUlvQixHQUFHLEdBQUcsSUFBSSxDQUFDN0MsSUFBSSxFQUFFNkMsR0FBRyxJQUFJLElBQUksQ0FBQzVDLElBQUksRUFBRTRDLEdBQUcsSUFBRSxDQUFDLEVBQUU7TUFDaEQsS0FBSSxJQUFJQyxNQUFNLEdBQUcsSUFBSSxDQUFDNUMsSUFBSSxFQUFFNEMsTUFBTSxHQUFHLElBQUksQ0FBQzNDLElBQUksRUFBRTJDLE1BQU0sSUFBRSxDQUFDLEVBQUU7UUFDdkQsTUFBTUMsV0FBVyxHQUFHLElBQUksQ0FBQ3ZDLEtBQUssQ0FBQ3FDLEdBQUcsQ0FBQyxDQUFDQyxNQUFNLENBQUM7UUFDM0MsSUFBSUMsV0FBVyxDQUFDakMsS0FBSyxZQUFZckQscURBQUksSUFBSSxDQUFFc0YsV0FBVyxDQUFDakMsS0FBSyxDQUFDOUMsTUFBTSxDQUFDLENBQUUsRUFBRTtVQUNwRSxPQUFPLEtBQUs7UUFDaEI7TUFDSjtJQUNKO0lBQ0EsT0FBTyxJQUFJO0VBQ2Y7RUFFQW5CLFVBQVVBLENBQUEsRUFBRztJQUNULElBQUksQ0FBQzJELEtBQUssR0FBR1csU0FBUyxDQUFDTyxRQUFRLENBQUMsQ0FBQztJQUNqQyxLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsSUFBRSxDQUFDLEVBQUU7TUFDekIsTUFBTXZDLENBQUMsR0FBR0UsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUNnQixLQUFLLENBQUM3QyxNQUFNLENBQUM7TUFDdkQsTUFBTTBCLENBQUMsR0FBR0MsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUNnQixLQUFLLENBQUM3QyxNQUFNLENBQUM7TUFDdkQsTUFBTXFGLFNBQVMsR0FBRzFELElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHO01BQ2pFLElBQUl3RCxTQUFTLEtBQUssR0FBRyxFQUFFO1FBQ25CLElBQUk7VUFDQSxJQUFJLENBQUNuQixtQkFBbUIsQ0FBQ0YsQ0FBQyxFQUFFLENBQUN2QyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxPQUFPNEQsR0FBRyxFQUFFO1VBQ1Z0QixDQUFDLElBQUUsQ0FBQztRQUNSO01BRUosQ0FBQyxNQUFNLElBQUlxQixTQUFTLEtBQUssR0FBRyxFQUFFO1FBQzFCLElBQUk7VUFDQSxJQUFJLENBQUNOLGlCQUFpQixDQUFDZixDQUFDLEVBQUUsQ0FBQ3ZDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLE9BQU80RCxHQUFHLEVBQUU7VUFDVnRCLENBQUMsSUFBRSxDQUFDO1FBQ1I7TUFDSjtJQUNKO0VBQ0o7QUFDSjtBQUVBLGlFQUFlUixTQUFTOzs7Ozs7Ozs7Ozs7OztBQ2xOeEIsTUFBTUQsTUFBTSxHQUFHLFNBQUFBLENBQVN0RSxTQUFTLEVBQUUwQixJQUFJLEVBQUU7RUFDckMsSUFBSSxDQUFDMUIsU0FBUyxHQUFHQSxTQUFTO0VBQzFCLElBQUksQ0FBQ3NHLE1BQU0sR0FBRyxLQUFLO0VBQ25CLElBQUksQ0FBQzVFLElBQUksR0FBR0EsSUFBSTtBQUNwQixDQUFDO0FBRUQ0QyxNQUFNLENBQUN4QixTQUFTLENBQUNsQixLQUFLLEdBQUcsVUFBU0MsVUFBVSxFQUFFZ0IsV0FBVyxFQUFFO0VBQ3ZEaEIsVUFBVSxDQUFDUyxhQUFhLENBQUNPLFdBQVcsQ0FBQztBQUN6QyxDQUFDO0FBRUQsaUVBQWV5QixNQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvYm9hdC9ib2F0LmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9jb21wdXRlci9jb21wdXRlci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvZG9tLWNvbnRyb2wvZG9tLWNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL2dhbWUvZ2FtZS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvZ2FtZWJvYXJkL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvcGxheWVyL3BsYXllci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IERPTUNvbnRyb2wgZnJvbSBcIi4vbW9kdWxlcy9kb20tY29udHJvbC9kb20tY29udHJvbC5qc1wiO1xuaW1wb3J0IEdhbWUgZnJvbSBcIi4vbW9kdWxlcy9nYW1lL2dhbWUuanNcIjtcblxuXG5cbmNvbnN0IGRpc3BsYXkgPSBuZXcgRE9NQ29udHJvbCgpO1xuY29uc3QgZ2FtZSA9IG5ldyBHYW1lKGRpc3BsYXksIHRydWUsIHRydWUpO1xuXG5nYW1lLnBsYXllcjEuZ2FtZWJvYXJkLnBsYWNlQm9hdHMoKTtcbmdhbWUucGxheWVyMi5nYW1lYm9hcmQucGxhY2VCb2F0cygpO1xuZGlzcGxheS5yZW5kZXJQbGF5ZXIxR2FtZWJvYXJkKGdhbWUsIGdhbWUucGxheWVyMS5nYW1lYm9hcmQsIHRydWUpO1xuZGlzcGxheS5yZW5kZXJQbGF5ZXIyR2FtZWJvYXJkKGdhbWUsIGdhbWUucGxheWVyMi5nYW1lYm9hcmQsIHRydWUpO1xuXG5jb25zdCByYW5kb21pemVCb2F0c0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmFuZG9taXplLWJvYXRzXCIpO1xuY29uc3Qgc3RhcnRHYW1lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydC1nYW1lXCIpO1xuXG5yYW5kb21pemVCb2F0c0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZ2FtZS5wbGF5ZXIxLmdhbWVib2FyZC5wbGFjZUJvYXRzKCk7XG4gICAgZ2FtZS5wbGF5ZXIyLmdhbWVib2FyZC5wbGFjZUJvYXRzKCk7XG5cbiAgICBkaXNwbGF5LnJlbmRlclBsYXllcjFHYW1lYm9hcmQoZ2FtZSwgZ2FtZS5wbGF5ZXIxLmdhbWVib2FyZCwgdHJ1ZSk7XG4gICAgZGlzcGxheS5yZW5kZXJQbGF5ZXIyR2FtZWJvYXJkKGdhbWUsIGdhbWUucGxheWVyMi5nYW1lYm9hcmQsIHRydWUpO1xufSlcblxuc3RhcnRHYW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIHJhbmRvbWl6ZUJvYXRzQnRuLnJlbW92ZSgpO1xuICAgIHN0YXJ0R2FtZUJ0bi5yZW1vdmUoKTtcbiAgICBcbiAgICBkaXNwbGF5LnJlbmRlclBsYXllcjFHYW1lYm9hcmQoZ2FtZSwgZ2FtZS5wbGF5ZXIxLmdhbWVib2FyZCwgdHJ1ZSk7XG4gICAgZGlzcGxheS5yZW5kZXJQbGF5ZXIyR2FtZWJvYXJkKGdhbWUsIGdhbWUucGxheWVyMi5nYW1lYm9hcmQsIGZhbHNlKTtcbn0pIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cbmNsYXNzIEJvYXQge1xuICAgIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5oaXRDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuX2lzU3VuayA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFkamFjZW50Q29vcmRpbmF0ZXNBcnIgPSBbXTtcbiAgICB9O1xuXG4gICAgaGl0KCkge1xuICAgICAgICB0aGlzLmhpdENvdW50Kz0xO1xuXG4gICAgICAgIFxuICAgIH1cblxuICAgIGlzU3VuaygpIHtcbiAgICAgICAgaWYgKHRoaXMuaGl0Q291bnQgPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzU3VuayA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5faXNTdW5rO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJvYXQ7IiwiLyogZXNsaW50LWRpc2FibGUgZnVuYy1uYW1lcyAqL1xuY2xhc3MgQ29tcHV0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGdhbWVib2FyZCwgYWR2YW5jZWRNb2RlID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5hZHZhbmNlZE1vZGUgPSBhZHZhbmNlZE1vZGU7XG4gICAgICAgIHRoaXMuc2hvdHNBcnIgPSBbXTtcbiAgICAgICAgdGhpcy5nYW1lYm9hcmQgPSBnYW1lYm9hcmQ7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiY29tcHV0ZXJcIjtcblxuICAgICAgICBpZiAodGhpcy5hZHZhbmNlZE1vZGUpIHtcbiAgICAgICAgICAgIGxldCBjb29yZGluYXRlU3RhY2sgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuc2hvb3QgPSBmdW5jdGlvbihlbmVteUJvYXJkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudENvb3JkaW5hdGVzID0gY29vcmRpbmF0ZVN0YWNrW2Nvb3JkaW5hdGVTdGFjay5sZW5ndGgtMV07XG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZVN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3RzQXJyLmluY2x1ZGVzKEpTT04uc3RyaW5naWZ5KGN1cnJlbnRDb29yZGluYXRlcykpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvb3QoZW5lbXlCb2FyZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudENvb3JkaW5hdGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdHNBcnIucHVzaChKU09OLnN0cmluZ2lmeShjdXJyZW50Q29vcmRpbmF0ZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBlbmVteUJvYXJkLmdldENlbGwoY3VycmVudENvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZWxsID09IG51bGwgfHwgY2VsbC5oaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob290KGVuZW15Qm9hcmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjdXJyZW50Q29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwuaGFzQm9hdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFt4LCB5XSA9IGN1cnJlbnRDb29yZGluYXRlcztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVTdGFjay5wdXNoKFt4LTEsIHldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlU3RhY2sucHVzaChbeCwgeS0xXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZVN0YWNrLnB1c2goW3grMSwgeV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVTdGFjay5wdXNoKFt4LCB5KzFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnNob290KGVuZW15Qm9hcmQpO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHNob290IHJhbmRvbVxuICAgICAgICAgICAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IFt4LCB5XTtcblxuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVTdGFjay5wdXNoKGNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob290KGVuZW15Qm9hcmQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvb3QgPSBmdW5jdGlvbihlbmVteUJvYXJkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW3gsIHldO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3RzQXJyLmluY2x1ZGVzKEpTT04uc3RyaW5naWZ5KGNvb3JkaW5hdGVzKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG9vdChlbmVteUJvYXJkKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBlbmVteUJvYXJkLmdldENlbGwoY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgICAgIGlmIChjZWxsID09IG51bGwgfHwgY2VsbC5oaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG9vdChlbmVteUJvYXJkKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnNob3RzQXJyLnB1c2goSlNPTi5zdHJpbmdpZnkoY29vcmRpbmF0ZXMpKTtcbiAgICAgICAgICAgICAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcHV0ZXI7IiwiY29uc3QgRE9NQ29udHJvbCA9IGZ1bmN0aW9uKGdhbWUpIHtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xufVxuXG5ET01Db250cm9sLnByb3RvdHlwZS5zd2l0Y2hUdXJuID0gZnVuY3Rpb24ocGxheWVyMSwgcGxheWVyMikge1xuICAgIHRoaXMuY3VycmVudFR1cm4gPSB0aGlzLmN1cnJlbnRUdXJuID09PSBwbGF5ZXIxID8gcGxheWVyMiA6IHBsYXllcjE7XG59XG5cbkRPTUNvbnRyb2wucHJvdG90eXBlLnJlbmRlclBsYXllcjFHYW1lYm9hcmQgPSBmdW5jdGlvbihnYW1lLCBnYW1lYm9hcmQsIHNldFZpc2libGUgPSBmYWxzZSkge1xuICAgIGNvbnN0IGJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXIxXCIpO1xuICAgIGJvYXJkQ29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBcbiAgICBmb3IgKGxldCB4ID0gZ2FtZWJvYXJkLm1pblg7IHggPD0gZ2FtZWJvYXJkLm1heFg7IHgrPTEpIHtcbiAgICAgICAgZm9yIChsZXQgeSA9IGdhbWVib2FyZC5taW5ZOyB5IDw9IGdhbWVib2FyZC5tYXhZOyB5Kz0xKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGNlbGxDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gZ2FtZWJvYXJkLmJvYXJkW3hdW3ldO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChzZXRWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRWaXNpYmxlQXR0cmlidXRlcyhjZWxsLCBjZWxsQ29udGFpbmVyKVxuICAgICAgICAgICAgfSBlbHNlIHsgLy8gbm90IHNldFZpc2libGVcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEF0dHJpYnV0ZXMoY2VsbCwgY2VsbENvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCEoc2V0VmlzaWJsZSkgJiYgIShjZWxsLmhpdCkpIHtcbiAgICAgICAgICAgICAgICBjZWxsQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGdhbWUucGxheVJvdW5kKFt4LCB5XSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNlbGxDb250YWluZXIpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ET01Db250cm9sLnByb3RvdHlwZS5yZW5kZXJQbGF5ZXIyR2FtZWJvYXJkID0gZnVuY3Rpb24oZ2FtZSwgZ2FtZWJvYXJkLCBzZXRWaXNpYmxlKSB7XG4gICAgY29uc3QgYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllcjJcIik7XG4gICAgYm9hcmRDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIFxuICAgIGZvciAobGV0IHggPSBnYW1lYm9hcmQubWluWDsgeCA8PSBnYW1lYm9hcmQubWF4WDsgeCs9MSkge1xuICAgICAgICBmb3IgKGxldCB5ID0gZ2FtZWJvYXJkLm1pblk7IHkgPD0gZ2FtZWJvYXJkLm1heFk7IHkrPTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGxDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY2VsbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBnYW1lYm9hcmQuYm9hcmRbeF1beV07XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHNldFZpc2libGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFZpc2libGVBdHRyaWJ1dGVzKGNlbGwsIGNlbGxDb250YWluZXIpXG4gICAgICAgICAgICB9IGVsc2UgeyAvLyBub3Qgc2V0VmlzaWJsZVxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQXR0cmlidXRlcyhjZWxsLCBjZWxsQ29udGFpbmVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIShzZXRWaXNpYmxlKSAmJiAhKGNlbGwuaGl0KSkge1xuICAgICAgICAgICAgICAgIGNlbGxDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZ2FtZS5wbGF5Um91bmQoW3gsIHldKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY2VsbENvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkRPTUNvbnRyb2wucHJvdG90eXBlLmFkZFZpc2libGVBdHRyaWJ1dGVzID0gZnVuY3Rpb24oY2VsbCwgY29udGFpbmVyKSB7XG4gICAgY29uc3Qge3ZhbHVlfSA9IGNlbGw7XG4gICAgXG4gICAgXG4gICAgaWYgKHZhbHVlID09PSBmYWxzZSkgeyAvLyBvciBpZiB2YWx1ZSBpcyB1bmF2YWlsYWJsZVxuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgaWYgKHZhbHVlID09PSBcImRlc3Ryb3llZFwiKSB7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYm9hdFwiKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcImJvYXRcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgaWYgKCFjZWxsLmhpdCkge1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm5vdFNob3RcIik7XG4gICAgfVxuICAgIFxufVxuXG5ET01Db250cm9sLnByb3RvdHlwZS5hZGRBdHRyaWJ1dGVzID0gZnVuY3Rpb24oY2VsbCwgY29udGFpbmVyKSB7XG4gICAgY29uc3Qge3ZhbHVlfSA9IGNlbGw7XG4gICAgaWYgKCFjZWxsLmhpdCkge1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm5vdFNob3RcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7IC8vIG9yIGlmIHZhbHVlIGlzIHVuYXZhaWxhYmxlXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSA9PT0gXCJkZXN0cm95ZWRcIikge1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcImJvYXRcIik7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgIH1cbn1cblxuXG5ET01Db250cm9sLnByb3RvdHlwZS5nYW1lT3ZlciA9IGZ1bmN0aW9uKHdpbm5lcikge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ3JpZC1jb250YWluZXJcIikucmVtb3ZlKCk7XG4gICAgXG4gICAgY29uc3Qgd2luQmFubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB3aW5CYW5uZXIuY2xhc3NMaXN0LmFkZChcIndpbi1iYW5uZXJcIik7XG4gICAgd2luQmFubmVyLnRleHRDb250ZW50ID0gYCR7d2lubmVyfSB3aW5zIWA7XG4gICAgXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYXBwZW5kQ2hpbGQod2luQmFubmVyKTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBET01Db250cm9sOyIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL3BsYXllci9wbGF5ZXIuanNcIjtcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4uL2dhbWVib2FyZC9nYW1lYm9hcmQuanNcIjtcbmltcG9ydCBDb21wdXRlciBmcm9tIFwiLi4vY29tcHV0ZXIvY29tcHV0ZXIuanNcIjtcblxuY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoZGlzcGxheSwgcGxheWVyMkNvbXB1dGVyID0gdHJ1ZSwgYWR2YW5jZWRNb2RlID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gZGlzcGxheTtcbiAgICAgICAgdGhpcy5wbGF5ZXIxID0gbmV3IFBsYXllcihuZXcgR2FtZWJvYXJkKCksIFwicGxheWVyMVwiKTtcbiAgICAgICAgaWYgKHBsYXllcjJDb21wdXRlcikge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIyID0gbmV3IENvbXB1dGVyKG5ldyBHYW1lYm9hcmQoKSwgYWR2YW5jZWRNb2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyMiA9IG5ldyBQbGF5ZXIobmV3IEdhbWVib2FyZCgpLCBcInBsYXllcjJcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnRUdXJuID0gdGhpcy5wbGF5ZXIxO1xuICAgIH1cblxuICAgIHN3aXRjaFR1cm4oKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFR1cm4gPSB0aGlzLmN1cnJlbnRUdXJuID09PSB0aGlzLnBsYXllcjEgPyB0aGlzLnBsYXllcjIgOiB0aGlzLnBsYXllcjE7XG4gICAgfVxuXG4gICAgcGxheVJvdW5kKGNvb3JkaW5hdGVzKSB7XG4gICAgICAgIGlmICh0aGlzLnBsYXllcjIubmFtZSA9PT0gXCJjb21wdXRlclwiKSB7XG4gICAgICAgICAgICBjb25zdCBlbmVteUJvYXJkID0gdGhpcy5wbGF5ZXIyLmdhbWVib2FyZDtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllckJvYXJkID0gdGhpcy5wbGF5ZXIxLmdhbWVib2FyZDtcblxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIxLnNob290KGVuZW15Qm9hcmQsIGNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIHRoaXMucGxheWVyMi5zaG9vdChwbGF5ZXJCb2FyZCk7XG5cbiAgICAgICAgICAgIHRoaXMuZGlzcGxheS5yZW5kZXJQbGF5ZXIxR2FtZWJvYXJkKHRoaXMsIHBsYXllckJvYXJkLCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheS5yZW5kZXJQbGF5ZXIyR2FtZWJvYXJkKHRoaXMsIGVuZW15Qm9hcmQsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRUdXJuID09PSB0aGlzLnBsYXllcjEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmVteUJvYXJkID0gdGhpcy5wbGF5ZXIyLmdhbWVib2FyZDtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllcjEuc2hvb3QoZW5lbXlCb2FyZCwgY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheS5yZW5kZXJQbGF5ZXIxR2FtZWJvYXJkKHRoaXMsIHRoaXMucGxheWVyMS5nYW1lYm9hcmQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkucmVuZGVyUGxheWVyMkdhbWVib2FyZCh0aGlzLCB0aGlzLnBsYXllcjIuZ2FtZWJvYXJkLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZW5lbXlCb2FyZCA9IHRoaXMucGxheWVyMS5nYW1lYm9hcmQ7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIyLnNob290KGVuZW15Qm9hcmQsIGNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkucmVuZGVyUGxheWVyMUdhbWVib2FyZCh0aGlzLCB0aGlzLnBsYXllcjEuZ2FtZWJvYXJkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkucmVuZGVyUGxheWVyMkdhbWVib2FyZCh0aGlzLCB0aGlzLnBsYXllcjIuZ2FtZWJvYXJkLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoVHVybigpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgd2lubmVyID0gdGhpcy5jaGVja0dhbWVPdmVyKCk7XG4gICAgICAgIGlmICh3aW5uZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheS5nYW1lT3Zlcih3aW5uZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tHYW1lT3ZlcigpIHtcbiAgICAgICAgY29uc3QgcGxheWVyMUdhbWVib2FyZCA9IHRoaXMucGxheWVyMS5nYW1lYm9hcmQ7XG4gICAgICAgIGNvbnN0IHBsYXllcjJHYW1lYm9hcmQgPSB0aGlzLnBsYXllcjIuZ2FtZWJvYXJkO1xuICAgICAgICBpZiAocGxheWVyMUdhbWVib2FyZC5jaGVja0ZsZWV0RGVzdHJ1Y3Rpb24oKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwicGxheWVyMlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBsYXllcjJHYW1lYm9hcmQuY2hlY2tGbGVldERlc3RydWN0aW9uKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBcInBsYXllcjFcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7IiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9leHRlbnNpb25zXG5pbXBvcnQgQm9hdCBmcm9tIFwiLi4vYm9hdC9ib2F0LmpzXCI7XG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBHYW1lYm9hcmQuc2V0Qm9hcmQoKTtcbiAgICAgICAgdGhpcy5taW5YID0gMDtcbiAgICAgICAgdGhpcy5tYXhYID0gOTtcbiAgICAgICAgdGhpcy5taW5ZID0gMDtcbiAgICAgICAgdGhpcy5tYXhZID0gOTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0Qm9hcmQoKSB7XG4gICAgICAgIGNvbnN0IGJvYXJkID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDk7IGkrPTEpIHtcbiAgICAgICAgICAgIGJvYXJkLnB1c2goW10pO1xuICAgICAgICAgICAgZm9yIChsZXQgaTIgPSAwOyBpMiA8PSA5OyBpMis9MSkge1xuICAgICAgICAgICAgICAgIGJvYXJkW2ldLnB1c2goeyB2YWx1ZTogbnVsbCwgaGl0OiBmYWxzZSwgaGFzQm9hdDogZmFsc2UsIGNvb3JkaW5hdGVzOiBbaSwgaTJdIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJvYXJkO1xuICAgIH1cblxuICAgIHBsYWNlQm9hdEhvcml6b250YWwoYm9hdExlbmd0aCwgY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgY29uc3QgYm9hdCA9IG5ldyBCb2F0KGJvYXRMZW5ndGgpO1xuICAgICAgICBjb25zdCBbeCwgeV0gPSBjb29yZGluYXRlcztcbiAgICAgICAgY29uc3QgYm9hcmQgPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLmJvYXJkKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzQXJyYXkgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2F0Lmxlbmd0aDsgaSs9MSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tJZk91dE9mQm91bmRzKFt4ICsgaSwgeV0pKSB7IC8vIGNoYW5nZSBsYXRlclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJvYXQgb3V0IG9mIGJvdW5kc1wiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGJvYXJkW3graV1beV0udmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJvYXQgY29sbGlkZXMgd2l0aCBhbm90aGVyIGJvYXRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb29yZGluYXRlc0FycmF5LnB1c2goW3graSwgeV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZGluYXRlc0FycmF5Lmxlbmd0aDsgaSs9MSkge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFggPSBjb29yZGluYXRlc0FycmF5W2ldWzBdO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFkgPSBjb29yZGluYXRlc0FycmF5W2ldWzFdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmJvYXJkW2N1cnJlbnRYXVtjdXJyZW50WV0udmFsdWUgPSBib2F0O1xuICAgICAgICAgICAgdGhpcy5ib2FyZFtjdXJyZW50WF1bY3VycmVudFldLmhhc0JvYXQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMuYm9hcmQgPSBib2FyZDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZGluYXRlc0FycmF5Lmxlbmd0aDsgaSs9MSkge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFggPSBjb29yZGluYXRlc0FycmF5W2ldWzBdO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFkgPSBjb29yZGluYXRlc0FycmF5W2ldWzFdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBhZGphY2VudENlbGxzID0gdGhpcy5nZXRBZGphY2VudENlbGxDb29yZGluYXRlcyhbY3VycmVudFgsIGN1cnJlbnRZXSk7XG4gICAgICAgICAgICBhZGphY2VudENlbGxzLmZvckVhY2goKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrSWZPdXRPZkJvdW5kcyhjb29yZGluYXRlcykgJiYgISh0aGlzLmdldENlbGwoY29vcmRpbmF0ZXMpLnZhbHVlIGluc3RhbmNlb2YgQm9hdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDZWxsKGNvb3JkaW5hdGVzKS52YWx1ZSA9IFwidW5hdmFpbGFibGVcIjtcbiAgICAgICAgICAgICAgICAgICAgYm9hdC5hZGphY2VudENvb3JkaW5hdGVzQXJyLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgIH1cblxuICAgIHBsYWNlQm9hdFZlcnRpY2FsKGJvYXRMZW5ndGgsIGNvb3JkaW5hdGVzKSB7XG4gICAgICAgIGNvbnN0IGJvYXQgPSBuZXcgQm9hdChib2F0TGVuZ3RoKTtcbiAgICAgICAgY29uc3QgW3gsIHldID0gY29vcmRpbmF0ZXM7XG4gICAgICAgIGNvbnN0IGJvYXJkID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5ib2FyZCk7XG5cbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXNBcnJheSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXQubGVuZ3RoOyBpKz0xKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja0lmT3V0T2ZCb3VuZHMoW3gsIHkgKyBpXSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCb2F0IG91dCBvZiBib3VuZHNcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChib2FyZFt4XVt5K2ldLnZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCb2F0IGNvbGxpZGVzIHdpdGggYW5vdGhlciBib2F0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29vcmRpbmF0ZXNBcnJheS5wdXNoKFt4LCB5K2ldKVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZGluYXRlc0FycmF5Lmxlbmd0aDsgaSs9MSkge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFggPSBjb29yZGluYXRlc0FycmF5W2ldWzBdO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFkgPSBjb29yZGluYXRlc0FycmF5W2ldWzFdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmJvYXJkW2N1cnJlbnRYXVtjdXJyZW50WV0udmFsdWUgPSBib2F0O1xuICAgICAgICAgICAgdGhpcy5ib2FyZFtjdXJyZW50WF1bY3VycmVudFldLmhhc0JvYXQgPSB0cnVlO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3JkaW5hdGVzQXJyYXkubGVuZ3RoOyBpKz0xKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50WCA9IGNvb3JkaW5hdGVzQXJyYXlbaV1bMF07XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50WSA9IGNvb3JkaW5hdGVzQXJyYXlbaV1bMV07XG5cbiAgICAgICAgICAgIGNvbnN0IGFkamFjZW50Q2VsbHMgPSB0aGlzLmdldEFkamFjZW50Q2VsbENvb3JkaW5hdGVzKFtjdXJyZW50WCwgY3VycmVudFldKTtcbiAgICAgICAgICAgIGFkamFjZW50Q2VsbHMuZm9yRWFjaCgoY29vcmRpbmF0ZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY2hlY2tJZk91dE9mQm91bmRzKGNvb3JkaW5hdGVzKSAmJiAhKHRoaXMuZ2V0Q2VsbChjb29yZGluYXRlcykudmFsdWUgaW5zdGFuY2VvZiBCb2F0KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldENlbGwoY29vcmRpbmF0ZXMpLnZhbHVlID0gXCJ1bmF2YWlsYWJsZVwiO1xuICAgICAgICAgICAgICAgICAgICBib2F0LmFkamFjZW50Q29vcmRpbmF0ZXNBcnIucHVzaChjb29yZGluYXRlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGdldENlbGwoY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgY29uc3QgW3gsIHldID0gY29vcmRpbmF0ZXM7XG5cbiAgICAgICAgaWYgKHggPCB0aGlzLm1pblggfHwgeCA+IHRoaXMubWF4WCB8fCB5IDwgdGhpcy5taW5YIHx8IHkgPiB0aGlzLm1heFgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYm9hcmRbeF1beV07XG4gICAgfVxuXG4gICAgZ2V0QWRqYWNlbnRDZWxsQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgY29uc3QgW3gsIHldID0gY29vcmRpbmF0ZXM7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBbeCAtIDEsIHldLFxuICAgICAgICAgICAgW3ggKyAxLCB5XSxcbiAgICAgICAgICAgIFt4LCB5IC0gMV0sXG4gICAgICAgICAgICBbeCwgeSArIDFdLFxuICAgICAgICAgICAgW3ggLSAxLCB5IC0gMV0sXG4gICAgICAgICAgICBbeCArIDEsIHktIDFdLFxuICAgICAgICAgICAgW3ggLSAxLCB5ICsgMV0sXG4gICAgICAgICAgICBbeCArIDEsIHkgKyAxXSxcbiAgICAgICAgXVxuICAgIH1cblxuICAgIHNob290QWRqYWNlbnRDZWxscyhjZWxsKSB7XG4gICAgICAgIGNvbnN0IHthZGphY2VudENvb3JkaW5hdGVzQXJyfSA9IGNlbGwudmFsdWU7XG4gICAgICAgIC8vIGNvbnN0IGFkamFjZW50Q29vcmRpbmF0ZXMgPSB0aGlzLmdldEFkamFjZW50Q2VsbENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcblxuICAgICAgICBhZGphY2VudENvb3JkaW5hdGVzQXJyLmZvckVhY2goKGN1cnJlbnRDb29yZGluYXRlcykgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VyckNlbGwgPSB0aGlzLmdldENlbGwoY3VycmVudENvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIGlmIChjdXJyQ2VsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVjZWl2ZUF0dGFjayhjdXJyZW50Q29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNoZWNrSWZPdXRPZkJvdW5kcyhjb29yZGluYXRlcykge1xuICAgICAgICBjb25zdCBbeCwgeV0gPSBjb29yZGluYXRlcztcblxuICAgICAgICBpZiAoeCA8IHRoaXMubWluWCB8fCB4ID4gdGhpcy5tYXhYIHx8IHkgPCB0aGlzLm1pblkgfHwgeSA+IHRoaXMubWF4WSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcykge1xuICAgICAgICBjb25zdCBbeCwgeV0gPSBjb29yZGluYXRlcztcblxuICAgICAgICBpZiAodGhpcy5jaGVja0lmT3V0T2ZCb3VuZHMoY29vcmRpbmF0ZXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb29yZGluYXRlcyBhcmUgb3V0IG9mIGJvdW5kc1wiKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuYm9hcmRbeF1beV07XG4gICAgICAgIGNlbGwuaGl0ID0gdHJ1ZTtcblxuICAgICAgICBpZihjZWxsLnZhbHVlIGluc3RhbmNlb2YgQm9hdCkge1xuICAgICAgICAgICAgY2VsbC52YWx1ZS5oaXQoKTtcbiAgICAgICAgICAgIGlmIChjZWxsLnZhbHVlLmlzU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdEFkamFjZW50Q2VsbHMoY2VsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjZWxsLnZhbHVlID0gXCJkZXN0cm95ZWRcIjtcbiAgICAgICAgICAgIHJldHVybiBjZWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ib2FyZFt4XVt5XS52YWx1ZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gY2VsbDtcbiAgICB9XG5cbiAgICBjaGVja0ZsZWV0RGVzdHJ1Y3Rpb24oKSB7XG4gICAgICAgIGZvciAobGV0IHJvdyA9IHRoaXMubWluWDsgcm93IDw9IHRoaXMubWF4WDsgcm93Kz0xKSB7XG4gICAgICAgICAgICBmb3IobGV0IGNvbHVtbiA9IHRoaXMubWluWTsgY29sdW1uIDwgdGhpcy5tYXhZOyBjb2x1bW4rPTEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50Q2VsbCA9IHRoaXMuYm9hcmRbcm93XVtjb2x1bW5dO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Q2VsbC52YWx1ZSBpbnN0YW5jZW9mIEJvYXQgJiYgIShjdXJyZW50Q2VsbC52YWx1ZS5pc1N1bmsoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwbGFjZUJvYXRzKCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gR2FtZWJvYXJkLnNldEJvYXJkKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNTsgaSs9MSkge1xuICAgICAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuYm9hcmQubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmJvYXJkLmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSA9PT0gMCA/IFwieFwiIDogXCJ5XCI7XG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInhcIikge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxhY2VCb2F0SG9yaXpvbnRhbChpLCBbeCwgeV0pO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBpLT0xO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwieVwiKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFjZUJvYXRWZXJ0aWNhbChpLCBbeCwgeV0pO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBpLT0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkOyIsImNvbnN0IFBsYXllciA9IGZ1bmN0aW9uKGdhbWVib2FyZCwgbmFtZSkge1xuICAgIHRoaXMuZ2FtZWJvYXJkID0gZ2FtZWJvYXJkO1xuICAgIHRoaXMuaXNUdXJuID0gZmFsc2U7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbn1cblxuUGxheWVyLnByb3RvdHlwZS5zaG9vdCA9IGZ1bmN0aW9uKGVuZW15Qm9hcmQsIGNvb3JkaW5hdGVzKSB7XG4gICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyOyJdLCJuYW1lcyI6WyJET01Db250cm9sIiwiR2FtZSIsImRpc3BsYXkiLCJnYW1lIiwicGxheWVyMSIsImdhbWVib2FyZCIsInBsYWNlQm9hdHMiLCJwbGF5ZXIyIiwicmVuZGVyUGxheWVyMUdhbWVib2FyZCIsInJlbmRlclBsYXllcjJHYW1lYm9hcmQiLCJyYW5kb21pemVCb2F0c0J0biIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInN0YXJ0R2FtZUJ0biIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJyZW1vdmUiLCJCb2F0IiwiY29uc3RydWN0b3IiLCJsZW5ndGgiLCJoaXRDb3VudCIsIl9pc1N1bmsiLCJhZGphY2VudENvb3JkaW5hdGVzQXJyIiwiaGl0IiwiaXNTdW5rIiwiQ29tcHV0ZXIiLCJhZHZhbmNlZE1vZGUiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJzaG90c0FyciIsIm5hbWUiLCJjb29yZGluYXRlU3RhY2siLCJzaG9vdCIsImVuZW15Qm9hcmQiLCJjdXJyZW50Q29vcmRpbmF0ZXMiLCJwb3AiLCJpbmNsdWRlcyIsIkpTT04iLCJzdHJpbmdpZnkiLCJwdXNoIiwiY2VsbCIsImdldENlbGwiLCJyZWNlaXZlQXR0YWNrIiwiaGFzQm9hdCIsIngiLCJ5IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiY29vcmRpbmF0ZXMiLCJwcm90b3R5cGUiLCJzd2l0Y2hUdXJuIiwiY3VycmVudFR1cm4iLCJzZXRWaXNpYmxlIiwiYm9hcmRDb250YWluZXIiLCJ0ZXh0Q29udGVudCIsIm1pblgiLCJtYXhYIiwibWluWSIsIm1heFkiLCJjZWxsQ29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImJvYXJkIiwiYWRkVmlzaWJsZUF0dHJpYnV0ZXMiLCJhZGRBdHRyaWJ1dGVzIiwicGxheVJvdW5kIiwiYXBwZW5kQ2hpbGQiLCJjb250YWluZXIiLCJ2YWx1ZSIsImdhbWVPdmVyIiwid2lubmVyIiwid2luQmFubmVyIiwiUGxheWVyIiwiR2FtZWJvYXJkIiwicGxheWVyMkNvbXB1dGVyIiwicGxheWVyQm9hcmQiLCJjaGVja0dhbWVPdmVyIiwicGxheWVyMUdhbWVib2FyZCIsInBsYXllcjJHYW1lYm9hcmQiLCJjaGVja0ZsZWV0RGVzdHJ1Y3Rpb24iLCJzZXRCb2FyZCIsImkiLCJpMiIsInBsYWNlQm9hdEhvcml6b250YWwiLCJib2F0TGVuZ3RoIiwiYm9hdCIsIk9iamVjdCIsImFzc2lnbiIsImNvb3JkaW5hdGVzQXJyYXkiLCJjaGVja0lmT3V0T2ZCb3VuZHMiLCJFcnJvciIsImN1cnJlbnRYIiwiY3VycmVudFkiLCJhZGphY2VudENlbGxzIiwiZ2V0QWRqYWNlbnRDZWxsQ29vcmRpbmF0ZXMiLCJmb3JFYWNoIiwicGxhY2VCb2F0VmVydGljYWwiLCJzaG9vdEFkamFjZW50Q2VsbHMiLCJjdXJyQ2VsbCIsInJvdyIsImNvbHVtbiIsImN1cnJlbnRDZWxsIiwiZGlyZWN0aW9uIiwiZXJyIiwiaXNUdXJuIl0sInNvdXJjZVJvb3QiOiIifQ==