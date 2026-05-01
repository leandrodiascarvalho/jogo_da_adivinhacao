/*UTils Animações */

/**
 * Cria efeito de confete na tela inteira
 * @param {number} quantidade - Quantidade de confetes a serem gerados
 * @param {number} velocidade - Velocidade com que os confetes caem
 */

export function criarConfete(
  quantidade = 100,
  cores = ["#6c63ff", "#ff4d4d", "#00c896", "#ffd93d"],
) {
  for (let i = 0; i < quantidade; i++) {
    const c = document.createElement("div");
    c.className = "confete";
    c.style.position = "fixed";
    c.style.width = "8px";
    c.style.height = "8px";
    c.style.background = cores[Math.floor(Math.random() * cores.length)];
    c.style.left = Math.random() * 0.3 * 100 + "%";
    c.style.top = Math.random() * 0.3 * 100 + "%";
    c.style.borderRadius = "50%";
    c.style.pointerEvents = "none";

    c.style.animation = `confete ${1 + Math.random() * 0.5}s  ease-out  forwards`;
    c.style.animationDelay = (Math.random() * 0.3).toFixed(2) + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 1500);
  }
}

/**
 * Adiciona classe de shake em um elemento por ms tempo
 * @param {HTMLElement} el - Elemento a ser agitado
 * @param {number} ms - Duração do efeito em milissegundos
 */

export function shakeElemento(el, ms = 400) {
  el.classList.add("input--shake");
  setTimeout(() => el.classList.remove("input--shake"), ms);
}
