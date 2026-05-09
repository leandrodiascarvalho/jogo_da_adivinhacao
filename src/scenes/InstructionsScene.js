import * as PIXI from 'pixi.js';
import { Button } from '../components/Button.js';
import { playSound } from '../utils/audio.js';

export class InstructionsScene {
  constructor(app, onBack) {
    this.app = app;
    this.container = new PIXI.Container();
    app.stage.addChild(this.container);

    const title = new PIXI.Text('COMO JOGAR', { 
      fontSize: 36, 
      fill: 0xffffff, 
      fontWeight: 'bold',
      align: 'center'
    });
    title.anchor.set(0.5);
    title.position.set(app.screen.width / 2, 50);

    const instructionsText = 
      "Objetivo: Adivinhar o número secreto!\n\n" +
      "DIFICULDADES E LIMITES:\n" +
      "• Fácil: Sorteio de 1 a 50 (15 tentativas)\n" +
      "• Médio: Sorteio de 1 a 100 (10 tentativas)\n" +
      "• Difícil: Sorteio de 1 a 200 (5 tentativas)\n\n" +
      "REGRAS:\n" +
      "1. Você deve digitar um número que esteja\n" +
      "   dentro do limite da dificuldade escolhida\n" +
      "   (Ex: digite de 1 a 50 se estiver no fácil).\n" +
      "2. O jogo dirá se o número secreto é\n" +
      "   MAIOR ou MENOR que o seu palpite.\n" +
      "3. Fique atento às suas tentativas!\n" +
      "   Se esgotarem, você é eliminado.";

    const textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 16,
      fill: 0xcccccc,
      wordWrap: true,
      wordWrapWidth: 360,
      lineHeight: 24,
      align: 'left'
    });

    const info = new PIXI.Text(instructionsText, textStyle);
    info.anchor.set(0.5, 0);
    info.position.set(app.screen.width / 2, 90);

    const btnBack = new Button('VOLTAR', 200, 50, 0xdc3545);
    btnBack.position.set(app.screen.width / 2, 540);
    
    btnBack.on('pointerdown', () => {
      playSound('click');
      if (onBack) onBack();
    });

    this.container.addChild(title, info, btnBack);
  }

  destroy() {
    this.container.destroy({ children: true });
  }
}
