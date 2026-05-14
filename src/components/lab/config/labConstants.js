// src/components/lab/config/labConstants.js

/**
 * Central constants used by the 3D lab simulation.
 * For example, if the character moves too fast, you only change MOVE_SPEED here.
 */

// Main 3D lab model
export const LAB_MODEL_PATH = "/models/labV8-v1.glb";

// Character animations
export const CHARACTER_ANIMATIONS = {
  idle: "/animations/Idle2.fbx",
  walking: "/animations/Walking.fbx",
};

// Player collision capsule settings
export const PLAYER_COLLIDER = {
  radius: 0.35,
  height: 1,
};

// Movement settings
export const PLAYER_MOVEMENT = {
  moveSpeed: 7,
  rotationSpeed: 0.15,
};

// Texture paths used by the 3D lab scene
export const LAB_TEXTURES = {
  baked: {
    texturePackOne: "/textures/TexturePackOne.webp",
    texturePackTwo: "/textures/TexturePackTwo.webp",
    texturePackThree: "/textures/TexturePackThree.webp",
    texturePackFour: "/textures/TexturePackFour.webp",
  },

  aiScreen: {
    idle: "/textures/ai-screen-idle.png",
    received: "/textures/ai-screen-received.png",
  },

  chamberScreens: {
    leftIdle: "/textures/chamber-left-idle.png",
    leftActive: "/textures/chamber-left-active.png",
    rightIdle: "/textures/chamber-right-idle.png",
    rightActive: "/textures/chamber-right-active.png",
  },

  learningScreen: "/textures/learning-panel-idle.png",

  microscopeComputerScreen: "/textures/microscope-computer-screen.png",
};

// Default test result used before the real AI model is connected
export const DEFAULT_LAB_RESULT = {
  parasiteName: "Giardia lamblia",
  stage: "cyst",
  confidence: 92,
  location: "central field",
  microscopeImage: "/textures/microscope/giardia-cyst.png",
};

// Life stage priority used when resolving available 3D models
export const LAB_STAGE_ORDER = ["trophozoite", "vacuole", "cyst", "oocyst"];

// Camera focus positions used in the lab scene
export const LAB_CAMERA_PRESETS = {
  samplePrep: {
    position: [50, 8.6, 5.7],
    target: [46.2, 2.5, 4.2],
  },

  microscope: {
    position: [51.5, 7.2, 17.2],
    target: [49.2, 3.1, 13.1],
  },

  thirdPerson: {
    distance: 10.2,
    height: 8.2,
    targetHeight: 8.4,
  },
};
