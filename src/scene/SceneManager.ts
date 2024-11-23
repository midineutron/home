import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {GlitchPass} from 'three/examples/jsm/postprocessing/GlitchPass';
import {FilmPass} from 'three/examples/jsm/postprocessing/FilmPass.js';

import { SceneObj } from './SceneList';
import Scene from './Scene';

// Add this interface at the file level
interface CameraConfig {
  distance: number;
  height: number;
  fov: number;
}


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

  // Add these constants at the class level
  static readonly CAMERA_CONFIGS: { [key: string]: CameraConfig } = {
    mobile: {
      distance: 20,
      height: 6,
      fov: 75
    },
    tablet: {
      distance: 17,
      height: 5,
      fov: 70
    },
    desktop: {
      distance: 16,
      height: 4.5,
      fov: 65
    },
    ultrawide: {
      distance: 18,
      height: 5,
      fov: 60
    }
  } as const;

  static readonly BREAKPOINTS = {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1440
  } as const;
  composer: EffectComposer;

  constructor(sceneList: SceneObj[]) {
    this.clock = new THREE.Clock(); // For deltaTime calculation
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.updateCameraPosition();
    // Renderer, camera, and light setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000); // Start with black background
    document.getElementById('container')?.appendChild(this.renderer.domElement);


    this.scenes = {}; // Map scene names to Scene objects
    this.sceneList = sceneList;
    this.activeScene = this.sceneList[0].scene;
    // Initialize scenes from the scenesList
    sceneList.forEach(({ name, scene }: SceneObj) => {
      this.scenes[name] = scene;
      scene.setCamera(this.camera);
    });

    window.addEventListener('resize', this.handleResize.bind(this));

    this.composer = new EffectComposer(this.renderer);
    const filmPass = new FilmPass(
      1,   // intensity
      false,  // grayscale
    );
    const renderPass = new RenderPass(this.activeScene.getThreeScene(), this.camera);
    const glitchPass = new GlitchPass(1);
    this.composer.addPass(renderPass);
    this.composer.addPass(glitchPass);
    this.composer.addPass(filmPass);
        
  }

  private getDeviceType(): string {
    const width = window.innerWidth;
    if (width <= SceneManager.BREAKPOINTS.MOBILE) return 'mobile';
    if (width <= SceneManager.BREAKPOINTS.TABLET) return 'tablet';
    if (width <= SceneManager.BREAKPOINTS.DESKTOP) return 'desktop';
    return 'ultrawide';
}

  // Add these new methods
  private updateCameraPosition() {
    const deviceType = this.getDeviceType();
    const config = SceneManager.CAMERA_CONFIGS[deviceType];
    
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