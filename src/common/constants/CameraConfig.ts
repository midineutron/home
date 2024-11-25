interface CameraConfig {
  distance: number;
  height: number;
  fov: number;
}

export const CAMERA_CONFIGS: { [key: string]: CameraConfig } = {
  mobile: {
    distance: 18,
    height: 5,
    fov: 75
  },
  tablet: {
    distance: 16,
    height: 5,
    fov: 70
  },
  desktop: {
    distance: 16,
    height: 5,
    fov: 60
  },
  ultrawide: {
    distance: 16,
    height: 5,
    fov: 60
  }
}