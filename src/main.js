import { Application } from 'pixi.js';
import { MenuScene } from './scenes/MenuScene.js';
import { SetupScene } from './scenes/SetupScene.js';
import { GameScene } from './scenes/GameScene.js';
import { InstructionsScene } from './scenes/InstructionsScene.js';

const app = new Application({ 
  width: 400, 
  height: 600, 
  backgroundColor: 0x1a1a2e,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true
});

document.body.appendChild(app.view);

let currentScene = null;

function changeScene(SceneClass, ...args) {
  if (currentScene) {
    currentScene.destroy();
  }
  currentScene = new SceneClass(app, ...args);
}

  function startFlow() {
    changeScene(MenuScene, 
      // onStart
      () => {
        changeScene(SetupScene, () => {
          changeScene(GameScene, startFlow);
        });
      },
      // onInstructions
      () => {
        changeScene(InstructionsScene, startFlow);
      }
    );
  }

  startFlow();
