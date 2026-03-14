let pontosJogador = 0;
let pontosComputador = 0;

function marcarPontoJogador() {
  pontosJogador++;
}

function marcarPontoComputador() {
  pontosComputador++;
}

function desenharPlacar() {
  fill(255);
  textSize(32);
  textAlign(CENTER, TOP);
  text(`${pontosJogador} x ${pontosComputador}`, width / 2, 20);
}