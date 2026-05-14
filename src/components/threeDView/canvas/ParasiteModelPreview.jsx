// src/components/threeDView/canvas/ParasiteModelPreview.jsx

import { Center } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { PARASITE_DATA } from "../../ParasiteConfig";
import { FeatureLabel } from "./FeatureLabel";

/**
 * ParasiteModelPreview renders the actual selected parasite model.
 *
 * It receives:
 * - parasiteId: internal parasite key from ParasiteConfig
 * - stage: selected life stage
 * - modelZoom: UI zoom multiplier
 * - transparency: opacity value from the UI slider
 * - crossSection: whether clipping plane is active
 * - activeFocus: selected diagnostic feature id
 *
 * This component is only responsible for the model itself,
 * not the full Canvas or page layout.
 */
export function ParasiteModelPreview({
  parasiteId,
  stage,
  modelZoom,
  transparency,
  crossSection,
  activeFocus,
}) {
  const groupRef = useRef();

  const stageData = PARASITE_DATA[parasiteId]?.[stage];
  const modelComponent = stageData?.Component;

  const markers = stageData?.markers || [];

  const activeMarker =
    markers.find((marker) => marker.id === activeFocus) || null;

  const baseScale = stageData?.scale ?? stageData?.listScale ?? 1.4;
  const finalScale = baseScale * modelZoom;

  /**
   * Clipping plane used for the cross-section mode.
   *
   * It clips the model from one side, giving a simple sliced-section effect.
   */
  const clippingPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0),
    [],
  );

  /**
   * Apply transparency and optional cross-section clipping to all meshes
   * inside the selected parasite model.
   *
   * This supports both normal materials and custom shader materials.
   */
  useEffect(() => {
    if (!groupRef.current) return;

    const opacity = THREE.MathUtils.clamp(transparency / 100, 0.15, 1);

    groupRef.current.traverse((child) => {
      if (!child.isMesh && !child.isSkinnedMesh) return;

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((mat) => {
        if (!mat) return;

        mat.transparent = true;

        // Some custom shader materials use uniforms for opacity.
        if (mat.uniforms?.opacity) {
          mat.uniforms.opacity.value = opacity;
        } else {
          mat.opacity = opacity;
        }

        mat.clippingPlanes = crossSection ? [clippingPlane] : [];
        mat.clipIntersection = false;
        mat.needsUpdate = true;
      });
    });
  }, [transparency, crossSection, clippingPlane, parasiteId, stage]);

  if (!modelComponent) return null;

  return (
    <group ref={groupRef} scale={finalScale}>
      <Center>
        <group>
          {modelComponent}

          {activeMarker && (
            <>
              {/* Small visible marker at the selected diagnostic feature */}
              <mesh position={activeMarker.position} renderOrder={999}>
                <sphereGeometry
                  args={[activeMarker.markerScale ?? 0.08, 24, 24]}
                />
                <meshBasicMaterial
                  color="#22d3ee"
                  transparent
                  opacity={0.95}
                  depthTest={false}
                  depthWrite={false}
                  toneMapped={false}
                />
              </mesh>

              <FeatureLabel marker={activeMarker} />
            </>
          )}
        </group>
      </Center>
    </group>
  );
}
