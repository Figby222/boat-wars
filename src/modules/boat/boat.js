/* eslint-disable no-underscore-dangle */
class Boat {
    constructor(length) {
        this.length = length;
        this.hitCount = 0;
        this._isSunk = false;
        this.coordinatesArr = [];
    };

    hit() {
        this.hitCount+=1;

        
    }

    isSunk() {
        if (this.hitCount >= this.length) {
            this._isSunk = true;
        }

        return this._isSunk;
    }
};

export default Boat;