// src/components/lab/controls/usePlayerController.js

import { useCallback, useRef, useState } from "react";
import * as THREE from "three";
import { PLAYER_MOVEMENT } from "../config/labConstants";
import { useLabCamera } from "./useLabCamera";
import { useLabCollision } from "./useLabCollision";

/**
 * Main player controller for the lab simulation.
 *
 * Responsibilities:
 * - Read joystick movement and look input.
 * - Switch between Idle and Walking animation state.
 * - Move the capsule collider.
 * - Sync the character mesh to the collider.
 * - Rotate the character toward movement direction.
 * - Control third-person camera and station close-up cameras.
 * - Trigger the welcome modal after the player walks a short distance.
 */
export function usePlayerController({
  groupRef,
  colliderRef,
  characterRef,
  moveInputRef,
  lookInputRef,
  samplePrepCameraActive = false,
  microscopeActive = false,
  onPlayerMovedEnough,
}) {
  const [animation, setAnimation] = useState("Idle");

  const playerVelocity = useRef(new THREE.Vector3());
  const targetRotation = useRef(0);

  const initialPlayerPosition = useRef(null);
  const hasTriggeredWelcome = useRef(false);

  const { playerCollider, movePlayerCollider, syncCharacterToCollider } =
    useLabCollision({
      groupRef,
      colliderRef,
      characterRef,
    });

  const {
    playerWorldPosition,
    updateLookInput,
    getMovementVectors,
    updatePresetCamera,
    updateThirdPersonCamera,
  } = useLabCamera();

  /**
   * Changes animation only when necessary.
   * This avoids repeatedly setting React state inside useFrame.
   */
  const requestAnimation = useCallback((nextAnimation) => {
    setAnimation((currentAnimation) => {
      if (currentAnimation === nextAnimation) return currentAnimation;
      return nextAnimation;
    });
  }, []);

  /**
   * Stops movement and switches to idle.
   * Used when the camera is focused on an interaction station.
   */
  const stopPlayer = useCallback(() => {
    playerVelocity.current.x = 0;
    playerVelocity.current.z = 0;
    requestAnimation("Idle");
  }, [requestAnimation]);

  /**
   * Checks whether the player has walked enough to show the welcome modal.
   */
  const checkWelcomeTrigger = useCallback(() => {
    if (!characterRef.current || !onPlayerMovedEnough) return;

    characterRef.current.getWorldPosition(playerWorldPosition.current);

    if (!initialPlayerPosition.current) {
      initialPlayerPosition.current = playerWorldPosition.current.clone();
    }

    const distanceFromStart = playerWorldPosition.current.distanceTo(
      initialPlayerPosition.current,
    );

    if (distanceFromStart > 0.5 && !hasTriggeredWelcome.current) {
      hasTriggeredWelcome.current = true;
      onPlayerMovedEnough();
    }
  }, [characterRef, onPlayerMovedEnough, playerWorldPosition]);

  /**
   * Call this inside useFrame.
   *
   * Example:
   * useFrame((state, delta) => {
   *   playerController.updatePlayerFrame(state.camera, delta);
   * });
   */
  const updatePlayerFrame = useCallback(
    (camera, delta) => {
      if (!characterRef.current) return;

      /**
       * Station camera modes:
       * freeze the player and move the camera to a close-up angle.
       */
      if (samplePrepCameraActive) {
        stopPlayer();
        updatePresetCamera(camera, "samplePrep");
        return;
      }

      if (microscopeActive) {
        stopPlayer();
        updatePresetCamera(camera, "microscope");
        return;
      }

      /**
       * Normal third-person movement mode.
       */
      const move = moveInputRef?.current ?? { x: 0, y: 0 };

      updateLookInput(lookInputRef, delta);

      const { forward, right } = getMovementVectors();

      const direction = new THREE.Vector3();

      direction
        .add(forward.clone().multiplyScalar(move.y))
        .add(right.clone().multiplyScalar(-move.x));

      const moving = direction.length() > 0.05;

      if (moving) {
        direction.normalize();

        playerVelocity.current.x = direction.x * PLAYER_MOVEMENT.moveSpeed;
        playerVelocity.current.z = direction.z * PLAYER_MOVEMENT.moveSpeed;

        targetRotation.current = Math.atan2(direction.x, direction.z);

        requestAnimation("Walking");
      } else {
        playerVelocity.current.x = 0;
        playerVelocity.current.z = 0;

        requestAnimation("Idle");
      }

      movePlayerCollider(playerVelocity.current, delta);
      syncCharacterToCollider();

      characterRef.current.rotation.y = THREE.MathUtils.lerp(
        characterRef.current.rotation.y,
        targetRotation.current,
        PLAYER_MOVEMENT.rotationSpeed,
      );

      checkWelcomeTrigger();
      updateThirdPersonCamera(camera, characterRef);
    },
    [
      characterRef,
      samplePrepCameraActive,
      microscopeActive,
      moveInputRef,
      lookInputRef,
      updateLookInput,
      getMovementVectors,
      requestAnimation,
      movePlayerCollider,
      syncCharacterToCollider,
      checkWelcomeTrigger,
      updatePresetCamera,
      updateThirdPersonCamera,
      stopPlayer,
    ],
  );

  /**
   * Useful when restarting the lab.
   * This resets only controller-internal state.
   * The actual React lab state reset remains in LabSimulation.jsx.
   */
  const resetPlayerController = useCallback(() => {
    initialPlayerPosition.current = null;
    hasTriggeredWelcome.current = false;

    playerVelocity.current.set(0, 0, 0);
    targetRotation.current = 0;

    requestAnimation("Idle");
  }, [requestAnimation]);

  return {
    animation,
    setAnimation,
    playerCollider,
    playerVelocity,
    targetRotation,
    updatePlayerFrame,
    resetPlayerController,
  };
}
