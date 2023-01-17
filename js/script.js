window.onload = function() {

    var containerGame = document.querySelector('#container-game');
    var ctx = containerGame.getContext("2d"); // Selecionado o tipo de gráfico do conteinerGame
    document.addEventListener('touchstart', keyPush); // Toda vez o a tecla "keydown" for pressionada essa função sera executada

    setInterval(game, 160); // Define um intervalo para que uma função, game, seja chamada. Intervalo, no caso, de 160 milisegundos

    const numberBlocksForSecund = 1; // Define a quantidade de blocos que a cobrinha vai passar a cada 60 milissegundos, como desfinido anteriormente

    var velX = velY = 0; // Definindo a velocidade X e Y como 0
    var positionX = positionY = 10; // Definindo o ponto X e Y igual a 10
    var sizeBlock = 23; // Difinindo o length/tamanho de cada peça/bloco
    var numberBlocks = 23; // Definindo a quantidade de peças/blocos
    var positionFoodX = positionFoodY = 15; // Definindo a posição inicial da maçã/comida
    var trail = [];
    tail = 1; // Quantidade de blocos da cobrinha inicialmente

    // Mostrando o placar com o número de maças comidas
    var score = document.getElementById('score');
    score.innerText = "00";
    var numberScore = 0;

    // ESSA É A FUNÇÃO RESPONSÁVEL POR FAZER A ATUALIZAÇÃO DA POSIÇÃO DA COBTINHA E RENDERIZA-LA NOVAMENTE SEMPRE QUE ATUALIZADO
    function game() {
        positionX += velX;
        positionY += velY;
        // Se px, posição do X, for menor que 0, ou seja, se a cobrinha sair a cobrinha sair do container, ela vai aparecer no final, do outro lado
        if (positionX < 0) {
            positionX = numberBlocks - 1;
        }
        if (positionX > numberBlocks - 1) {
            positionX = 0;
        }
        if (positionY < 0) {
            positionY = numberBlocks - 1;
        }
        if (positionY > numberBlocks - 1) {
            positionY = 0;
        }

        // COR DO FUNDO DO CANVAS
        ctx.fillStyle = "gray"; // Cor do fundo da tag canvas
        ctx.fillRect(0, 0, containerGame.width, containerGame.height); // A partir do ponto 0(x), 0(y), ele vai pintar o containerGame de acordo com o width e o height e a cor dada 

        // COR DA MAÇÃ/COMIDA
        ctx.fillStyle = "red";
        ctx.fillRect(positionFoodX * sizeBlock, positionFoodY * sizeBlock, sizeBlock, sizeBlock);

        // COR DA COBRA
        ctx.fillStyle = "limegreen";
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * sizeBlock, trail[i].y * sizeBlock, sizeBlock - 1, sizeBlock - 1);

            // Verificando se a cabeça da cobra esta batendo no corpo/rabo. px e py sao a cabeça da cobrinha
            if (trail[i].x == positionX && trail[i].y == positionY) {
                velX = velY = 0; // Parando a cobra
                tail = 1; // Redefinindo o tamanho da cobrinha
                numberScore = 0;
                score.innerText = "00";
            }
        }

        // Criando um objeto/cobrinha e movimentos
        trail.push({ x: positionX, y: positionY })
        while (trail.length > tail) {
            trail.shift();
        }

        // Aumentar a cobra ao comer a maçã
        if (positionFoodX == positionX && positionFoodY == positionY) {
            tail++;
            numberScore++;
            score.innerText = numberScore < 10 ? `0${numberScore}` : numberScore;
            positionFoodX = Math.floor(Math.random() * numberBlocks);
            positionFoodY = Math.floor(Math.random() * numberBlocks);
        }
    }

    function keyPush() {
        var triangle = document.querySelector('.container-triangle');
        var xis = document.querySelector('.container-x');
        var square = document.querySelector('.container-square');
        var circle = document.querySelector('.container-circle');

        triangle.addEventListener('touchstart', () => {
            velX = 0;
            velY = -numberBlocksForSecund;
        });

        xis.addEventListener('touchstart', () => {
            velX = 0;
            velY = numberBlocksForSecund;
        });

        square.addEventListener('touchstart', () => {
            velX = -numberBlocksForSecund;
            velY = 0;
        });

        circle.addEventListener('touchstart', () => {
            velX = numberBlocksForSecund;
            velY = 0;
        });
    }
}