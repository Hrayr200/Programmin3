
var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Terminator extends  LiveForm {
    
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
       
    
    move() {
        this.energy--;

        let emptyCells = this.chooseCell(0);
        let emptyCells1 = this.chooseCell(1);
        let emptyCells2 = this.chooseCell(2);
        let emptyCells3 = this.chooseCell(3);
        let emptyCells4 = this.chooseCell(4);
        let emptyCells5 = this.chooseCell(5);
        let emptyCells6 = this.chooseCell(6);
        let newCell = random(emptyCells.concat(emptyCells1).concat(emptyCells2).concat(emptyCells3).concat(emptyCells4).concat(emptyCells5).concat(emptyCells6));


        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;

            for (let i in terminatorArr) {
                if (terminatorArr[i].x == x && terminatorArr[i].y == y) {
                    terminatorArr.splice(i, 1)
                }
            }

            this.y = y;
            this.x = x;
        }
        
    }
    
}
