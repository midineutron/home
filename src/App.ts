import SceneManager from './scene/SceneManager';
import sceneList from './scene/SceneList';

class App {
  sceneManager: SceneManager;
  isPlaying: boolean;
  isRunning: boolean;
  constructor() {
    this.sceneManager = new SceneManager(sceneList); // SceneManager to handle all scenes
    this.isPlaying = false; // State to track play/pause
    this.isRunning = false;
    this.animate(); // Start the animation loop
  }


  // Animation loop
  animate() {

    requestAnimationFrame(() => this.animate());

    const deltaTime = this.sceneManager.getDeltaTime();
    // Update the current active scene
    this.sceneManager.update(deltaTime);
  }
}

let app: App | null = null;

window.addEventListener('load', () => {
  app = new App();
});

window.addEventListener('resize', () => {
  if (app) {
    app.sceneManager.renderer.setSize(window.innerWidth, window.innerHeight);
    app.sceneManager.camera.aspect = window.innerWidth / window.innerHeight;
    app.sceneManager.camera.updateProjectionMatrix();
  }
});