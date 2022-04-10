let boardBg;
let borderBoard = document.getElementById("snake-board");

let boardFood = "#006401";
let boardSnake = "#01008A";

let colorFood = "#42FF91";
let colorSnake = "#ADD9E6";

let snake = [
    {x: 200, y: 200},
    {x: 180, y: 200},
    {x: 160, y: 200},
    {x: 140, y: 200},
    {x: 120, y: 200}
]

let changingDct = false;
let foodX;
let foodY;
let dX = 20;
let dY = 0;

let score = 0;
let record = window.localStorage.getItem("your-record");

const snakeBoard = document.getElementById("snake-board");
const snakeBoard_ctx = snakeBoard.getContext("2d");

document.addEventListener("keydown", chgDirection);

function startGame() {
    if (hasGameEnded()) {
        
        borderBoard.style.borderColor = "#cc0000";
        endGameToggle();
        return;
    }

    changingDct = false;
    setTimeout(function onTick() {
        clearBoard();
        drawFood();
        drawSnake();
        moveSnake();

        startGame();
    }, lvlSpeed);

}

function clearBoard() {
    snakeBoard_ctx.fillStyle = boardBg;
    snakeBoard_ctx.fillRect(0, 0, snakeBoard.width, snakeBoard.height);
    snakeBoard_ctx.strokeRect(0, 0, snakeBoard.widht, snakeBoard.height);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function drawFood() {
    snakeBoard_ctx.fillStyle = colorFood;
    snakeBoard_ctx.strokestyle = boardFood;
    snakeBoard_ctx.fillRect(foodX, foodY, 20, 20);
    snakeBoard_ctx.strokeRect(foodX, foodY, 20, 20);
}

function drawSnakePart(snakePart) {
    snakeBoard_ctx.fillStyle = colorSnake;
    snakeBoard_ctx.strokestyle = boardSnake
    snakeBoard_ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
    snakeBoard_ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

function hasGameEnded() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeBoard.width - 20;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeBoard.height - 20;

    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall    
}

function randomFood(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 20) * 20; 
}

function genFood() {
    foodX = randomFood(0, snakeBoard.width - 20);
    foodY = randomFood(0, snakeBoard.height - 20);

    snake.forEach(function hasSnakeEatenFood(part) {
        const hasEaten = part.x == foodX && part.y == foodY;

        if (hasEaten) genFood();
    });
}

function chgDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (changingDct) return;
    changingDct = true;

    const keyPressed = event.keyCode;
    const up = dY === -20;
    const down = dY === 20;
    const right = dX === 20;
    const left = dX === -20;

    if (keyPressed === UP_KEY && !down) {
        dX = 0;
        dY = -20;
    }
    if (keyPressed === RIGHT_KEY && !left) {
        dX = 20;
        dY = 0;
    }
    if (keyPressed === DOWN_KEY && !up) {
        dX = 0;
        dY = 20;
    }
    if (keyPressed === LEFT_KEY && !right) {
        dX = -20;
        dY = 0;
    }
}

function moveSnake() {
    const head = {x: snake[0].x + dX, y: snake[0].y + dY};
    snake.unshift(head);

    const hasEatenFood = snake[0].x === foodX && snake[0].y === foodY;
    
    if (hasEatenFood) {
        score += 1;
        document.getElementById("score").innerHTML = score;
        genFood();
    }
    else {
        snake.pop();
    }
}

// function calcRecord() {
//     if (score > record) {
//         window.localStorage.setItem("your-record", score);
//     }
// }

function clearGame() {
    snake = [
        {x: 200, y: 200},
        {x: 180, y: 200},
        {x: 160, y: 200},
        {x: 140, y: 200},
        {x: 120, y: 200}
    ]

    changingDct = false;
    foodX;
    foodY;
    dX = 20;
    dY = 0;
    score = 0;
    
    borderBoard.style.borderColor = "#636f74";
    document.getElementById('score').innerHTML = "0";
}