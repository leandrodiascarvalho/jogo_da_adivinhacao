import { Howl } from 'howler';

const sounds = {
  click: new Howl({ src: ['/src/sounds/click.mp3'], volume: 0.5 }),
  win: new Howl({ src: ['/src/sounds/win.mp3'], volume: 0.8 }),
  error: new Howl({ src: ['/src/sounds/lose.mp3'], volume: 0.6 })
};

export function playSound(name) {
  if (sounds[name]) {
    sounds[name].play();
  }
}

// Sistema de Síntese de Voz (Text-to-Speech)
export function speakText(text) {
  // Verifica se o navegador suporta
  if (!('speechSynthesis' in window)) return;

  // Cancela fala anterior se houver
  window.speechSynthesis.cancel();

  const msg = new SpeechSynthesisUtterance();
  msg.text = text;
  msg.lang = 'pt-BR'; // Força a pronúncia em Português do Brasil
  msg.rate = 1.1; // Velocidade ligeiramente mais rápida para manter o ritmo de jogo

  window.speechSynthesis.speak(msg);
}
