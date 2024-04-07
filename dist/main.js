"use strict";
(self["webpackChunkwebpack_template"] = self["webpackChunkwebpack_template"] || []).push([["main"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_boat_boat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/boat/boat.js */ "./src/modules/boat/boat.js");
/* harmony import */ var _modules_computer_computer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/computer/computer.js */ "./src/modules/computer/computer.js");
/* harmony import */ var _modules_gameboard_gameboard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/gameboard/gameboard.js */ "./src/modules/gameboard/gameboard.js");
/* harmony import */ var _modules_player_player_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/player/player.js */ "./src/modules/player/player.js");
/* eslint-disable no-unused-vars */




const player1 = new _modules_player_player_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
const computer = new _modules_computer_computer_js__WEBPACK_IMPORTED_MODULE_1__["default"](false);
const player1Board = new _modules_gameboard_gameboard_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
const computerBoard = new _modules_gameboard_gameboard_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
player1Board.placeBoat(new _modules_boat_boat_js__WEBPACK_IMPORTED_MODULE_0__["default"](4), [6, 4], "y");
player1Board.placeBoat(new _modules_boat_boat_js__WEBPACK_IMPORTED_MODULE_0__["default"](1), [3, 3]);
player1Board.placeBoat(new _modules_boat_boat_js__WEBPACK_IMPORTED_MODULE_0__["default"](2), [1, 1]);
player1Board.placeBoat(new _modules_boat_boat_js__WEBPACK_IMPORTED_MODULE_0__["default"](3), [7, 6], "y");
computerBoard.placeBoat(new _modules_boat_boat_js__WEBPACK_IMPORTED_MODULE_0__["default"](4), [6, 4], "y");
computerBoard.placeBoat(new _modules_boat_boat_js__WEBPACK_IMPORTED_MODULE_0__["default"](1), [3, 3]);
computerBoard.placeBoat(new _modules_boat_boat_js__WEBPACK_IMPORTED_MODULE_0__["default"](2), [1, 1]);
computerBoard.placeBoat(new _modules_boat_boat_js__WEBPACK_IMPORTED_MODULE_0__["default"](3), [7, 6], "y");

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
  constructor() {
    let advancedMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    this.advancedMode = advancedMode;
    this.shotsArr = [];
    if (this.advancedMode) {
      this.shoot = function () {};
    } else {
      this.shoot = function (enemyBoard) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const coordinates = [x, y];
        if (this.shotsArr.includes(JSON.stringify(coordinates))) {
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

/***/ "./src/modules/gameboard/gameboard.js":
/*!********************************************!*\
  !*** ./src/modules/gameboard/gameboard.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Gameboard {
  constructor() {
    this.board = Gameboard.setBoard();
    this.missedShots = [];
  }
  static setBoard() {
    const board = [];
    for (let i = 0; i < 10; i += 1) {
      board.push([]);
    }
    return board;
  }
  placeBoat(boat, coordinates) {
    let direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "x";
    const [x, y] = coordinates;
    const board = Object.assign([], this.board); // pretty sure this isn't working
    let i = 0;
    if (direction === "x") {
      for (; i < boat.length; i += 1) {
        if (board[x + i][y]) {
          throw new Error("Boat collides with another boat");
        }
        board[x + i][y] = boat;
      }
      if (x + (i - 1) > 10) {
        throw new Error("Boat out of bounds");
      }
    } else {
      for (; i < boat.length; i += 1) {
        if (board[x][y + i]) {
          throw new Error("Boat collides with another boat");
        }
        board[x][y + i] = boat;
      }
      if (y + (i - 1) > 10) {
        throw new Error("Boat out of bounds");
      }
    }
    this.board = board;
  }
  receiveAttack(coordinates) {
    const [x, y] = coordinates;
    if (!(x > 0 && x < this.board.length) || !(y > 0 && y < this.board.length)) {
      throw new Error("Coordinates are out of bounds");
    }

    // if (this.hits.includes(JSON.stringify(coordinates))) {
    //     throw new Error("Cell has already been hit");
    // }

    if (this.board[x][y]) {
      this.board[x][y].hit();
      return;
    }
    this.missedShots.push(JSON.stringify(coordinates));
  }
  checkFleetDestruction() {
    for (let row = 0; row < this.board.length; row += 1) {
      for (let column = 0; column < this.board[row].length; column += 1) {
        if (this.board[row][column] && !this.board[row][column].isSunk()) {
          return false;
        }
      }
    }
    return true;
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
// class Player {
//     constructor() {
//         this.shotsArr = [];
//     }

//     shoot(enemyBoard, coordinates) {
//         // if (this.shotsArr.includes(JSON.stringify(coordinates))) {
//         //     throw new Error("Cell has already been shot");
//         // }

//         // this.shotsArr.push(JSON.stringify(coordinates))
//         enemyBoard.receiveAttack(coordinates);
//     }
// }

const Player = function () {};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNYLEtBQUssQ0FBQ1UsR0FBRyxDQUFDLENBQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDWCxLQUFLLENBQUNVLEdBQUcsQ0FBQyxDQUFDQyxNQUFNLENBQUMsQ0FBQzdCLE1BQU0sQ0FBQyxDQUFFLEVBQUU7VUFDaEUsT0FBTyxLQUFLO1FBQ2hCO01BQ0o7SUFDSjtJQUNBLE9BQU8sSUFBSTtFQUNmO0FBQ0o7QUFFQSxpRUFBZVosU0FBUzs7Ozs7Ozs7Ozs7Ozs7QUM1RXhCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU1DLE1BQU0sR0FBRyxTQUFBQSxDQUFBLEVBQVcsQ0FDMUIsQ0FBQztBQUVEQSxNQUFNLENBQUN5QyxTQUFTLENBQUN6QixLQUFLLEdBQUcsVUFBU0MsVUFBVSxFQUFFTSxXQUFXLEVBQUU7RUFDdkROLFVBQVUsQ0FBQ1csYUFBYSxDQUFDTCxXQUFXLENBQUM7QUFDekMsQ0FBQztBQUVELGlFQUFldkIsTUFBTSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL2JvYXQvYm9hdC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvY29tcHV0ZXIvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL3BsYXllci9wbGF5ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCBCb2F0IGZyb20gXCIuL21vZHVsZXMvYm9hdC9ib2F0LmpzXCI7XG5pbXBvcnQgQ29tcHV0ZXIgZnJvbSBcIi4vbW9kdWxlcy9jb21wdXRlci9jb21wdXRlci5qc1wiO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9tb2R1bGVzL2dhbWVib2FyZC9nYW1lYm9hcmQuanNcIjtcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vbW9kdWxlcy9wbGF5ZXIvcGxheWVyLmpzXCI7XG5cbmNvbnN0IHBsYXllcjEgPSBuZXcgUGxheWVyKCk7XG5jb25zdCBjb21wdXRlciA9IG5ldyBDb21wdXRlcihmYWxzZSk7XG5jb25zdCBwbGF5ZXIxQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG5jb25zdCBjb21wdXRlckJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuXG5wbGF5ZXIxQm9hcmQucGxhY2VCb2F0KG5ldyBCb2F0KDQpLCBbNiwgNF0sIFwieVwiKTtcbnBsYXllcjFCb2FyZC5wbGFjZUJvYXQobmV3IEJvYXQoMSksIFszLCAzXSk7XG5wbGF5ZXIxQm9hcmQucGxhY2VCb2F0KG5ldyBCb2F0KDIpLCBbMSwgMV0pO1xucGxheWVyMUJvYXJkLnBsYWNlQm9hdChuZXcgQm9hdCgzKSwgWzcsIDZdLCBcInlcIik7XG5cbmNvbXB1dGVyQm9hcmQucGxhY2VCb2F0KG5ldyBCb2F0KDQpLCBbNiwgNF0sIFwieVwiKTtcbmNvbXB1dGVyQm9hcmQucGxhY2VCb2F0KG5ldyBCb2F0KDEpLCBbMywgM10pO1xuY29tcHV0ZXJCb2FyZC5wbGFjZUJvYXQobmV3IEJvYXQoMiksIFsxLCAxXSk7XG5jb21wdXRlckJvYXJkLnBsYWNlQm9hdChuZXcgQm9hdCgzKSwgWzcsIDZdLCBcInlcIikiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuY2xhc3MgQm9hdCB7XG4gICAgY29uc3RydWN0b3IobGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLmhpdENvdW50ID0gMDtcbiAgICAgICAgdGhpcy5faXNTdW5rID0gZmFsc2U7XG4gICAgfTtcblxuICAgIGhpdCgpIHtcbiAgICAgICAgdGhpcy5oaXRDb3VudCs9MTtcblxuICAgICAgICBcbiAgICB9XG5cbiAgICBpc1N1bmsoKSB7XG4gICAgICAgIGlmICh0aGlzLmhpdENvdW50ID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9pc1N1bmsgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzU3VuaztcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBCb2F0OyIsIi8qIGVzbGludC1kaXNhYmxlIGZ1bmMtbmFtZXMgKi9cbmNsYXNzIENvbXB1dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihhZHZhbmNlZE1vZGUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmFkdmFuY2VkTW9kZSA9IGFkdmFuY2VkTW9kZTtcbiAgICAgICAgdGhpcy5zaG90c0FyciA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLmFkdmFuY2VkTW9kZSkge1xuICAgICAgICAgICAgdGhpcy5zaG9vdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvb3QgPSBmdW5jdGlvbihlbmVteUJvYXJkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW3gsIHldO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hvdHNBcnIuaW5jbHVkZXMoSlNPTi5zdHJpbmdpZnkoY29vcmRpbmF0ZXMpKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob290KGVuZW15Qm9hcmQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zaG90c0Fyci5wdXNoKEpTT04uc3RyaW5naWZ5KGNvb3JkaW5hdGVzKSk7XG4gICAgICAgICAgICAgICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbXB1dGVyOyIsImNsYXNzIEdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBHYW1lYm9hcmQuc2V0Qm9hcmQoKTtcbiAgICAgICAgdGhpcy5taXNzZWRTaG90cyA9IFtdO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXRCb2FyZCgpIHtcbiAgICAgICAgY29uc3QgYm9hcmQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSs9MSkge1xuICAgICAgICAgICAgYm9hcmQucHVzaChbXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYm9hcmQ7XG4gICAgfVxuXG4gICAgcGxhY2VCb2F0KGJvYXQsIGNvb3JkaW5hdGVzLCBkaXJlY3Rpb24gPSBcInhcIikge1xuICAgICAgICBjb25zdCBbeCwgeV0gPSBjb29yZGluYXRlcztcbiAgICAgICAgY29uc3QgYm9hcmQgPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLmJvYXJkKTsgLy8gcHJldHR5IHN1cmUgdGhpcyBpc24ndCB3b3JraW5nXG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICAgIGZvciAoOyBpIDwgYm9hdC5sZW5ndGg7IGkrPTEpIHtcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRbeCtpXVt5XSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCb2F0IGNvbGxpZGVzIHdpdGggYW5vdGhlciBib2F0XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBib2FyZFt4K2ldW3ldID0gYm9hdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHggKyAoaS0xKSA+IDEwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQm9hdCBvdXQgb2YgYm91bmRzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yICg7IGkgPCBib2F0Lmxlbmd0aDsgaSs9MSkge1xuICAgICAgICAgICAgICAgIGlmIChib2FyZFt4XVt5K2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJvYXQgY29sbGlkZXMgd2l0aCBhbm90aGVyIGJvYXRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJvYXJkW3hdW3kraV0gPSBib2F0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoeSArIChpLTEpID4gMTApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCb2F0IG91dCBvZiBib3VuZHNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XG4gICAgfVxuXG4gICAgcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcykge1xuICAgICAgICBjb25zdCBbeCwgeV0gPSBjb29yZGluYXRlcztcbiAgICAgICAgaWYgKCEoeCA+IDAgJiYgeCA8IHRoaXMuYm9hcmQubGVuZ3RoKSB8fCAhKHkgPiAwICYmIHkgPCB0aGlzLmJvYXJkLmxlbmd0aCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvb3JkaW5hdGVzIGFyZSBvdXQgb2YgYm91bmRzXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgKHRoaXMuaGl0cy5pbmNsdWRlcyhKU09OLnN0cmluZ2lmeShjb29yZGluYXRlcykpKSB7XG4gICAgICAgIC8vICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDZWxsIGhhcyBhbHJlYWR5IGJlZW4gaGl0XCIpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgaWYodGhpcy5ib2FyZFt4XVt5XSkge1xuICAgICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XS5oaXQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWlzc2VkU2hvdHMucHVzaChKU09OLnN0cmluZ2lmeShjb29yZGluYXRlcykpO1xuICAgIH1cblxuICAgIGNoZWNrRmxlZXREZXN0cnVjdGlvbigpIHtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5ib2FyZC5sZW5ndGg7IHJvdys9MSkge1xuICAgICAgICAgICAgZm9yKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCB0aGlzLmJvYXJkW3Jvd10ubGVuZ3RoOyBjb2x1bW4rPTEpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ib2FyZFtyb3ddW2NvbHVtbl0gJiYgISh0aGlzLmJvYXJkW3Jvd11bY29sdW1uXS5pc1N1bmsoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDsiLCIvLyBjbGFzcyBQbGF5ZXIge1xuLy8gICAgIGNvbnN0cnVjdG9yKCkge1xuLy8gICAgICAgICB0aGlzLnNob3RzQXJyID0gW107XG4vLyAgICAgfVxuXG4vLyAgICAgc2hvb3QoZW5lbXlCb2FyZCwgY29vcmRpbmF0ZXMpIHtcbi8vICAgICAgICAgLy8gaWYgKHRoaXMuc2hvdHNBcnIuaW5jbHVkZXMoSlNPTi5zdHJpbmdpZnkoY29vcmRpbmF0ZXMpKSkge1xuLy8gICAgICAgICAvLyAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2VsbCBoYXMgYWxyZWFkeSBiZWVuIHNob3RcIik7XG4vLyAgICAgICAgIC8vIH1cblxuLy8gICAgICAgICAvLyB0aGlzLnNob3RzQXJyLnB1c2goSlNPTi5zdHJpbmdpZnkoY29vcmRpbmF0ZXMpKVxuLy8gICAgICAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuLy8gICAgIH1cbi8vIH1cblxuY29uc3QgUGxheWVyID0gZnVuY3Rpb24oKSB7XG59XG5cblBsYXllci5wcm90b3R5cGUuc2hvb3QgPSBmdW5jdGlvbihlbmVteUJvYXJkLCBjb29yZGluYXRlcykge1xuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiXSwibmFtZXMiOlsiQm9hdCIsIkNvbXB1dGVyIiwiR2FtZWJvYXJkIiwiUGxheWVyIiwicGxheWVyMSIsImNvbXB1dGVyIiwicGxheWVyMUJvYXJkIiwiY29tcHV0ZXJCb2FyZCIsInBsYWNlQm9hdCIsImNvbnN0cnVjdG9yIiwibGVuZ3RoIiwiaGl0Q291bnQiLCJfaXNTdW5rIiwiaGl0IiwiaXNTdW5rIiwiYWR2YW5jZWRNb2RlIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwic2hvdHNBcnIiLCJzaG9vdCIsImVuZW15Qm9hcmQiLCJ4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwieSIsImNvb3JkaW5hdGVzIiwiaW5jbHVkZXMiLCJKU09OIiwic3RyaW5naWZ5IiwicHVzaCIsInJlY2VpdmVBdHRhY2siLCJib2FyZCIsInNldEJvYXJkIiwibWlzc2VkU2hvdHMiLCJpIiwiYm9hdCIsImRpcmVjdGlvbiIsIk9iamVjdCIsImFzc2lnbiIsIkVycm9yIiwiY2hlY2tGbGVldERlc3RydWN0aW9uIiwicm93IiwiY29sdW1uIiwicHJvdG90eXBlIl0sInNvdXJjZVJvb3QiOiIifQ==