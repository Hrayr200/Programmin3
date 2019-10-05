class Bomba {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.life = 6;
        this.directions = [];
    }
    getNewcordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ];

    }
    chooseCell(character) {
        this.getNewcordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {

            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 1;

            let b = new Bomba(x, y);
            bombaArr.push(b);

            this.life = 6;
        }
    }
    eat() {
        let emptyCells5 = this.chooseCell(5);
        let emptyCells1 = this.chooseCell(2);
        let emptyCells2 = this.chooseCell(3);
        let newCell = random(emptyCells5.concat(emptyCells1).concat(emptyCells2));

        if (newCell) {
            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }

            for (let i in predatorArr) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1)
                }
            }

            for (let i in amenakerArr) {
                if (amenakerArr[i].x == x && amenakerArr[i].y == y) {
                    amenakerArr.splice(i, 1)
                }
            }

            this.x = x;
            this.y = y;

            if (this.life >= 9) {
                this.die();
            }
        } else {
            this.move()
        }
    }
    move() {
        this.life--;

        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;
        }
        if (this.life < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in bombaArr) {
            if (bombaArr[i].x == this.x && bombaArr[i].y == this.y) {
                bombaArr.splice(i, 1)
            }
        }
    }
}