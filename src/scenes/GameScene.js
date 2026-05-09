import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import { secretNumber, winner, currentPlayer, triesHistory, maxTries, numberLimit, numPlayers, guessedNumbers } from '../stores/gameStore.js';
import { playSound, speakText } from '../utils/audio.js';
import { createConfetti } from '../components/ParticleConfetti.js';
import { Button } from '../components/Button.js';

export class GameScene {
  constructor(app, onRestart) {
    this.app = app;
    this.onRestart = onRestart;
    this.container = new PIXI.Container();
    app.stage.addChild(this.container);

    this.currentGuessStr = '';

    // UI - Header
    this.txtPlayer = new PIXI.Text(`Jogador ${currentPlayer.get()}`, { fontSize: 24, fill: 0x6c63ff, fontWeight: 'bold' });
    this.txtPlayer.position.set(20, 20);
    
    this.txtTries = new PIXI.Text(`Tentativas: ${triesHistory.get()[currentPlayer.get()] || 0} / ${maxTries.get()}`, { fontSize: 20, fill: 0xffffff });
    this.txtTries.position.set(app.screen.width - 200, 20);

    // UI - Guess Display
    this.txtGuess = new PIXI.Text('?', { fontSize: 64, fill: 0xffffff, fontWeight: 'bold' });
    this.txtGuess.anchor.set(0.5);
    this.txtGuess.position.set(app.screen.width / 2, 120);

    this.txtHint = new PIXI.Text('Chute um número!', { fontSize: 24, fill: 0xcccccc });
    this.txtHint.anchor.set(0.5);
    this.txtHint.position.set(app.screen.width / 2, 180);

    this.txtRange = new PIXI.Text(`(Sorteio de 1 a ${numberLimit.get()})`, { fontSize: 16, fill: 0x888888 });
    this.txtRange.anchor.set(0.5);
    this.txtRange.position.set(app.screen.width / 2, 215);

    this.txtHistory = new PIXI.Text('Palpites: nenhum', { 
      fontSize: 14, 
      fill: 0xaaaaaa, 
      wordWrap: true, 
      wordWrapWidth: 360, 
      align: 'center' 
    });
    this.txtHistory.anchor.set(0.5, 0);
    this.txtHistory.position.set(app.screen.width / 2, 240);

    this.container.addChild(this.txtPlayer, this.txtTries, this.txtGuess, this.txtHint, this.txtRange, this.txtHistory);

    // Numpad Virtual
    this.createNumpad();

    // Subscribe to store changes to update UI
    this.unsubCurrentPlayer = currentPlayer.subscribe(v => {
      this.txtPlayer.text = `Jogador ${v}`;
      this.updateTriesUI();
    });
    
    this.unsubTries = triesHistory.subscribe(() => {
      this.updateTriesUI();
    });

    this.unsubHistory = guessedNumbers.subscribe(list => {
      if (list.length === 0) {
        this.txtHistory.text = 'Palpites anteriores: nenhum';
      } else {
        this.txtHistory.text = `Palpites: ${list.join(', ')}`;
      }
    });

    // Initialize secret number if 0
    if (secretNumber.get() === 0) {
       secretNumber.set(Math.floor(Math.random() * numberLimit.get()) + 1);
    }
    
    // Acessibilidade: Feedback Inicial de Voz
    speakText(`Jogo iniciado. Sorteio de 1 a ${numberLimit.get()}. Vez do jogador 1. Digite seu palpite.`);

    // Acessibilidade: Controles de Teclado Físico
    this.boundKeyDown = this.handleKeyDown.bind(this);
    window.addEventListener('keydown', this.boundKeyDown);
  }

  handleKeyDown(e) {
    if (this.numpadContainer && !this.numpadContainer.visible) return; // Jogo acabou

    const key = e.key;
    if (key >= '0' && key <= '9') {
      this.handleNumpad(key);
    } else if (key === 'Backspace' || key === 'Delete') {
      this.handleNumpad('C');
    } else if (key === 'Enter') {
      this.handleNumpad('OK');
    }
  }

  showRestartButton() {
    if (this.btnRestart) return;

    this.btnRestart = new Button('Voltar ao Início', 220, 50, 0x17a2b8);
    this.btnRestart.position.set(this.app.screen.width / 2, 400);
    this.btnRestart.on('pointerdown', () => {
      playSound('click');
      if (this.onRestart) this.onRestart();
    });
    this.container.addChild(this.btnRestart);
  }

  updateTriesUI() {
    const cp = currentPlayer.get();
    const t = triesHistory.get()[cp] || 0;
    this.txtTries.text = `Tentativas: ${t} / ${maxTries.get()}`;
  }

  createNumpad() {
    this.numpadContainer = new PIXI.Container();
    const startX = this.app.screen.width / 2;
    const startY = 320;
    const padLayout = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['C', '0', 'OK']
    ];

