var cartaGhile = {
  nome: "ghile",
  classe: "bardo",
  imagem: "./CSS/ghile.png",
  atributos: {
    ataque: 100,
    defesa: 50,
    magia: 0,
  },
};

var cartaVelleda = {
  nome: "velleda",
  classe: "feiticeiro",
  imagem: "./CSS/velleda.png",
  atributos: {
    ataque: 25,
    defesa: 25,
    magia: 100,
  },
};

var cartaMy = {
  nome: "my",
  classe: "paladino",
  imagem: "./CSS/my.png",
  atributos: {
    ataque: 0,
    defesa: 100,
    magia: 50,
  },
};

var cartaRasfa = {
  nome: "rasfa",
  classe: "ladino",
  imagem: "./CSS/rasfa.png",
  atributos: {
    ataque: 75,
    defesa: 50,
    magia: 25,
  },
};

var cartaVhb = {
  nome: "veagabe",
  classe: "tank",
  imagem: "./CSS/veagabe.png",
  atributos: {
    ataque: 5,
    defesa: 140,
    magia: 5,
  },
};

var cartaSinther = {
  nome: "sinther",
  classe: "mago",
  imagem: "./CSS/sinther.png",
  atributos: {
    ataque: 0,
    defesa: 50,
    magia: 100,
  },
};

var cartaMaquina;
var cartaJogador;
var cartas = [
  cartaGhile,
  cartaVelleda,
  cartaMy,
  cartaRasfa,
  cartaVhb,
  cartaSinther,
];
var pontosJogador = 0;
var pontosMaquina = 0;

atualizaPlacar();
atualizaQuantidadeDeCartas();

function atualizaQuantidadeDeCartas() {
  var divQuantidadeCartas = document.getElementById("quantidade-cartas");
  var html = "Quantidade de cartas no jogo: " + cartas.length;

  divQuantidadeCartas.innerHTML = html;
}
function atualizaPlacar() {
  var divPlacar = document.getElementById("placar");
  var html = "Jogador " + pontosJogador + " / " + pontosMaquina + " Máquina";
  divPlacar.innerHTML = html;
}
function sortear() {
  var numeroMaquina = parseInt(Math.random() * cartas.length);
  cartaMaquina = cartas[numeroMaquina];
  cartas.splice(numeroMaquina, 1);

  var numeroJogador = parseInt(Math.random() * cartas.length);
  cartaJogador = cartas[numeroJogador];
  cartas.splice(numeroJogador, 1);

  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = false;

  exibeCartaJogador();
}

function exibeCartaJogador() {
  var divCartaJogador = document.getElementById("jogador");
  var moldura =
    '<img src="./CSS/card-super-trunfo-transparent-ajustado.png" style=" width: 360px; height: 500px; position: absolute;">';
  divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`;
  var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`;
  var classe = `<p class="carta-classe">${cartaJogador.classe}</p>`;
  var opcoesTxt = "";

  for (var atributo in cartaJogador.atributos) {
    opcoesTxt +=
      "<input type='radio' name='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      " " +
      cartaJogador.atributos[atributo] +
      "<br>";
  }

  var html = "<div id='opcoes' class='carta-status'>";

  divCartaJogador.innerHTML =
    moldura + nome + classe + html + opcoesTxt + "</div>";
}

function obtemAtributo() {
  var radioAtributo = document.getElementsByName("atributo");
  for (var i = 0; i < radioAtributo.length; i++) {
    if (radioAtributo[i].checked) {
      return radioAtributo[i].value;
    }
  }
}

function jogar() {
  var divResultado = document.getElementById("resultado");
  var atributoSelecionado = obtemAtributo();
  if (
    cartaJogador.atributos[atributoSelecionado] >
    cartaMaquina.atributos[atributoSelecionado]
  ) {
    htmlResultado = "<p class='resultado-final'>Venceu!</p>";
    pontosJogador++;
  } else if (
    cartaJogador.atributos[atributoSelecionado] <
    cartaMaquina.atributos[atributoSelecionado]
  ) {
    htmlResultado = "<p class='resultado-final'>Perdeu!</p>";
    pontosMaquina++;
  } else {
    htmlResultado = "<p class='resultado-final'>Empatou!</p>";
  }

  if (cartas.length == 0) {
    var divResultadoCartas = document.getElementById("resultadoCartas");
    htmlResultadoCartas = "<p class='resultado-final'>Acabaram as cartas!</p>";
    divResultadoCartas.innerHTML = htmlResultadoCartas;
    document.getElementById("btnJogar").disabled = true;
    document.getElementById("btnProximaRodada").disabled = true;

    if (pontosJogador > pontosMaquina) {
      htmlResultado = "<p class='resultado-final'>Venceu!</p>";
    } else if (pontosJogador < pontosMaquina) {
      htmlResultado = "<p class='resultado-final'>Perdeu!</p>";
    } else {
      htmlResultado = "<p class='resultado-final'>Empatou!</p>";
    }
  } else {
    document.getElementById("btnJogar").disabled = true;
    document.getElementById("btnProximaRodada").disabled = false;
  }
  divResultado.innerHTML = htmlResultado;

  atualizaPlacar();
  exibeCartaMaquina();
  atualizaQuantidadeDeCartas();
}

function exibeCartaMaquina() {
  var divCartaMaquina = document.getElementById("maquina");
  var moldura =
    '<img src="./CSS/card-super-trunfo-transparent-ajustado.png" style=" width: 360px; height: 500px; position: absolute;">';
  divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`;
  var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`;
  var classe = `<p class="carta-classe">${cartaMaquina.classe}</p>`;
  var opcoesTxt = "";

  for (var atributo in cartaMaquina.atributos) {
    opcoesTxt +=
      "<p type='text' name='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      " " +
      cartaMaquina.atributos[atributo] +
      "<br>";
  }

  var html = "<div id='opcoes' class='carta-status'>";

  divCartaMaquina.innerHTML =
    moldura + nome + classe + html + opcoesTxt + "</div>";
}

function proximaRodada() {
  var divCartas = document.getElementById("cartas");

  divCartas.innerHTML = `<div id="jogador" class="carta jogador"></div> <div id="maquina" class="carta maquina"></div>`;
  document.getElementById("btnSortear").disabled = false;
  document.getElementById("btnJogar").disabled = true;
  document.getElementById("btnProximaRodada").disabled = true;

  var divResultado = document.getElementById("resultado");
  divResultado.innerHTML = "";
}
