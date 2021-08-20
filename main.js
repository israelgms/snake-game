let snake = document.getElementById("snake");
let context = snake.getContext("2d");
let box = 32; //32px cada quadradinho
let cobrinha = [];
cobrinha[0] = {
    x: 8 * box,
    y: 8 * box
}

let direcao = "right";

function criarBG() {
    context.fillStyle = "yellow"; //fill Style = Estilo do canvas.
    context.fillRect(0, 0, 16 * box, 16 * box); //fillRect = Onde acontecerá o jogo 4 parametros ( X e Y, Altura e Largura)
}

var criarCobrinha = () => {
    for (i = 0; i < cobrinha.length; i++) {
        context.fillStyle = "black";
        context.fillRect(cobrinha[i].x, cobrinha[i].y, box, box);
    }
}

const update = () => {
    //37 direita, 38 baixo, 39 esquerda, 40 cima
    if (event.keyCode == 37 && direcao != "right") direcao = "left";
    if (event.keyCode == 38 && direcao != "down") direcao = "up";
    if (event.keyCode == 39 && direcao != "left") direcao = "right";
    if (event.keyCode == 40 && direcao != "up") direcao = "down";
    console.log(direcao);
}

//Evento de escuta
document.addEventListener('keydown', update);


//Comida
let comida = {
    //Math.floor retira parte flutuante ( virgula +...)
    //Math.random gera números aleatorios
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
var alimentar = () => {
    context.fillStyle = "blue"
    context.fillRect(comida.x, comida.y, box, box);
}


//Iniciar jogo
const start = () => {
    //Logica pra cobrinha sair de um lado, e surgir do outro.
    if (cobrinha[0].x > 15 * box && direcao == "right") cobrinha[0].x = 0;
    if (cobrinha[0].x < 0 && direcao == "left") cobrinha[0].x = 16 * box;
    if (cobrinha[0].y > 15 * box && direcao == "down") cobrinha[0].y = 0;
    if (cobrinha[0].y < 0 && direcao == "up") cobrinha[0].y = 16 * box;
    //

    criarBG();
    criarCobrinha();
    alimentar();
    //posição inicial da cobrinha
    let cobrinhaX = cobrinha[0].x;
    let cobrinhaY = cobrinha[0].y;

    if (direcao == "right") cobrinhaX += box;
    if (direcao == "left") cobrinhaX -= box;
    if (direcao == "up") cobrinhaY -= box;
    if (direcao == "down") cobrinhaY += box;



    let cabeca = {
        x: cobrinhaX,
        y: cobrinhaY
    }

    cobrinha.unshift(cabeca);

    //Logica da alimentação da cobrinha (quando ela come, aumenta e gera outra comida, em outro lugar)
    if (cobrinhaX != comida.x || cobrinhaY != comida.y) {
        cobrinha.pop();
    }else{
        comida.x = Math.floor(Math.random() * 15 + 1) * box;
        comida.y = Math.floor(Math.random() * 15 + 1) * box;
    }
}

let jogo = setInterval(start, 100);