// src/components/lab/controls/useLabCamera.js

import { useCallback, useRef } from "react";
import * as THREE from "three";
import { LAB_CAMERA_PRESETS } from "../config/labConstants";

/**
 * Handles camera direction and camera positioning.
 *
 * Responsibilities:
 * - Store camera yaw for third-person movement.
 * - Convert yaw into forward/right movement vectors.
 * - Move camera to fixed station views.
 * - Follow the character in third-person mode.
 */
export function useLabCamera() {
  const cameraYaw = useRef(0);

  const playerWorldPosition = useRef(new THREE.Vector3());
  const cameraWorldPosition = useRef(new THREE.Vector3());
  const cameraWorldTarget = useRef(new THREE.Vector3());

  /**
   * Updates the camera yaw based on look joystick/mouse input.
   * This is what allows the right joystick to rotate the viewing direction.
   */
  const updateLookInput = useCallback((lookInput, delta) => {
    const look = lookInput?.current ?? { x: 0, y: 0 };

    cameraYaw.current -= look.x * 1.2 * delta;
  }, []);

  /**
   * Returns forward and right vectors based on the current camera yaw.
   * Movement uses these vectors so that "forward" follows the camera direction.
   */
  const getMovementVectors = useCallback(() => {
    const forward = new THREE.Vector3(
      Math.sin(cameraYaw.current),
      0,
      Math.cos(cameraYaw.current),
    );

    const right = new THREE.Vector3(
      Math.cos(cameraYaw.current),
      0,
      -Math.sin(cameraYaw.current),
    );

    return { forward, right };
  }, []);

  /**
   * Moves the camera to a fixed station view.
   * Used for sample prep and microscope close-up views.
   */
  const updatePresetCamera = useCallback(
    (camera, presetName, lerpSpeed = 0.045) => {
      const preset = LAB_CAMERA_PRESETS[presetName];

      if (!camera || !preset) return;

      const cameraPosition = new THREE.Vector3(...preset.position);
      const cameraTarget = new THREE.Vector3(...preset.target);

      camera.position.lerp(cameraPosition, lerpSpeed);
      camera.lookAt(cameraTarget);
    },
    [],
  );

  /**
   * Third-person camera follow.
   * The camera follows the character position directly, using the current yaw.
   */
  const updateThirdPersonCamera = useCallback((camera, characterRef) => {
    if (!camera || !characterRef?.current) return;

    const { distance, height, targetHeight } = LAB_CAMERA_PRESETS.thirdPerson;

    characterRef.current.getWorldPosition(playerWorldPosition.current);

    cameraWorldPosition.current.set(
      playerWorldPosition.current.x - Math.sin(cameraYaw.current) * distance,
      playerWorldPosition.current.y + height,
      playerWorldPosition.current.z - Math.cos(cameraYaw.current) * distance,
    );

    cameraWorldTarget.current.set(
      playerWorldPosition.current.x,
      playerWorldPosition.current.y + targetHeight,
      playerWorldPosition.current.z,
    );

    camera.position.copy(cameraWorldPosition.current);
    camera.lookAt(cameraWorldTarget.current);
  }, []);

  return {
    cameraYaw,
    playerWorldPosition,
    updateLookInput,
    getMovementVectors,
    updatePresetCamera,
    updateThirdPersonCamera,
  };
}
