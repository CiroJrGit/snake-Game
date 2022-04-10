let tglGame = document.getElementById("game-box")
let tglMenu = document.getElementById("main-menu");
let tglConfig = document.getElementById("config-menu");
let tglEndGame = document.getElementById("end-menu");
let tglInSoon = document.getElementById("msg-rank");

let lvlSpeed;
let inputSpeed = document.getElementById("lvl-speed");
let lvlPrev = document.getElementById("prev");
let lvlNext = document.getElementById("next");

const htmlTag = document.getElementsByTagName("html")[0];
const theme = window.localStorage.getItem("site-theme");

const link = document.querySelector("link[rel~='icon']");
const icon = window.localStorage.getItem("icon-theme");


//Fecha o menu principal e abre o jogo
function playGameToggle() {
    tglMenu.classList.toggle("active");
    tglGame.classList.toggle("active");


    if (htmlTag.hasAttribute("data-theme"))
        boardBg = "#41484b";
    else
        boardBg = "#f0fbff";

    calcSnakeSpeed();
    startGame();
    genFood();
}

//Abre o menu de fim de jogo
function endGameToggle() {
    setTimeout(function() {
        tglEndGame.classList.toggle("active");
    }, 700);
}

//Fecha jogo e menu fim de jogo, abre menu principal e reseta o jogo
function backToMenuToggle() {
    tglMenu.classList.toggle("active");
    tglGame.classList.toggle("active");
    tglEndGame.classList.toggle("active");

    clearGame();
}

//Aplica alteracoes feitas no menu config, fecha/abre o menu config
function configMenuToggle() {
    colorSnake = document.getElementById("color-snake").value;
    colorFood = document.getElementById("color-food").value;
    document.getElementById("color-g").style.color = colorFood;
    
    tglConfig.classList.toggle("active");
}

function comingInSoon() {
    tglInSoon.classList.toggle("active");

    setTimeout(function onTick() {
        tglInSoon.classList.toggle("active");
    }, 400);
}

//Reinicia jogo pela tela de fim de jogo
function restartGame() {
    tglEndGame.classList.toggle("active");

    clearGame();
    startGame();
    genFood();
}

//Reseta as cores de cobra e comida
function setColorDefault() {
    document.getElementById("color-snake").value = "#add9e6";
    document.getElementById("color-food").value = "#42FF91";
}

//Diminui o level de velocidade da cobra pelo input
function prevLevelSpeed() {
    if (inputSpeed.value == "1") return;

    document.getElementById("lvl-speed").value--;
}

//Aumenta o level de velocidade da cobra pelo input
function nextLevelSpeed() {
    if (inputSpeed.value == "5") return;

    document.getElementById("lvl-speed").value++;
}

//Aplica a velocidade relacionada ao nivel selecionado
function calcSnakeSpeed() {
    if (inputSpeed.value == "1") lvlSpeed = 200;
    if (inputSpeed.value == "2") lvlSpeed = 130;
    if (inputSpeed.value == "3") lvlSpeed = 95;
    if (inputSpeed.value == "4") lvlSpeed = 70;
    if (inputSpeed.value == "5") lvlSpeed = 55;
}

//Alterna o tema claro e escuro
function applyThemeToggle () {    
    if (htmlTag.hasAttribute("data-theme")) {
        htmlTag.removeAttribute("data-theme")
        link.setAttribute("href", "imgs/snake-icon-light.png");
        
        return window.localStorage.removeItem("site-theme"), window.localStorage.removeItem("icon-theme");
    }

    htmlTag.setAttribute("data-theme", "dark")
    link.setAttribute("href", "imgs/snake-icon-dark.png");

    window.localStorage.setItem("site-theme", "dark");
    window.localStorage.setItem("icon-theme", "dark");

}

//Aplica o ultimo tema salvo em cache no navegador
function applyInitialTheme () {
    if (theme !== null) {
        htmlTag.setAttribute("data-theme", theme);
        document.getElementById("theme-toggle").checked = true;
    }
}
applyInitialTheme();
document.getElementById("theme-toggle").addEventListener("click", applyThemeToggle);