interface CameraConfig {
  distance: number;
  height: number;
  fov: number;
}

export const CAMERA_CONFIGS: { [key: string]: CameraConfig } = {
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
}