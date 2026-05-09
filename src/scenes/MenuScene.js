import * as PIXI from 'pixi.js';
import { Button } from '../components/Button.js';
import { playSound } from '../utils/audio.js';

export class MenuScene {
  constructor(app, onStart, onInstructions) {
    this.app = app;
    this.container = new PIXI.Container();
    app.stage.addChild(this.container);

    const title = new PIXI.Text('JOGO DE\nADIVINHAÇÃO', { 
      fontSize: 48, 
      fill: 0xffffff, 
      fontWeight: 'bold',
      align: 'center',
      dropShadow: true,
      dropShadowColor: 0x000000,
      dropShadowBlur: 4,
      dropShadowDistance: 6
    });
    title.anchor.set(0.5);
    title.position.set(app.screen.width / 2, 150);

    const btnStart = new Button('JOGAR', 200, 60, 0x28a745);
    btnStart.position.set(app.screen.width / 2, 350);
    
    btnStart.on('pointerdown', () => {
      playSound('click');
      if (onStart) onStart();
    });

    const btnInstructions = new Button('COMO JOGAR', 200, 60, 0x17a2b8);
    btnInstructions.position.set(app.screen.width / 2, 430);
    
    btnInstructions.on('pointerdown', () => {
      playSound('click');
      if (onInstructions) onInstructions();
    });

    this.container.addChild(title, btnStart, btnInstructions);
  }

  destroy() {
    this.container.destroy({ children: true });
  }
}