    padLayout.forEach((row, i) => {
      row.forEach((key, j) => {
        let color = 0x333333;
        if (key === 'OK') color = 0x28a745;
        if (key === 'C') color = 0xdc3545;

        const btn = new Button(key, 70, 70, color);
        btn.x = startX + (j - 1) * 80;
        btn.y = startY + i * 80;
        
        btn.on('pointerdown', () => this.handleNumpad(key));
        this.numpadContainer.addChild(btn);
      });
    });

    this.container.addChild(this.numpadContainer);
  }

  handleNumpad(key) {
    playSound('click');
    if (key === 'C') {
      this.currentGuessStr = '';
      this.txtGuess.text = '?';
      speakText('Apagado');
    } else if (key === 'OK') {
      if (this.currentGuessStr.length > 0) {
        this.makeGuess();
      }
    } else {
      // Append number
      if (this.currentGuessStr.length < 3) {
        this.currentGuessStr += key;
        this.txtGuess.text = this.currentGuessStr;
      }
    }
  }

  makeGuess() {
    const guessValue = parseInt(this.currentGuessStr);
    
    if (isNaN(guessValue) || guessValue < 1 || guessValue > numberLimit.get()) {
      gsap.fromTo(this.txtGuess, { x: this.app.screen.width/2 - 10 }, { x: this.app.screen.width/2 + 10, duration: 0.08, repeat: 3, yoyo: true });
      this.txtHint.text = `Digite de 1 a ${numberLimit.get()}!`;
      playSound('error');
      speakText(`Número inválido. Digite de 1 a ${numberLimit.get()}.`);
      this.currentGuessStr = '';
      setTimeout(() => { if(this.txtGuess) this.txtGuess.text = '?'; }, 500);
      return;
    }

    const currentP = currentPlayer.get();
    triesHistory.setKey(currentP, (triesHistory.get()[currentP] || 0) + 1);

    // Salva o palpite no histórico
    guessedNumbers.set([...guessedNumbers.get(), guessValue]);

    if (guessValue === secretNumber.get()) {
      createConfetti(this.app, 150);
      playSound('win');
      winner.set(currentP);
      this.txtHint.text = `JOGADOR ${currentP} VENCEU!`;
      this.txtHint.style.fill = 0x28a745;
      this.numpadContainer.visible = false;
      this.showRestartButton();
      
      speakText(`Correto! Jogador ${currentP} venceu o jogo! Acertou o número ${guessValue}.`);
      return;
    }

    if (triesHistory.get()[currentP] >= maxTries.get()) {
      // player lost their turn
      this.txtHint.text = 'Tentativas esgotadas!';
      this.txtHint.style.fill = 0xdc3545;
      playSound('error');
      
      speakText(`O número era ${guessValue}, mas suas tentativas esgotaram.`);
      setTimeout(() => this.nextPlayer(), 2000);
      return;
    }

    // hint
    const ehMaior = guessValue < secretNumber.get();
    this.txtHint.text = ehMaior ? 'O número é MAIOR' : 'O número é MENOR';
    this.txtHint.style.fill = 0xcccccc;
    playSound('error'); // not a win
    
    speakText(ehMaior ? 'O número secreto é Maior' : 'O número secreto é Menor');
    
    this.currentGuessStr = '';
    this.txtGuess.text = '?';
  }

  nextPlayer() {
    let j = (currentPlayer.get() % numPlayers.get()) + 1;
    let found = false;
    
    // Check if anyone still has tries
    for(let i=0; i<numPlayers.get(); i++) {
        if ((triesHistory.get()[j] || 0) < maxTries.get()) {
            found = true;
            break;
        }
        j = (j % numPlayers.get()) + 1;
    }

    if (!found) {
        // Everyone lost
        this.txtHint.text = `GAME OVER! Número era ${secretNumber.get()}`;
        this.txtHint.style.fill = 0xdc3545;
        this.numpadContainer.visible = false;
        this.showRestartButton();
        
        speakText(`Fim de jogo. Ninguém acertou. O número secreto era ${secretNumber.get()}.`);
        return;
    }
    
    currentPlayer.set(j);
    this.currentGuessStr = '';
    this.txtGuess.text = '?';
    this.txtHint.text = `Vez do Jogador ${j}`;
    this.txtHint.style.fill = 0xcccccc;
    
    speakText(`Vez do Jogador ${j}. Digite seu palpite.`);
  }

  destroy() {
    window.removeEventListener('keydown', this.boundKeyDown);
    if (this.unsubCurrentPlayer) this.unsubCurrentPlayer();
    if (this.unsubTries) this.unsubTries();
    if (this.unsubHistory) this.unsubHistory();
    this.container.destroy({ children: true });
  }
}