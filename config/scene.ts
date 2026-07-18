export const sceneConfig = {
  lighting: {
    ambientIntensity: 0.2,
    directionalIntensity: 1.5,
    areaLightIntensity: 2.0,
  },
  particles: {
    idleCount: 150,
    scanCount: 300,
    color: '#ffffff',
  },
  postProcessing: {
    bloomIntensity: 1.2,
    bloomThreshold: 0.8,
    bloomSmoothing: 0.9,
    dofFocusDistance: 0.02,
    dofFocalLength: 0.02,
    dofBokehScale: 2,
  },
  card: {
    dockedLeftX: -3.5, // Card position when portfolio is visible
    floatingYRange: 0.2, // Range of idle floating movement
    rotationRange: 0.1, // Range of idle rotation
  }
};
