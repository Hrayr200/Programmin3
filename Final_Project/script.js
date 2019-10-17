function setup() {
    var socket = io();
    var side = 30;
    var matrix = [];
    
    //! Getting DOM objects (HTML elements)
    let weatherElement = document.getElementById('weather');
    let grassCountElement = document.getElementById('grassCount');
    let grassLiveCountElement = document.getElementById('grassLiveCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let huntCountElement = document.getElementById('huntCount');
    let terminatorCountElement = document.getElementById('termCount');
    let titanCountElement = document.getElementById('titanCount');
    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 
    socket.on("data", drawCreatures);
    function drawCreatures(data) {
        // let sendData = {
        //     matrix: matrix,
        //     grassCounter: grassHashiv,
        //     grassLiveCounter: grassArr.length,
        //     eatCounter: eatHashiv,
        //     huntCounter: huntHashiv,
        //     termCounter: termHashiv,
        //     titanCounter: titanHashiv,
        //     weather: weather
        // }

        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        weatherElement.innerText = data.weather;
        grassCountElement.innerText = data.grassCounter;
        grassLiveCountElement.innerText = data.grassLiveCounter;
        grassEaterCountElement.innerText = data.eatCounter;
        huntCountElement.innerText = data.huntCounter;
        terminatorCountElement.innerText = data.termCounter;
        titanCountElement.innerText = data.titanCounter;
        //! Every time it creates new Canvas with new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 1) {
                    if(data.weather == "summer"){
                        fill("green");
                    }else if (data.weather == "autumn"){
                        fill("orange");
                    }else if (data.weather == "winter"){
                        fill("white");
                    }else if (data.weather == "spring"){
                        fill("pink");
                    }
                }
                else if (matrix[y][x] == 0) {
                    fill("#acacac");
                }
                else if (matrix[y][x] == 2) {
                    fill("orange");
                }
                else if (matrix[y][x] == 3) {
                    fill("red");
                }
                else if (matrix[y][x] == 4) {
                    fill("black");
                }
        
                else if (matrix[y][x] == 5) {
                    fill("blue");
                }
                rect(x * side, y * side, side, side);
            }
        }
        
    }
}






// let matrix = [];
// let side = 20;
// let grassArr = [];
// let grassEaterArr = [];
// let predatorArr = [];
// let bombaArr = [];
// let amenakerArr = [];

// function setup() {
//     matrixGenerator(30, 250, 60, 40, 30,20);
//     frameRate(8);
//     createCanvas(matrix[0].length * side, matrix.length * side);
//     background('#acacac');
//     for (var y = 0; y < matrix.length; y++) {
//         for (var x = 0; x < matrix[y].length; x++) {
//             if (matrix[y][x] == 1) {
//                 let grass = new Grass(x, y);
//                 grassArr.push(grass);
//             }
//             if (matrix[y][x] == 2) {
//                 let grassEater = new GrassEater(x, y);
//                 grassEaterArr.push(grassEater);
//             }
//             if (matrix[y][x] == 3) {
//                 let gishatich = new Predator(x, y);
//                 predatorArr.push(gishatich);
//             }

//             if (matrix[y][x] == 4) {
//                 let bomb = new Bomba(x, y);
//                 bombaArr.push(bomb);

//             }
//             if (matrix[y][x] == 5) {
//                 let amenaker = new Amenaker(x, y);
//                 amenakerArr.push(amenaker);
//             }
            
//         }
//     }
//     function matrixGenerator(matrixSize, grass, grassEater, gishatich,bomb,amenaker) {
//         for (let i = 0; i < matrixSize; i++) {
//             matrix[i] = [];
//             for (let o = 0; o < matrixSize; o++) {
//                 matrix[i][o] = 0;
//             }
//         }
//         for (let i = 0; i < grass; i++) {
//             let customX = Math.floor(random(0, matrixSize)); // 0 - 49
//             let customY = Math.floor(random(0, matrixSize));
//             matrix[customY][customX] = 1;
//         }
//         for (let i = 0; i < grassEater; i++) {
//             let customX = Math.floor(random(0, matrixSize));
//             let customY = Math.floor(random(0, matrixSize));
//             matrix[customY][customX] = 2;
//         }

//         for (let i = 0; i < gishatich; i++) {
//             let customX = Math.floor(random(0, matrixSize));
//             let customY = Math.floor(random(0, matrixSize));
//             matrix[customY][customX] = 3;
//         }
//         for (let i = 0; i < bomb; i++) {
//             let customX = Math.floor(random(0, matrixSize));
//             let customY = Math.floor(random(0, matrixSize));
//             matrix[customY][customX] = 4;
//         }

//         for (let i = 0; i < amenaker; i++) {
//             let customX = Math.floor(random(0, matrixSize));
//             let customY = Math.floor(random(0, matrixSize));
//             matrix[customY][customX] = 5;
//         }
        
        
        
//     }
// }

// function draw() {
//     for (var y = 0; y < matrix.length; y++) {
//         for (var x = 0; x < matrix[y].length; x++) {
//             if (matrix[y][x] == 1) {
//                 fill("green");
//             }
//             else if (matrix[y][x] == 0) {
//                 fill("#acacac");
//             }
//             else if (matrix[y][x] == 2) {
//                 fill("orange");
//             }
//             else if (matrix[y][x] == 3) {
//                 fill("red");
//             }
//             else if (matrix[y][x] == 4) {
//                 fill("black");
//             }

//             else if (matrix[y][x] == 5) {
//                 fill("blue");
//             }
//             rect(x * side, y * side, side, side);
//         }
//     }

//     //յուրաքանչյուր խոտ փորձում է բազմանալ
//     for (var i in grassArr) {
//         grassArr[i].mul(); //80
//     }

//     for (var i in grassEaterArr) {
//         grassEaterArr[i].eat();
//     }

//     for (var i in predatorArr) {
//         predatorArr[i].eat();
//     }

//     for (var i in bombaArr) {
//         bombaArr[i].eat();
//     }

//     for (var i in amenakerArr) {
//         amenakerArr[i].eat();
//     }

// }
