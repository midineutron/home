import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export interface GLTFObj {
  name: string,
  model: THREE.Group | THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>,
  actions: { [key:string] : THREE.AnimationAction },
  mixer: THREE.AnimationMixer | null,
}

export class Scene {
  scene: THREE.Scene;
  objects: GLTFObj[];
  loader: GLTFLoader;
  lights: THREE.Light[];
  camera: THREE.Camera | null;
  
  constructor() {
    this.scene = new THREE.Scene(); // Each scene instance gets its own Three.js scene
    this.objects = []; // Array to store objects added to the scene
    this.lights = []; // Array to store lights added to the scene
    this.camera = null;
    this.loader = new GLTFLoader(); // Create GLTFLoader instance
  }

  async setup() {

  }

  loadGLBModel(name: string, path: string, actionName: string | ''): Promise<GLTFObj> {
    return new Promise((resolve, reject) => { 
      this.loader.load(path, (gltf) => {
      const obj: GLTFObj = { 
        name,
        model: gltf.scene,
        actions: {},
        mixer: null
      };
      
      // Set up animation mixer if the model contains animations
      if (gltf.animations.length > 0) {
        obj.mixer = new THREE.AnimationMixer(obj.model);
        gltf.animations.forEach((clip: THREE.AnimationClip) => {
          if (obj.mixer) obj.actions[clip.name] = obj.mixer.clipAction(clip);
        });
        if (obj.actions[actionName]) obj.actions[actionName].play();
      }

      this.addObject(obj); // Add the loaded model to the scene
      resolve(obj);
      }, undefined, (error) => {
        reject(error);
      });
    });
  }

  setCamera(camera: THREE.Camera | null) {
    this.camera = camera;
  }

  // Add a 3D object to the scene
  addObject(object: GLTFObj) {
    this.objects.push(object);
    this.scene.add(object.model);
  }

  // Add light to the scene
  addLight(light: THREE.Light) {
    this.lights.push(light);
    this.scene.add(light);
  }

  // Update the scene: this method can be expanded in child classes for custom updates
  update(deltaTime: number, audioData: Float32Array | Float32Array[] | undefined) {
    // Update animation mixer if it's present
    this.objects.forEach((obj) => {
      if (obj.mixer) obj.mixer.update(deltaTime);
    })
    // Optional: Custom object update logic based on audio data (if needed)
    // this.objects.forEach((object) => {
    //   if (object.update) {
    //     object.update(deltaTime, audioData); // Custom object logic, e.g., audio reactivity
    //   }
    // });
  }

  // Set background color for the scene
  setBackgroundColor(color: THREE.ColorRepresentation) {
    this.scene.background = new THREE.Color(color);
  }

  // Get the Three.js scene for rendering
  getThreeScene(): THREE.Scene {
    return this.scene;
  }
}

export default Scene;