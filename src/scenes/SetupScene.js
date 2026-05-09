import * as PIXI from 'pixi.js';
import { Button } from '../components/Button.js';
import { numPlayers, difficultyLevel, startGame } from '../stores/gameStore.js';
import { playSound } from '../utils/audio.js';

export class SetupScene {
  constructor(app, onComplete) {
    this.app = app;
    this.container = new PIXI.Container();
    app.stage.addChild(this.container);
    this.onComplete = onComplete;

    this.step = 1; // 1 = players, 2 = difficulty

    this.buildPlayersStep();
  }

  buildPlayersStep() {
    this.container.removeChildren();

    const title = new PIXI.Text('QUANTOS JOGADORES?', { fontSize: 32, fill: 0xffffff, fontWeight: 'bold' });
    title.anchor.set(0.5);
    title.position.set(this.app.screen.width / 2, 100);
    this.container.addChild(title);

    for (let i = 1; i <= 4; i++) {
      const btn = new Button(`${i} Jogador${i > 1 ? 'es' : ''}`, 200, 50, 0x6c63ff);
      btn.position.set(this.app.screen.width / 2, 180 + (i - 1) * 70);
      btn.on('pointerdown', () => {
        playSound('click');
        numPlayers.set(i);
        this.step = 2;
        this.buildDifficultyStep();
      });
      this.container.addChild(btn);
    }
  }

  buildDifficultyStep() {
    this.container.removeChildren();

    const title = new PIXI.Text('ESCOLHA A DIFICULDADE', { fontSize: 32, fill: 0xffffff, fontWeight: 'bold' });
    title.anchor.set(0.5);
    title.position.set(this.app.screen.width / 2, 100);
    this.container.addChild(title);

    const levels = [
      { id: 'easy', label: 'Fácil (15 tent. / 1 a 50)', color: 0x28a745 },
      { id: 'medium', label: 'Médio (10 tent. / 1 a 100)', color: 0xffc107 },
      { id: 'hard', label: 'Difícil (5 tent. / 1 a 200)', color: 0xdc3545 }
    ];

    levels.forEach((lvl, index) => {
      const btn = new Button(lvl.label, 260, 50, lvl.color);
      btn.position.set(this.app.screen.width / 2, 180 + index * 70);
      btn.on('pointerdown', () => {
        playSound('click');
        difficultyLevel.set(lvl.id);
        startGame(); // Set states and random number
        if (this.onComplete) this.onComplete();
      });
      this.container.addChild(btn);
    });
  }

  destroy() {
    this.container.destroy({ children: true });
  }
}
