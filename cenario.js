function mostrarImagem(id, left, top) {
    var imagem = document.getElementById(id).cloneNode(true); // Clona a imagem com base no ID
    imagem.style.position = 'absolute';
    imagem.style.left = left + 'px';
    imagem.style.top = top + 'px';
    imagem.style.display = 'block'; // Exibe a imagem
    document.querySelector('.cenario').appendChild(imagem);
}

// Exemplo de uso:
mostrarImagem('tiles1luz', 0, 100);
mostrarImagem('tiles1luz', 100, 100);
mostrarImagem('tiles1luz', 200, 100);
mostrarImagem('tiles1luz', 300, 100);
mostrarImagem('tiles1luz', 400, 100);
mostrarImagem('tiles1luz', 500, 100);
mostrarImagem('tiles1luz', 600, 100);
mostrarImagem('tiles1luz', 700, 100);
