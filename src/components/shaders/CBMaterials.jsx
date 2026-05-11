import * as THREE from "three";

export function createCBMaterials() {
  const sporocystMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#dde2d5"),
    roughness: 0.72,
    metalness: 0,
    transmission: 0.12,
    transparent: true,
    opacity: 0.5,
    thickness: 0.12,
    ior: 1.12,
    clearcoat: 0.02,
    clearcoatRoughness: 0.85,
    depthWrite: true,
  });

  const sporozoiteMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#cfd4d8"),
    roughness: 0.58,
    metalness: 0,
    transmission: 0.06,
    transparent: true,
    opacity: 0.9,
    thickness: 0.1,
    ior: 1.1,
    clearcoat: 0.04,
    clearcoatRoughness: 0.75,
    depthWrite: true,
  });

  const nucleusMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#7c7088"),
    roughness: 0.78,
    metalness: 0,
    transmission: 0.02,
    transparent: true,
    opacity: 0.94,
    thickness: 0.06,
    ior: 1.06,
    depthWrite: true,
  });

  const residualBodyMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#d5ccb4"),
    roughness: 0.88,
    metalness: 0,
  });

  return {
    sporocystMaterial,
    sporozoiteMaterial,
    nucleusMaterial,
    residualBodyMaterial,
  };
}
