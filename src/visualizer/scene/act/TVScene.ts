import {
  AmbientLight,
  DirectionalLight,
  LinearFilter,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Object3DEventMap,
  PlaneGeometry,
  SpotLight,
  VideoTexture
} from 'three';


import { Scene, GLTFObj } from "../Scene"; // Import the base Scene class

class TvScene extends Scene {
  tv: GLTFObj | undefined;
  videoSrc: string;
  spotLight: SpotLight | undefined;
  floor: Mesh<PlaneGeometry, MeshStandardMaterial, Object3DEventMap> | undefined;
  constructor() {
    super(); // Call the base Scene constructor

    // Set a dark background for the intro scene
    this.setBackgroundColor(0x000000);

    // Add lighting to the intro scene
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    this.addLight(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 1.25);
    directionalLight.position.set(5, 10, 7.5);
    this.addLight(directionalLight);

    // Create a rotating cube as an example object in the intro scene
    this.videoSrc = '/video/intro2.mp4';
  }

  async setup() {
    this.setupFloor();
    this.tv = await this.setupTv();
    this.setupSpotLight(this.tv.model);
  }

  setupFloor() {
    // Create the floor
    const floorGeometry = new PlaneGeometry(300, 300); // 50x50 plane
    const floorMaterial = new MeshStandardMaterial({ color: 0x000000 }); // Gray color
    this.floor = new Mesh(floorGeometry, floorMaterial);

    // Position the floor below the TV
    this.floor.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
    this.floor.position.y = -1; // Adjust the height to put it below the TV

    // Add the floor to the scene
    this.scene.add(this.floor);
  }

  async setupTv() {
    const tv = await this.loadGLBModel('tv', '/models/tv.glb', '');
    tv.model.rotation.y = Math.PI;
    tv.model.position.set(0, 0, 7.5); // Start far away on the z-axis
    // video
    const video = document.createElement('video');
    video.src = this.videoSrc;
    video.id = 'intro'; // Assign the scene as ID for easy reference
    video.load();
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    // Play the video when loaded
    video.play().catch((error) => console.error('Video playback failed:', error));

    const videoTexture = new VideoTexture(video);
    videoTexture.minFilter = LinearFilter;
    videoTexture.magFilter = LinearFilter;
    videoTexture.rotation = Math.PI;
    videoTexture.center.set(0.5, 0.5);  // Rotate around the center of the texture

    // Assuming the TV screen is a mesh called 'Screen'
    // console.log();
    tv.model.children[0].children[5].material.map = videoTexture;
    tv.model.children[0].children[5].material.needsUpdate = true;
    return tv;
  }

  setupSpotLight(target: Object3D) {
    this.spotLight = new SpotLight(0xffffff, 20); // Increase intensity
    this.spotLight.position.set(0, 40, -24); // Position the light above the TV
    this.spotLight.target = target; // Point the spotlight towards the TV

    // Adjust spotlight properties for better visibility
    this.spotLight.angle = 0.65; // Narrower beam
    this.spotLight.penumbra = 1; // Soft edges
    this.spotLight.decay = 0; // Make the light decay over distance
    this.spotLight.distance = 100; // Limit the light's reach

    // Add spotlight and target to the scene
    this.scene.add(this.spotLight);
    this.scene.add(this.spotLight.target);
  }

  update(deltaTime: number, audioData: Float32Array | Float32Array[] | number[] | undefined) {

  }
}

export default TvScene;