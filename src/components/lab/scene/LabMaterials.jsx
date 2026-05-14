// src/components/lab/scene/LabMaterials.jsx

import { useMemo } from "react";
import * as THREE from "three";

/**
 * Creates all reusable materials for the lab scene.
 *
 * This file keeps visual material definitions away from LabModel.jsx,
 * so LabModel can focus more on scene logic and mesh rendering.
 */
export function useLabMaterials({ bakedTextures }) {
  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.95,
        opacity: 1,
        transparent: true,
        roughness: 0.05,
        metalness: 0,
        ior: 1.5,
        thickness: 0.5,
        envMapIntensity: 1,
        side: THREE.DoubleSide,
      }),
    [],
  );

  const bubbleMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0x88ccff,
        transmission: 0.9,
        roughness: 0,
        metalness: 0,
        ior: 1.3,
        thickness: 0.2,
        transparent: true,
        opacity: 0.4,
        emissive: new THREE.Color(0x44aaff),
        emissiveIntensity: 0.3,
        side: THREE.DoubleSide,
        iridescence: 1,
        iridescenceIOR: 1.3,
      }),
    [],
  );

  const bubbleHoverMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0xffdd55,
        transmission: 0.65,
        roughness: 0,
        metalness: 0,
        ior: 1.3,
        thickness: 0.2,
        transparent: true,
        opacity: 0.75,
        emissive: new THREE.Color(0xffcc33),
        emissiveIntensity: 1.4,
        side: THREE.DoubleSide,
        iridescence: 1,
        iridescenceIOR: 1.3,
      }),
    [],
  );

  const bottomSlideGlowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x66ffff,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        toneMapped: false,
      }),
    [],
  );

  const microscopeGlowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x66ffff,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        toneMapped: false,
      }),
    [],
  );

  const aiScreenGlowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x66ffff,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
        side: THREE.DoubleSide,
        toneMapped: false,

        // Prevents z-fighting with the actual AI screen texture.
        polygonOffset: true,
        polygonOffsetFactor: -4,
        polygonOffsetUnits: -4,
      }),
    [],
  );

  const platformGlowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x66ffff,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        toneMapped: false,
      }),
    [],
  );

  const hologramRingMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x66ffff,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        toneMapped: false,
      }),
    [],
  );

  /**
   * Baked materials for the main lab model.
   * These use MeshBasicMaterial because your lighting is already baked.
   */
  const bakedMats = useMemo(() => {
    const make = (map) =>
      new THREE.MeshBasicMaterial({
        map,
      });

    return {
      TexturePackOne: make(bakedTextures.TexturePackOne),
      TexturePackTwo: make(bakedTextures.TexturePackTwo),
      TexturePackThree: make(bakedTextures.TexturePackThree),
      TexturePackFour: make(bakedTextures.TexturePackFour),
    };
  }, [bakedTextures]);

  const hologramParticleMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: 0x66ffff,
        size: 0.055,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    [],
  );

  return {
    glassMat,
    bubbleMat,
    bubbleHoverMat,
    bottomSlideGlowMat,
    microscopeGlowMat,
    aiScreenGlowMat,
    platformGlowMat,
    hologramRingMat,
    hologramParticleMat,
    bakedMats,
  };
}
