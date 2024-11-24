import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import { GlitchPass } from './CustomGlitchPass/CustomGlitchPass';
import {FilmPass} from 'three/examples/jsm/postprocessing/FilmPass.js';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass';
// User defined
import { SceneObj } from './SceneList';
import Scene from './Scene';
import { CAMERA_CONFIGS } from '../common/constants/CameraConfig';
import { BREAKPOINTS } from '../common/constants/BreakPoints';


class SceneManager {
  clock: THREE.Clock;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  scenes: { [key: string]: Scene };
  activeScene: Scene;
  sceneList: SceneObj[];
  crossfadeActive: any;
  crossfadeFactor!: number | 1;
  currentScene: any;
  transitionSpeed!: number | 1;
  composer: EffectComposer;

  constructor(sceneList: SceneObj[]) {
    this.clock = new THREE.Clock(); // For deltaTime calculation
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.updateCameraPosition();
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000); // Start with black background
    document.getElementById('container')?.appendChild(this.renderer.domElement);
    // Scenes
    this.scenes = {}; // Map scene names to Scene objects
    this.sceneList = sceneList;
    this.activeScene = this.sceneList[0].scene;
    sceneList.forEach(({ name, scene }: SceneObj) => { // Initialize scenes from the scenesList
      this.scenes[name] = scene;
      scene.setCamera(this.camera);
    });
    // Composer
    this.composer = new EffectComposer(this.renderer);
    this.setupComposer();
    // Resize
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  private setupComposer(): void {
    const filmPass = new FilmPass(3, false);
    // const bloomPass = new BloomPass(1.5);
    const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(100, 100), 0.09, 1, 1);
    // const dotScreenPass = new DotScreenPass(new THREE.Vector2(0.00001, 0.00001));
    const renderPass = new RenderPass(this.activeScene.getThreeScene(), this.camera);
    const glitchPass = new GlitchPass(100);
    this.composer.addPass(renderPass);
    this.composer.addPass(unrealBloomPass);
    this.composer.addPass(filmPass);
    this.composer.addPass(glitchPass);
    // this.composer.addPass(dotScreenPass);
  }

  private getDeviceType(): string {
    const width = window.innerWidth;
    if (width <= BREAKPOINTS.MOBILE) return 'mobile';
    if (width <= BREAKPOINTS.TABLET) return 'tablet';
    if (width <= BREAKPOINTS.DESKTOP) return 'desktop';
    return 'ultrawide';
}

  // Add these new methods
  private updateCameraPosition() {
    const deviceType = this.getDeviceType();
    const config = CAMERA_CONFIGS[deviceType];
    
    // Update camera properties
    this.camera.position.set(0, config.height, config.distance);
    this.camera.fov = config.fov;
    this.camera.lookAt(0, config.height, 0);
    this.camera.updateProjectionMatrix();
  }

  private handleResize() {
    // Update camera aspect ratio
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    // Update camera position for new screen size
    this.updateCameraPosition();

    // Update renderer size
    this.composer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  async setup() {
    // Schedule scene transitions based on the audio timeline

  }

  // Update the currently active scene
  update(deltaTime: number) {
    if (this.activeScene) {
      this.activeScene.update(deltaTime, undefined); // Delegate the update to the active Scene
    }
    this.composer.render(deltaTime)
  }

  getDeltaTime(): number {
    return this.clock.getDelta();
  }

  // Reset scenes (if needed)
  async resetScenes() {
    this.activeScene = this.sceneList[0].scene; // Reset to the initial scene
    await this.activeScene.setup();
  }

  // Get the currently active scene for rendering
  getActiveScene() {
    return this.activeScene ? this.activeScene : null;
  }
}

export default SceneManager;