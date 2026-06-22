const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gameLoopId;
let jogando = false;
let score = 0;

// Variáveis para controlar o tempo real 
let ultimoTempo = 0;
const fpsAlvo = 60;
const intervaloAlvo = 1000 / fpsAlvo;

// Carregar Imagens Customizadas
const imgPlayer = new Image();
imgPlayer.src = 'includes/img/player.png'; // Foto do Dean

const imgObstaculo = new Image();
imgObstaculo.src = 'includes/img/obstaculo.png'; // Foto do monstro

// Propriedades do Personagem (O Impala)
const player = {
    x: 50,
    y: 190,
    width: 55,  
    height: 40, 
    vy: 0,
    gravity: 1.2,
    jumpForce: -20,
    isJumping: false
};

// Propriedades do Obstáculo (O Demônio)
const obstaculo = {
    x: 600,
    y: 195,
    width: 35,  
    height: 35, 
    speed: 6
};

// Captura comandos de pulo (Teclado, Clique e Toque no celular)
window.addEventListener("keydown", (e) => { if (e.code === "Space") pular(); });
canvas.addEventListener("touchstart", (e) => { e.preventDefault(); pular(); });
canvas.addEventListener("mousedown", pular);

function pular() {
    if (!player.isJumping && jogando) {
        player.vy = player.jumpForce;
        player.isJumping = true;
    }
}

function iniciarJogoSuperNet() {
    // Cancela qualquer loop antigo para não travar
    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
        gameLoopId = null;
    }

    document.getElementById("tela-gameover").style.display = "none";
    jogando = true;
    score = 0;
    
    obstaculo.x = 600;
    obstaculo.speed = 6;
    
    player.y = 190;
    player.vy = 0;
    player.isJumping = false;
    
    // Inicializa o relógio do jogo
    ultimoTempo = performance.now();
    atualizarJogo(ultimoTempo);
}

function pararJogoSuperNet() {
    jogando = false;
    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
        gameLoopId = null;
    }
}

function reiniciarJogoSuperNet() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    iniciarJogoSuperNet();
}

function actualizarLogica(modificador) {
    // Aplica a gravidade e o pulo multiplicando pelo tempo real (Hertz)
    player.vy += player.gravity * modificador;
    player.y += player.vy * modificador;

    if (player.y >= 190) {
        player.y = 190;
        player.vy = 0;
        player.isJumping = false;
    }

    // Move o obstáculo multiplicando pelo tempo real (Hertz)
    obstaculo.x -= obstaculo.speed * modificador;
    if (obstaculo.x < -obstaculo.width) {
        obstaculo.x = 600 + Math.random() * 150; 
        score += 10; 
        if(obstaculo.speed < 12) obstaculo.speed += 0.5; 
    }
}

function atualizarJogo(tempoAtual) {
    if (!jogando) return;

    // Calcula o tempo que passou desde o último frame
    const tempoDecorrido = tempoAtual - ultimoTempo;
    ultimoTempo = tempoAtual;

    // Cria o modificador que equilibra telas de 60Hz, 144Hz, etc.
    const modificador = tempoDecorrido / intervaloAlvo;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Atualiza a física do jogo de forma estável
    actualizarLogica(modificador);

    // Desenhar Personagem
    if (imgPlayer.complete && imgPlayer.naturalWidth !== 0) {
        ctx.drawImage(imgPlayer, player.x, player.y, player.width, player.height);
    } else {
        ctx.fillStyle = "#007bff";
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    // Desenhar Obstáculo
    if (imgObstaculo.complete && imgObstaculo.naturalWidth !== 0) {
        ctx.drawImage(imgObstaculo, obstaculo.x, obstaculo.y, obstaculo.width, obstaculo.height);
    } else {
        ctx.fillStyle = "#ff4b5c";
        ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.width, obstaculo.height);
    }

    // Desenhar Pontuação
    ctx.fillStyle = "white";
    ctx.font = "bold 18px Arial";
    ctx.fillText(`Monstros Caçados: ${score}`, 20, 30);

    // Detecção de colisão
    if (
        player.x < obstaculo.x + obstaculo.width &&
        player.x + player.width > obstaculo.x &&
        player.y < obstaculo.y + obstaculo.height &&
        player.y + player.height > obstaculo.y
    ) {
        jogando = false;
        document.getElementById("tela-gameover").style.display = "block";
        return;
    }

    gameLoopId = requestAnimationFrame(atualizarJogo);
}