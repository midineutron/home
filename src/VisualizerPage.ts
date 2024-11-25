import Visualizer from "./visualizer/Visualizer";

let visualizer: Visualizer | null = null;

window.addEventListener('load', async () => {
  visualizer = new Visualizer();
  await visualizer.setup()
});

window.addEventListener('resize', () => {
  if (visualizer) {
    visualizer.sceneManager.renderer.setSize(window.innerWidth, window.innerHeight);
    visualizer.sceneManager.camera.aspect = window.innerWidth / window.innerHeight;
    visualizer.sceneManager.camera.updateProjectionMatrix();
  }
});