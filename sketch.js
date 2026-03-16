const largura = 800;
const altura = 500;

const raqueteLargura = 15;
const raqueteAltura = 100;
const margem = 30;

// Variáveis para armazenar as posições e velocidades do jogador, computador e bola.


let jogadorY;
let computadorY;
let alvoComputadorY;

let bolaX;
let bolaY;
let bolaVX;
let bolaVY;
const bolaTamanho = 16;
// Variáveis para armazenar os pontos do jogador e do computador.

// Essa função é chamada uma vez no início do jogo para configurar o ambiente, como criar a tela, definir as posições iniciais das raquetes e da bola, e reiniciar a bola para começar o jogo. 
function setup() {
// createCanvas(largura, altura) cria uma tela de jogo com as dimensões especificadas pelas variáveis largura e altura. Essa função é parte da biblioteca p5.js e é essencial para iniciar o ambiente gráfico do jogo.
  createCanvas(largura, altura);
  jogadorY = height / 2 - raqueteAltura / 2;
  computadorY = height / 2 - raqueteAltura / 2;
  alvoComputadorY = computadorY + raqueteAltura / 2;
  reiniciarBola();
}

// Essa função é chamada repetidamente para atualizar o estado do jogo, desenhar os elementos na tela e verificar as condições de vitória. Ela é o coração do loop de jogo, garantindo que tudo funcione de maneira fluida e responsiva.
function draw() {
  background(20);

  atualizarJogador();
  atualizarComputador();
  atualizarBola();
  desenharElementos();
  desenharPlacar();
}

function atualizarJogador() {
  // Atualiza a posição do jogador com base na posição do mouse, garantindo que a raquete não saia da tela.
  jogadorY = constrain(mouseY - raqueteAltura / 2, 0, height - raqueteAltura);
}

// Essa função serve para deixar a raquete do computador mais inteligente, prevendo onde a bola vai chegar e ajustando a posição da raquete para tentar interceptá-la. Ela calcula a velocidade do computador com base na velocidade da bola, tornando o jogo mais desafiador à medida que a bola se move mais rápido.
function atualizarComputador() {
  const centroComputador = computadorY + raqueteAltura / 2;
  const velocidadeBase = 4.8;
  const velocidadeExtra = map(abs(bolaVX), 5, 10, 0.4, 1.8, true);
  const velocidadeComputador = velocidadeBase + velocidadeExtra;

  // Se a bola estiver se movendo em direção ao computador, calcula onde ela vai chegar e ajusta o alvo do computador para tentar interceptá-la. Caso contrário, o computador se move lentamente em direção ao centro da tela.
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

// A função atualizarBola é responsável por atualizar a posição da bola com base em sua velocidade, verificar colisões com as paredes e as raquetes, e marcar pontos quando a bola ultrapassar as raquetes. Ela é essencial para o funcionamento do jogo, garantindo que a bola se mova de maneira realista e que as regras do jogo sejam aplicadas corretamente.
function atualizarBola() {
  bolaX += bolaVX;
  bolaY += bolaVY;

// if (bolaY - bolaTamanho / 2 <= 0 || bolaY + bolaTamanho / 2 >= height) verifica se a bola colidiu com as paredes superior ou inferior da tela. Se a bola atingir o topo (bolaY - bolaTamanho / 2 <= 0) ou a parte inferior (bolaY + bolaTamanho / 2 >= height), a velocidade vertical da bola (bolaVY) é invertida multiplicando-a por -1, fazendo com que a bola "quique" de volta para dentro da tela.
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
    aumentarVelocidadeAposRebatida();
  }

  // if (bolaX + bolaTamanho / 2 >= width - margem - raqueteLargura && bolaY >= computadorY && bolaY <= computadorY + raqueteAltura && bolaVX > 0) verifica se a bola colidiu com a raquete do computador. Se a bola atingir a posição da raquete do computador (bolaX + bolaTamanho / 2 >= width - margem - raqueteLargura) e estiver dentro dos limites verticais da raquete (bolaY >= computadorY && bolaY <= computadorY + raqueteAltura) e estiver se movendo em direção ao computador (bolaVX > 0), então a posição da bola é ajustada para que ela não ultrapasse a raquete, e a velocidade horizontal da bola (bolaVX) é invertida multiplicando-a por -1, fazendo com que a bola "quique" de volta para o lado do jogador.
  if (
    bolaX + bolaTamanho / 2 >= width - margem - raqueteLargura &&
    bolaY >= computadorY &&
    bolaY <= computadorY + raqueteAltura &&
    bolaVX > 0
  ) {
    bolaX = width - margem - raqueteLargura - bolaTamanho / 2;
    bolaVX *= -1;
    aumentarVelocidadeAposRebatida();
  }

  // if (bolaX < 0) verifica se a bola ultrapassou a raquete do computador, o que significa que o jogador marcou um ponto. Se isso acontecer, a função marcarPontoComputador() é chamada para incrementar o placar do computador, e a função reiniciarBola() é chamada para resetar a posição da bola para o centro da tela e iniciar um novo lance. O mesmo processo ocorre se a bola ultrapassar a raquete do jogador, marcando um ponto para o computador.
  if (bolaX < 0) {
    marcarPontoComputador();
    reiniciarBola();
  } else if (bolaX > width) {
    marcarPontoJogador();
    reiniciarBola();
  }
}

function reiniciarBola() {
  // Reinicia a posição da bola no centro da tela.
  bolaX = width / 2;
  bolaY = height / 2;

  let direcaoX = random() < 0.5 ? -1 : 1;
  let direcaoY = random(-1, 1);

  if (abs(direcaoY) < 0.3) {
    direcaoY = direcaoY < 0 ? -0.3 : 0.3;
  }

  bolaVX = VELOCIDADE_INICIAL_BOLA * direcaoX;
  bolaVY = VELOCIDADE_INICIAL_BOLA * direcaoY;
}

// A função desenharElementos é responsável por desenhar os elementos visuais do jogo, como as raquetes, a bola e a linha central. Ela utiliza funções de desenho da biblioteca p5.js para criar uma representação visual do jogo na tela.
function desenharElementos() {
  fill(255);
  noStroke();

  rect(margem, jogadorY, raqueteLargura, raqueteAltura);
  // rect serve para desenhar as raquetes do jogador e do computador. O primeiro parâmetro é a posição x, o segundo é a posição y, o terceiro é a largura da raquete e o quarto é a altura da raquete. A função rect é usada duas vezes para desenhar as duas raquetes.
  rect(width - margem - raqueteLargura, computadorY, raqueteLargura, raqueteAltura);
  circle(bolaX, bolaY, bolaTamanho);

  stroke(100);
  for (let y = 0; y < height; y += 30) {
    line(width / 2, y, width / 2, y + 15);
  }
}

