var Grass = require("./modules/class.grass.js");
var GrassEater = require("./modules/class.eatgrass.js");
var Predator = require("./modules/class.predator.js");
var BigEater = require("./modules/class.bigeater.js");
var Bomb = require("./modules/class.bomb.js");
// piti avelacnem let random = require('./modules/random');

grassArr = [];
grassEaterArr = [];
predatorArr = [];
bombaArr = [];
amenakerArr = [];
// 6 kerpar matrix = [];

grassHashiv = 0;
grasseatHashiv = 0;
predatorHashiv = 0;
bombaHashiv = 0;
amenakerHashiv = 0;


function matrixGenerator(matrixSize, grass, grassEater, gishatich,bomb,amenaker) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(0, matrixSize)); // 0 - 49
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
    
}

matrixGenerator(30, 250, 60, 40, 30,20);


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
            }
            if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            }
            if (matrix[y][x] == 3) {
                let gishatich = new Predator(x, y);
                predatorArr.push(gishatich);
            }

            if (matrix[y][x] == 4) {
                let bomb = new Bomba(x, y);
                bombaArr.push(bomb);

            }
            if (matrix[y][x] == 5) {
                let amenaker = new Amenaker(x, y);
                amenakerArr.push(amenaker);
            }

            // 6 erord kerpariny 
            // if (matrix[y][x] == 5) {
            //     let amenaker = new Amenaker(x, y);
            //     amenakerArr.push(amenaker);
            // }
            
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
    if (eatArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (huntArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].eat();
        }
    }
    if (termArr[0] !== undefined) {
        for (var i in bombaArr) {
            bombaArr[i].eat();
        }
    }
    if (titanArr[0] !== undefined) {
        for (var i in amenakerArr) {
            amenakerArr[i].eat();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassLiveCounter: grassArr.length,
        eatCounter: eatHashiv,
        huntCounter: huntHashiv,
        termCounter: termHashiv,
        titanCounter: titanHashiv,
        weather: weather
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}


setInterval(game, 1000) 


