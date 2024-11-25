import SceneManager from './scene/SceneManager';
import sceneList from './scene/SceneList';

class Visualizer {
  sceneManager: SceneManager;
  isPlaying: boolean;
  isRunning: boolean;
  constructor() {
    this.sceneManager = new SceneManager(sceneList); // SceneManager to handle all scenes
    this.isPlaying = true;
    this.isRunning = true;
    this.animate(); // Start the animation loop
  }

  async setup() {
    await this.sceneManager.setup();
  }

  // Animation loop
  animate() {

    requestAnimationFrame(() => this.animate());

    const deltaTime = this.sceneManager.getDeltaTime();
    // Update the current active scene
    this.sceneManager.update(deltaTime);
  }

  getSceneManager() {
    return this.sceneManager;
  }
}

export default Visualizer;