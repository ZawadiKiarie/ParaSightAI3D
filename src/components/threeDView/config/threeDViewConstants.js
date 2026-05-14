// src/components/threeDView/config/threeDViewConstants.js

/**
 * Default values and reusable settings for the standalone 3D View page.
 *
 * This file keeps repeated values out of 3DView.jsx so the page becomes easier
 * to understand and easier to configure later when the AI model is connected.
 */

export const DEFAULT_3D_VIEW_RESULT = {
  parasiteName: "EntamoebaHystolytica",
  stage: "trophozoite",
  confidence: 92,
  microscopeImage:
    "https://images.unsplash.com/photo-1705912110381-b5b7d565fcf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJhc2l0ZSUyMG1pY3Jvc2NvcGV8ZW58MXx8fHwxNzc3ODE5NjYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
};

export const THREE_D_CAMERA = {
  position: [0, 1.4, 6],
  fov: 38,
  minDistance: 2.2,
  maxDistance: 9,
};

export const MODEL_ZOOM_LIMITS = {
  min: 0.5,
  max: 2.4,
  step: 0.05,
  defaultValue: 1,
};

export const TRANSPARENCY_LIMITS = {
  min: 20,
  max: 100,
  step: 1,
  defaultValue: 75,
};

export const FEATURE_LABEL_DEFAULT_OFFSET = [0.45, 0.25, 0];

export const OUTER_FEATURE_KEYWORDS = [
  "body",
  "wall",
  "shape",
  "cytoplasm",
  "oocyst",
  "cystwall",
  "oocystwall",
  "oocystshape",
];

export const CANVAS_GRID_BACKGROUND = {
  lineColor: "rgba(99, 102, 241, 0.3)",
  size: "30px 30px",
};

export const CANVAS_HINT_TEXT = "Drag to rotate • Scroll to zoom";
