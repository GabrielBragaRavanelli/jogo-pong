const VELOCIDADE_INICIAL_BOLA = 5;
const VELOCIDADE_MAXIMA_BOLA = 12;
const ACELERACAO_POR_REBATIDA = 0.4;

function aumentarVelocidadeAposRebatida() {
	const velocidadeAtual = sqrt(bolaVX * bolaVX + bolaVY * bolaVY);

	if (velocidadeAtual === 0) {
		return;
	}

	const novaVelocidade = min(
		velocidadeAtual + ACELERACAO_POR_REBATIDA,
		VELOCIDADE_MAXIMA_BOLA
	);
	const fator = novaVelocidade / velocidadeAtual;

	bolaVX *= fator;
	bolaVY *= fator;
}
