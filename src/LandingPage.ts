import Visualizer from "./visualizer/Visualizer";
import LinkManager from "./link-manager/LinkManager";
import { GLTFObj } from "visualizer/scene/Scene";
import { PerspectiveCamera } from "three";

let visualizer: Visualizer | null = null;
let linkManager: LinkManager | null = null;

const TARGET_OBJECT_NAME = "tv";

window.addEventListener('load', async () => {
  visualizer = new Visualizer();
  await visualizer.setup();

  const sceneManger = visualizer.getSceneManager();

  const renderer = sceneManger.getRenderer();
  const camera: PerspectiveCamera = sceneManger.getActiveCamera();
  const targetObject: GLTFObj | undefined = sceneManger
  .getActiveSceneObjects()
    .find((obj) => obj.name === TARGET_OBJECT_NAME);

  linkManager = new LinkManager(renderer, targetObject, camera);
});

window.addEventListener('resize', () => {
  if (visualizer) {
    visualizer.sceneManager.renderer.setSize(window.innerWidth, window.innerHeight);
    visualizer.sceneManager.camera.aspect = window.innerWidth / window.innerHeight;
    visualizer.sceneManager.camera.updateProjectionMatrix();
  }
});