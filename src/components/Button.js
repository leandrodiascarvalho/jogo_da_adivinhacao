import * as PIXI from 'pixi.js';
import gsap from 'gsap';

export class Button extends PIXI.Container {
  constructor(label, width = 160, height = 44, color = 0x6c63ff) {
    super();
    
    this.bg = new PIXI.Graphics();
    // Center the graphic so scaling scales from the center
    this.bg.beginFill(color).drawRoundedRect(-width/2, -height/2, width, height, 12).endFill();
    
    this.text = new PIXI.Text(label, { fill: 0xffffff, fontSize: 18, fontFamily: 'Arial', fontWeight: 'bold' });
    this.text.anchor.set(0.5);
    
    this.addChild(this.bg, this.text);
    
    this.eventMode = 'static';
    this.cursor = 'pointer';

    // Acessibilidade (Leitores de tela)
    this.accessible = true;
    this.accessibleTitle = label;
    this.accessibleType = 'button';
    this.tabIndex = 0;
    
    this.on('pointerover', () => {
      gsap.to(this.scale, { x: 1.05, y: 1.05, duration: 0.15 });
    });
    
    this.on('pointerout', () => {
      gsap.to(this.scale, { x: 1, y: 1, duration: 0.15 });
    });
    
    this.on('pointerdown', () => {
      gsap.to(this.scale, { x: 0.95, y: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
    });
  }
}
