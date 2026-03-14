const largura = 800;
const altura = 500;

const raqueteLargura = 15;
const raqueteAltura = 100;
const margem = 30;

let jogadorY;
let computadorY;
let alvoComputadorY;

let bolaX;
let bolaY;
let bolaVX;
let bolaVY;
const bolaTamanho = 16;

function setup() {
  createCanvas(largura, altura);
  jogadorY = height / 2 - raqueteAltura / 2;
  computadorY = height / 2 - raqueteAltura / 2;
  alvoComputadorY = computadorY + raqueteAltura / 2;
  reiniciarBola();
}

function draw() {
  background(20);

  atualizarJogador();
  atualizarComputador();
  atualizarBola();
  desenharElementos();
  desenharPlacar();
}

function atualizarJogador() {
  jogadorY = constrain(mouseY - raqueteAltura / 2, 0, height - raqueteAltura);
}

function atualizarComputador() {
  const centroComputador = computadorY + raqueteAltura / 2;
  const velocidadeBase = 4.8;
  const velocidadeExtra = map(abs(bolaVX), 5, 10, 0.4, 1.8, true);
  const velocidadeComputador = velocidadeBase + velocidadeExtra;

  if (bolaVX > 0) {
    const distanciaAteRaquete = width - margem - raqueteLargura - bolaX;
    const framesAteRaquete = max(distanciaAteRaquete / bolaVX, 0);
    let previsaoY = bolaY + bolaVY * framesAteRaquete;

    while (previsaoY < 0 || previsaoY > height) {
      if (previsaoY < 0) {
        previsaoY *= -1;
      } else {
        previsaoY = 2 * height - previsaoY;
      }
    }

    alvoComputadorY = constrain(previsaoY, raqueteAltura / 2, height - raqueteAltura / 2);
  } else {
    alvoComputadorY = lerp(alvoComputadorY, height / 2, 0.08);
  }

  if (centroComputador < alvoComputadorY - velocidadeComputador) {
    computadorY += velocidadeComputador;
  } else if (centroComputador > alvoComputadorY + velocidadeComputador) {
    computadorY -= velocidadeComputador;
  }

  computadorY = constrain(computadorY, 0, height - raqueteAltura);
}

function atualizarBola() {
  bolaX += bolaVX;
  bolaY += bolaVY;

  if (bolaY - bolaTamanho / 2 <= 0 || bolaY + bolaTamanho / 2 >= height) {
    bolaVY *= -1;
  }

  if (
    bolaX - bolaTamanho / 2 <= margem + raqueteLargura &&
    bolaY >= jogadorY &&
    bolaY <= jogadorY + raqueteAltura &&
    bolaVX < 0
  ) {
    bolaX = margem + raqueteLargura + bolaTamanho / 2;
    bolaVX *= -1;
  }

  if (
    bolaX + bolaTamanho / 2 >= width - margem - raqueteLargura &&
    bolaY >= computadorY &&
    bolaY <= computadorY + raqueteAltura &&
    bolaVX > 0
  ) {
    bolaX = width - margem - raqueteLargura - bolaTamanho / 2;
    bolaVX *= -1;
  }

  if (bolaX < 0) {
    marcarPontoComputador();
    reiniciarBola();
  } else if (bolaX > width) {
    marcarPontoJogador();
    reiniciarBola();
  }
}

function reiniciarBola() {
  bolaX = width / 2;
  bolaY = height / 2;

  let direcaoX = random() < 0.5 ? -1 : 1;
  let direcaoY = random(-1, 1);

  if (abs(direcaoY) < 0.3) {
    direcaoY = direcaoY < 0 ? -0.3 : 0.3;
  }

  const velocidade = 5;
  bolaVX = velocidade * direcaoX;
  bolaVY = velocidade * direcaoY;
}

function desenharElementos() {
  fill(255);
  noStroke();

  rect(margem, jogadorY, raqueteLargura, raqueteAltura);
  rect(width - margem - raqueteLargura, computadorY, raqueteLargura, raqueteAltura);
  circle(bolaX, bolaY, bolaTamanho);

  stroke(100);
  for (let y = 0; y < height; y += 30) {
    line(width / 2, y, width / 2, y + 15);
  }
}

