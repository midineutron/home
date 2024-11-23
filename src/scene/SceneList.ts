import TvScene from './act/TVScene';
import Scene from './Scene.js';
// Import other scene files as needed

export interface SceneObj {
  name: string,
  scheduledTime: string,
  transitionType: string,
  transitionSpeed?: number,
  scene: Scene,
}

const sceneList: SceneObj[] = [
  { name: 'tvscene', scheduledTime: '0', transitionType: 'abrupt', transitionSpeed: 1, scene: new TvScene() },
];

export default sceneList;
