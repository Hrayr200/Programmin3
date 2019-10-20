var Grass = require("./modules/class.grass.js");
var GrassEater = require("./modules/class.eatgrass.js");
var Predator = require("./modules/class.predator.js");
var Amenaker = require("./modules/class.bigeater.js");
var Bomba = require("./modules/class.bomb.js");
var Terminator = require('./modules/class.terminator.js');

grassArr = [];
grassEaterArr = [];
predatorArr = [];
bombaArr = [];
amenakerArr = [];
terminatorArr = [];

grassHashiv = 0;
grassEatHashiv = 0;
predatorHashiv = 0;
bombaHashiv = 0;
amenakerHashiv = 0;
terminatorHashiv = 0;


function matrixGenerator(matrixSize, grass, grassEater, gishatich,bomb,amenaker,terminator) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(0, matrixSize)); 
        let customY = Math.floor(random(0, matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(0, matrixSize));
        let customY = Math.floor(random(0, matrixSize));
        matrix[customY][customX] = 2;
    }

    for (let i = 0; i < gishatich; i++) {
        let customX = Math.floor(random(0, matrixSize));
        let customY = Math.floor(random(0, matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < bomb; i++) {
        let customX = Math.floor(random(0, matrixSize));
        let customY = Math.floor(random(0, matrixSize));
        matrix[customY][customX] = 4;
    }

    for (let i = 0; i < amenaker; i++) {
        let customX = Math.floor(random(0, matrixSize));
        let customY = Math.floor(random(0, matrixSize));
        matrix[customY][customX] = 5;
    } 

    for (let i = 0; i < terminator; i++) {
        let customX = Math.floor(random(0, matrixSize));
        let customY = Math.floor(random(0, matrixSize));
        matrix[customY][customX] = 6;
    }
    
}

matrixGenerator(30, 250, 60, 40, 30,20,1);


var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);


function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEatHashiv++;
            }
            if (matrix[y][x] == 3) {
                let gishatich = new Predator(x, y);
                predatorArr.push(gishatich);
                predatorHashiv++;
            }

            if (matrix[y][x] == 4) {
                let bomb = new Bomba(x, y);
                bombaArr.push(bomb);
                bombaHashiv++;
            }
            if (matrix[y][x] == 5) {
                let amenaker = new Amenaker(x, y);
                amenakerArr.push(amenaker);
                amenakerHashiv++;
            }

            if (matrix[y][x] == 6) {
                let terminator = new Terminator(x, y);
                terminatorArr.push(terminator);
                terminatorHashiv++;
            }
            
        }
    }
}

creatingObjects();



let exanak = 0;
let weather = "winter"

function game() {

    exanak++;
    if (exanak <= 10){
        weather = "summer"
    }else if (exanak <= 20){
        weather = "autumn"
    }else if (exanak <= 30){
        weather = "winter"
    }else if (exanak <= 40){
        weather = "spring"
    }else if (exanak > 40){
        exanak = 0
    }


    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul(); 
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].eat();
        }
    }
    if (bombaArr[0] !== undefined) {
        for (var i in bombaArr) {
            bombaArr[i].eat();
        }
    }
    if (amenakerArr[0] !== undefined) {
        for (var i in amenakerArr) {
            amenakerArr[i].eat();
        }
    }
    if (terminatorArr[0] !== undefined) {
        for (var i in terminatorArr) {
            terminatorArr[i].term();
        }
    }

    
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassLiveCounter: grassArr.length,
        grassEaterCount: grassEatHashiv,
        predatorCount: predatorHashiv,
        bombaCount: bombaHashiv,
        amenakerCount: amenakerHashiv,
        terminatorCount: terminatorHashiv,
        weather: weather
    }

    
    io.sockets.emit("data", sendData);
}


setInterval(game, 1000) 


