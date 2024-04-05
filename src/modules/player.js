class Player {
    constructor() {
        this.shotsArr = [];
    }

    shoot(coordinates) {
        if (this.shotsArr.includes(JSON.stringify(coordinates))) {
            throw new Error("Cell has already been shot");
        }

        this.shotsArr.push(JSON.stringify(coordinates))
        return coordinates;
    }
}

export default Player;