function mostrarSurpresa() {
    document.getElementById("tela-inicial").style.display = "none";
    document.getElementById("surpresa").style.display = "block";
    document.body.classList.add("fundo-coracoes");

    var audio = document.getElementById("meu-audio");
    audio.play().catch(function(error) {
        console.log("O som vai tocar após a primeira interação.", error);
    });
}

function abrirSecao(idSecao) {
    document.querySelector(".menu-cartas").style.display = "none";
    document.getElementById("titulo-menu").style.display = "none";
    document.getElementById(idSecao).style.display = "block";
}

function fecharSecao(idSecao) {
    document.getElementById(idSecao).style.display = "none";
    document.querySelector(".menu-cartas").style.display = "flex";
    document.getElementById("titulo-menu").style.display = "block";

    if(idSecao === 'carta-jogo') {
        let btnSim = document.getElementById('btn-sim');
        btnSim.style.position = 'static';
    }
}

function fugaBotao(botao) {
    botao.style.position = "fixed";
    
    // a largura e altura reais da tela do celular/computador
    const larguraJanela = window.innerWidth;
    const alturaJanela = window.innerHeight;
    
    // tamanho do botão para ele não sumir pelas bordas
    const larguraBotao = botao.offsetWidth;
    const alturaBotao = botao.offsetHeight;
    
    // Gera uma posição aleatória deixando uma margem de segurança de 20 pixels das bordas
    const novoX = Math.random() * (larguraJanela - larguraBotao - 40) + 20;
    const novoY = Math.random() * (alturaJanela - alturaBotao - 40) + 20;
    
    botao.style.left = novoX + "px";
    botao.style.top = novoY + "px";
}

function respostaNunca() {
    alert("Acho bom ter escolhido essa mesmo! ❤️🥰");
    }

    function voltarParaInicio() {
    // Esconde o menu das cartas
    document.getElementById("surpresa").style.display = "none";
    
    // Mostra a tela inicial de novo
    document.getElementById("tela-inicial").style.display = "block";
    }
