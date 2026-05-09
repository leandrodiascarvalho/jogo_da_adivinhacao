import * as PIXI from 'pixi.js';

export function createConfetti(app, amount = 100) {
  const container = new PIXI.Container();
  app.stage.addChild(container);

  const colors = [0x6c63ff, 0x28a745, 0xffc107, 0xdc3545, 0x17a2b8, 0xffffff];
  const particles = [];

  for (let i = 0; i < amount; i++) {
    const p = new PIXI.Graphics();
    p.beginFill(colors[Math.floor(Math.random() * colors.length)]);
    p.drawRect(-5, -5, 10, 10);
    p.endFill();

    // Spawn point at the bottom center of the screen
    p.x = app.screen.width / 2;
    p.y = app.screen.height - 50; 
    
    // Random explosive velocity
    p.vx = (Math.random() - 0.5) * 30; 
    p.vy = (Math.random() * -15) - 15;
    
    // Random spin
    p.rotationSpeed = (Math.random() - 0.5) * 0.5;

    container.addChild(p);
    particles.push(p);
  }

  let elapsed = 0;
  
  const ticker = () => {
    elapsed += 1;
    let active = false;
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.alpha <= 0) continue;
      
      active = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.8; // Gravity pulling it down
      p.rotation += p.rotationSpeed;

      // Start fading out when it starts falling down
      if (p.vy > 0) {
        p.alpha -= 0.015;
      }
    }

    // Cleanup after they fade out or maximum time reached
    if (!active || elapsed > 300) {
      app.ticker.remove(ticker);
      container.destroy({ children: true });
    }
  };

  app.ticker.add(ticker);
}
