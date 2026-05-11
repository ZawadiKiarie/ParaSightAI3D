import * as THREE from "three";

export function createBlastocystisMaterials() {
  const innerMembraneMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#ffffff"),
    roughness: 0.78,
    metalness: 0.0,
    transmission: 0.08,
    transparent: true,
    opacity: 0.24,
    thickness: 0.08,
    ior: 1.1,
    depthWrite: true,
    clearcoat: 0.02,
    clearcoatRoughness: 0.9,
  });

  const vacuoleMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#ffffff"),
    roughness: 0.95,
    metalness: 0.0,
    transmission: 0.03,
    transparent: true,
    opacity: 0.12,
    thickness: 0.02,
    ior: 1.02,
    depthWrite: false,
  });

  const nucleusMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#7c6678"),
    roughness: 0.7,
    metalness: 0.0,
    transmission: 0.05,
    transparent: true,
    opacity: 0.92,
    thickness: 0.12,
    ior: 1.08,
    depthWrite: true,
  });

  const nucleolusMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#4e374a"),
    roughness: 0.82,
    metalness: 0.0,
  });

  const granuleMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#bda67d"),
    roughness: 0.88,
    metalness: 0.0,
  });

  const mloMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#8f7f59"),
    roughness: 0.62,
    metalness: 0.0,
    transmission: 0.03,
    transparent: true,
    opacity: 0.9,
    thickness: 0.06,
    ior: 1.05,
    depthWrite: true,
  });

  return {
    innerMembraneMaterial,
    vacuoleMaterial,
    nucleusMaterial,
    nucleolusMaterial,
    granuleMaterial,
    mloMaterial,
  };
}
