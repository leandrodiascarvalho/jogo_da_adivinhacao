import { criarConfete, shakeElemento } from "./utils.js";

let numSecreto,
  maxTent,
  limite,
  nJogadores,
  jogadorAtual = 1;
const historico = {}; //tentativas por jogador
let finalizado = false;

//Elements DOM
const setup = document.getElementById("setup");
const selDif = document.getElementById("selDif");
const match = document.getElementById("match");
const input = document.getElementById("palpite");
const btn = document.getElementById("chutar");
const msg = document.getElementById("mensagem");
const subt = document.getElementById("subtitulo");
const placar = document.getElementById("placar");
const reiniciar = document.getElementById("reiniciar");

/*----Fluxo Inicial----*/
setup.addEventListener("click", (e) => {
  const b = e.target.closest("[data-j]");
  if (!b) return;
  nJogadores = +b.dataset.j;
  selDif.style.display = "block";
});

selDif.addEventListener("click", (e) => {
  const b = e.target.closest("[data-tent]");
  if (!b) return;
  maxTent = +b.dataset.tent;
  limite = +b.dataset.max;
  for (let i = 1; i <= nJogadores; i++) historico[i] = 0;
  iniciarPartida();
});

function iniciarPartida() {
  numSecreto = Math.floor(Math.random() * limite + 1);
  jogadorAtual = 1;
  finalizado = false;
  setup.style.display = "none";
  match.style.display = "block";
  input.value = "";
  input.disabled = false;
  btn.disabled = false;
  msg.textContent = "";
  reiniciar.style.display = "none";
  setup.style.display = "none";
  match.style.display = "block";

  input.focus();

  renderPlacar();
}

/* -------- PLACAR -------- */
function renderPlacar() {
  let html = "";
  for (let j = 1; j <= nJogadores; j++) {
    const usadas = historico[j];
    html += `

  <div class="card ${j === jogadorAtual ? "card--active" : ""}">
  <div class="card__nome">Jogador ${j}</div>
  <div class="card__tent">${usadas}/ ${maxTent}</div>
  </div>`;
  }
  placar.innerHTML = html;
}
/* -------- JOGADA -------- */
btn.addEventListener("click", jogada);
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") jogada();
});

function jogada() {
  if (finalizado) return;
  const pal = parseInt(input.value);
  if (isNaN(pal) || pal < 1 || pal > limite) {
    msg.className = "msg msg--danger";
    msg.textContent = "Número inválido";
    shake(input);
    return;
  }

  historico[jogadorAtual]++;
  const usadas = historico[jogadorAtual];

  if (pal === numSecreto) {
    criarConfete(120);
    finalizar(
      `Jogador ${jogadorAtual} venceu! Acertou em ${usadas} tentativa(s).`,
      "success",
    );
  } else if (usadas === maxTent) {
    const todosUsaram = Object.values(historico).every((v) => v === maxTent);
    if (todosUsaram) {
      finalizar(`Ninguém acertou! O número era ${numSecreto}.`, "danger");
    } else {
      msg.className = "msg msg--danger";
      msg.textContent = `Jogador ${jogadorAtual} esgotou suas tentativas.`;
      proximo();
    }
  } else {
    msg.className = "msg msg--tip";
    msg.textContent =
      pal < numSecreto ? "O número é MAIOR." : "O número é MENOR.";
    proximo();
  }
}

function proximo() {
  let j = (jogadorAtual % nJogadores) + 1;
  while (historico[j] === maxTent && j !== jogadorAtual)
    j = (j % nJogadores) + 1;
  jogadorAtual = j;
  renderPlacar();
  input.value = "";
  input.focus();
}

function finalizar(texto, tipo) {
  msg.className = tipo === "success" ? "msg msg--success" : "msg msg--danger";
  msg.textContent = texto;
  input.disabled = true;
  btn.disabled = true;
  finalizado = true;
  reiniciar.style.display = "inline-block";
}

reiniciar.addEventListener("click", () => location.reload());
