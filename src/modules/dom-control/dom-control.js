const DOMControl = function() {

}

DOMControl.prototype.renderGameboard = function(gameboard, id, document = document) {
    for (let i = 0; i < 25; i+=1 ) {
        document.createElement("div");
    }
}

export default DOMControl;