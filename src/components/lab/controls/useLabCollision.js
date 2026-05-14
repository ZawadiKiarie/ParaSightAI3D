// src/components/lab/controls/useLabCollision.js

import { useCallback, useLayoutEffect, useMemo } from "react";
import * as THREE from "three";
import { Octree } from "three/examples/jsm/Addons.js";
import { Capsule } from "three/examples/jsm/Addons.js";
import { PLAYER_COLLIDER } from "../config/labConstants";

/**
 * Handles collision detection between the player capsule and the lab collider.
 *
 * Your lab uses:
 * - an invisible GLB collider mesh
 * - an Octree for efficient collision checks
 * - a Capsule for the character/player body
 */
export function useLabCollision({ groupRef, colliderRef, characterRef }) {
  const colliderOctree = useMemo(() => new Octree(), []);

  const playerCollider = useMemo(
    () =>
      new Capsule(
        new THREE.Vector3(0, PLAYER_COLLIDER.radius, 0),
        new THREE.Vector3(0, PLAYER_COLLIDER.height, 0),
        PLAYER_COLLIDER.radius,
      ),
    [],
  );

  /**
   * Initializes the octree from the collider mesh and positions
   * the player capsule at the character's world position.
   */
  useLayoutEffect(() => {
    if (!groupRef.current || !colliderRef.current || !characterRef.current) {
      return;
    }

    groupRef.current.updateWorldMatrix(true, true);
    colliderRef.current.updateWorldMatrix(true, true);
    characterRef.current.updateWorldMatrix(true, true);

    colliderOctree.fromGraphNode(colliderRef.current);

    // The collider mesh should be invisible but still usable for collisions.
    colliderRef.current.visible = false;

    const worldPos = new THREE.Vector3();
    characterRef.current.getWorldPosition(worldPos);

    playerCollider.start
      .copy(worldPos)
      .add(new THREE.Vector3(0, PLAYER_COLLIDER.radius, 0));

    playerCollider.end
      .copy(worldPos)
      .add(new THREE.Vector3(0, PLAYER_COLLIDER.height, 0));
  }, [groupRef, colliderRef, characterRef, colliderOctree, playerCollider]);

  /**
   * Checks capsule-vs-octree collision and pushes the player out
   * if the capsule intersects the lab collider.
   */
  const resolvePlayerCollisions = useCallback(() => {
    const result = colliderOctree.capsuleIntersect(playerCollider);

    if (result) {
      playerCollider.translate(result.normal.multiplyScalar(result.depth));
    }
  }, [colliderOctree, playerCollider]);

  /**
   * Moves the capsule using velocity.
   *
   * Substeps reduce the chance of the player passing through colliders
   * when moving quickly.
   */
  const movePlayerCollider = useCallback(
    (velocity, delta, steps = 5) => {
      const stepDelta = delta / steps;

      for (let i = 0; i < steps; i++) {
        playerCollider.translate(velocity.clone().multiplyScalar(stepDelta));
        resolvePlayerCollisions();
      }
    },
    [playerCollider, resolvePlayerCollisions],
  );

  /**
   * Converts the capsule's world position back into the character's local position.
   *
   * This is important because your character is inside the scaled/positioned
   * LabModel group, so direct world position cannot be assigned blindly.
   */
  const syncCharacterToCollider = useCallback(() => {
    if (!characterRef.current) return;

    const worldPos = playerCollider.start.clone();
    worldPos.y -= PLAYER_COLLIDER.radius;

    const parent = characterRef.current.parent;

    if (parent) {
      parent.updateWorldMatrix(true, false);

      const inverseParent = new THREE.Matrix4()
        .copy(parent.matrixWorld)
        .invert();

      worldPos.applyMatrix4(inverseParent);
    }

    characterRef.current.position.copy(worldPos);
  }, [characterRef, playerCollider]);

  return {
    colliderOctree,
    playerCollider,
    resolvePlayerCollisions,
    movePlayerCollider,
    syncCharacterToCollider,
  };
}
