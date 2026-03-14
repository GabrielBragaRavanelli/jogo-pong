let pontosJogador = 0;
let pontosComputador = 0;
// essas duas variaves são utilizadas para armazenar os pontos do jogador e do computador.



// A função marcarPontoJogador é utilizada quando a bola ultrapssar a raquete do computador, assim, marcando ponto para o jogador.
function marcarPontoJogador() {
  pontosJogador++;
}

// A função marcarPontoComputador é utilizada quando a bola ultrapssar a raquete do jogador, assim, marcando ponto para o computador.
function marcarPontoComputador() {
// Incrementa o placar do computador. O ++ é um operador de incremento que aumenta o valor da variável pontosComputador em 1 cada vez que a função é chamada. Vale a mesma coisa na function marcarPontoJogador.
  pontosComputador++;
}

// A função desenharPlacar é responsável por exibir o placar do jogo na tela, mostrando os pontos do jogador e do computador. 
function desenharPlacar() {
  fill(255);
  textSize(32);
  textAlign(CENTER, TOP);
  //text(`${pontosJogador} x ${pontosComputador}`, width / 2, 20) exibe o placar do jogo no centro superior da tela. O texto é formatado para mostrar os pontos do jogador e do computador separados por um "x". 
  text(`${pontosJogador} x ${pontosComputador}`, width / 2, 20);
}