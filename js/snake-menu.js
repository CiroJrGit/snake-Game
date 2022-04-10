let snakeMenu = [
    {x: -420, y: 50},
    {x: -390, y: 50},
    {x: -360, y: 50},
    {x: -330, y: 50},
    {x: -300, y: 50},
    {x: -270, y: 50}
]

let foodMenuX = 510;
let foodMenuY = 50;
let dMenuX = 30;
let dMenuY = 0;

const snakeSlide = document.getElementById("snake-menu");
const snakeSlide_ctx = snakeSlide.getContext("2d");

function starSlide() {
    setTimeout(function onTick() {
        clearBoardMenu() 
        drawFoodMenu();
        drawSnakeMenu();
        moveSnakeMenu();
        restartAnimation();

        starSlide();
    }, 80);
}

starSlide();


function clearBoardMenu() {
    snakeSlide_ctx.clearRect(0, 0, snakeSlide.width, snakeSlide.height);
}

function drawSnakeMenu() {
    snakeMenu.forEach(drawSnakeMenuPart);
}

function drawSnakeMenuPart(snakeMenuPart) {
    snakeSlide_ctx.fillStyle = colorSnake;
    snakeSlide_ctx.strokestyle = boardSnake
    snakeSlide_ctx.fillRect(snakeMenuPart.x, snakeMenuPart.y, 30, 30);
    snakeSlide_ctx.strokeRect(snakeMenuPart.x, snakeMenuPart.y, 30, 30);
}

function drawFoodMenu() {
    snakeSlide_ctx.fillStyle = colorFood;
    snakeSlide_ctx.strokestyle = "#42FF91";
    snakeSlide_ctx.fillRect(foodMenuX, foodMenuY, 30, 30);
    snakeSlide_ctx.strokeRect(foodMenuX, foodMenuY, 30, 30);
}

function genFoodMenu() {
    if (foodMenuX === 510) {
        foodMenuX = 180;
    }
    else 
        foodMenuX = 510;
}

function moveSnakeMenu() {
    const head = {x: snakeMenu[0].x + dMenuX, y: snakeMenu[0].y + dMenuY};
    snakeMenu.unshift(head);
    snakeMenu.pop();

    const hasEatenFood = snakeMenu[0].x === foodMenuX && snakeMenu[0].y === foodMenuY;
    
    if (hasEatenFood) {
        genFoodMenu();
    }
}

function restartAnimation() {
    const hitLeftWall = snakeMenu[0].x < - 400;
    const hitRightWall = snakeMenu[0].x > snakeSlide.width + 400;
    
    if (hitLeftWall) {
        dMenuX = 30;
        dMenuY = 0;
    }
    if (hitRightWall) {
        dMenuX = -30;
        dMenuY = 0;
    }
}