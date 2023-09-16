// Obtém as referências para todas as imagens de direção
var imagensDirecao = {
    aDireita: document.getElementById('aDireita'),
    pDireita: document.getElementById('pDireita'),
    aCima: document.getElementById('aCima'),
    pCima: document.getElementById('pCima'),
    aBaixo: document.getElementById('aBaixo'),
    pBaixo: document.getElementById('pBaixo'),
    pEsquerda: document.getElementById('pEsquerda'),
    aEsquerda: document.getElementById('aEsquerda'),

    cDireita: document.getElementById('cDireita'),
    cEsquerda: document.getElementById('cEsquerda'),
    cBaixo: document.getElementById('cBaixo'),
    cCima: document.getElementById('cCima'),
    
    sDireita: document.getElementById('sDireita'),
    sEsquerda: document.getElementById('sEsquerda'),
    sBaixo: document.getElementById('sBaixo'),
    sCima: document.getElementById('sCima'),
};

audioTapa = document.getElementById('slap');
audioTapa.volume = 0.1;
audioTuc = document.getElementById('tuc');
audioTuc.volume = 0.2;

var teclaZPressionada = false;
var teclaXPressionada = false;

// Define a posição inicial da imagem
var posX = 0;
var posY = 0;

// Define a direção atual do personagem
var direcaoAtual = 'pBaixo'; // Começa parado para baixo

// Define a velocidade de movimento
var velocidade = 2;

// Variáveis para rastrear as teclas pressionadas
var teclasPressionadas = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

// Função para atualizar a posição de soco e cabeçada
function atualizarPosicaoSocoCabecada() {
    imagensDirecao.sDireita.style.transform = `translate(${posX}px, ${posY}px)`;
    imagensDirecao.sEsquerda.style.transform = `translate(${posX}px, ${posY}px)`;
    imagensDirecao.cDireita.style.transform = `translate(${posX}px, ${posY}px)`;
    imagensDirecao.cEsquerda.style.transform = `translate(${posX}px, ${posY}px)`;
    imagensDirecao.sCima.style.transform = `translate(${posX}px, ${posY}px)`;
    imagensDirecao.sBaixo.style.transform = `translate(${posX}px, ${posY}px)`;
    imagensDirecao.cCima.style.transform = `translate(${posX}px, ${posY}px)`;
    imagensDirecao.cBaixo.style.transform = `translate(${posX}px, ${posY}px)`;
}


// Função para mover a imagem
function moverImagem() {
    // Resetar a visibilidade das imagens de direção
    for (var direcao in imagensDirecao) {
        imagensDirecao[direcao].style.display = 'none';
    }

    if (teclaZPressionada) {
        if (direcaoAtual === 'aDireita' || direcaoAtual === 'pDireita') {
            imagensDirecao.sDireita.style.display = 'block';
            audioTapa.play();
        } else if (direcaoAtual === 'aEsquerda' || direcaoAtual === 'pEsquerda') {
            imagensDirecao.sEsquerda.style.display = 'block';
            audioTapa.play();
        }else if (direcaoAtual === 'aCima' || direcaoAtual === 'pCima') {
            imagensDirecao.sCima.style.display = 'block';
            audioTapa.play();
        } else if (direcaoAtual === 'aBaixo' || direcaoAtual === 'pBaixo') {
            imagensDirecao.sBaixo.style.display = 'block';
            audioTapa.play();
        }
        ocultarImagensParadas();
    } else if (teclaXPressionada) {
        if (direcaoAtual === 'aDireita' || direcaoAtual === 'pDireita') {
            imagensDirecao.cDireita.style.display = 'block';
            audioTuc.play();
        } else if (direcaoAtual === 'aEsquerda' || direcaoAtual === 'pEsquerda') {
            imagensDirecao.cEsquerda.style.display = 'block';
            audioTuc.play();
        }else if (direcaoAtual === 'aCima' || direcaoAtual === 'pCima') {
            imagensDirecao.cCima.style.display = 'block';
            audioTuc.play();
        } else if (direcaoAtual === 'aBaixo' || direcaoAtual === 'pBaixo') {
            imagensDirecao.cBaixo.style.display = 'block';
            audioTuc.play();
        }
        ocultarImagensParadas();
    } else {
        // Atualiza a posição de movimento apenas se não for soco nem cabeçada
        var movimento = false;

        if (teclasPressionadas.ArrowRight) {
            imagensDirecao.aDireita.style.display = 'block';
            direcaoAtual = 'aDireita';
            posX += velocidade;
            movimento = true;
        } else if (teclasPressionadas.ArrowLeft) {
            imagensDirecao.aEsquerda.style.display = 'block';
            direcaoAtual = 'aEsquerda';
            posX -= velocidade;
            movimento = true;
        } else if (teclasPressionadas.ArrowUp) {
            imagensDirecao.aCima.style.display = 'block';
            direcaoAtual = 'aCima';
            posY -= velocidade;
            movimento = true;
        } else if (teclasPressionadas.ArrowDown) {
            imagensDirecao.aBaixo.style.display = 'block';
            direcaoAtual = 'aBaixo';
            posY += velocidade;
            movimento = true;
        }

        // Atualiza a posição da imagem de acordo com a direção apenas se em movimento
        if (movimento) {
            imagensDirecao[direcaoAtual].style.transform = `translate(${posX}px, ${posY}px)`;
            atualizarPosicaoSocoCabecada();
        }
    }

    // Se nenhuma tecla de movimento ou ação estiver pressionada, mostrar a imagem parada na posição atual
    if (!teclasPressionadas.ArrowRight && !teclasPressionadas.ArrowLeft && !teclasPressionadas.ArrowUp && !teclasPressionadas.ArrowDown && !teclaZPressionada && !teclaXPressionada) {
        imagensDirecao['p' + direcaoAtual.slice(1)].style.display = 'block';
        imagensDirecao['p' + direcaoAtual.slice(1)].style.transform = `translate(${posX}px, ${posY}px)`;
    }

    // Chama a função novamente no próximo quadro de animação
    requestAnimationFrame(moverImagem);
}

function ocultarImagensParadas() {
    // Ocultar todas as imagens paradas
    for (var direcao in imagensDirecao) {
        if (direcao.startsWith('p')) {
            imagensDirecao[direcao].style.display = 'none';
        }
    }
}



// Adiciona eventos de escuta de teclado para keydown e keyup
document.addEventListener('keydown', function (event) {
    // Verifica qual tecla das setas do teclado foi pressionada
    if (event.key in teclasPressionadas) {
        // Define a tecla correspondente como pressionada
        teclasPressionadas[event.key] = true;
    }

    // Verifica se a tecla "Z" foi pressionada
    if (event.key === 'z') {
        teclaZPressionada = true;
        // Adicione aqui a lógica para a ação de soco
    }

    // Verifica se a tecla "X" foi pressionada
    if (event.key === 'x') {
        teclaXPressionada = true;
        // Adicione aqui a lógica para a ação de cabeçada
    }
});

document.addEventListener('keyup', function (event) {
    // Verifica qual tecla das setas do teclado foi liberada
    if (event.key in teclasPressionadas) {
        // Define a tecla correspondente como não pressionada
        teclasPressionadas[event.key] = false;
    }

    // Verifica se a tecla "Z" foi liberada
    if (event.key === 'z') {
        teclaZPressionada = false;
    }

    // Verifica se a tecla "X" foi liberada
    if (event.key === 'x') {
        teclaXPressionada = false;
    }
});

// Inicia o loop principal para mover a imagem
moverImagem();
