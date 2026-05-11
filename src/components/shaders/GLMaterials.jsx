import * as THREE from "three";

export function createGiardiaMaterials() {
  const nucleusMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#cfd8df"),
    roughness: 0.78,
    metalness: 0.0,
    transmission: 0.18,
    transparent: true,
    opacity: 0.88,
    thickness: 0.35,
    ior: 1.18,
    depthWrite: true,
    clearcoat: 0.0,
  });

  const karyosomeMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#6f5a6e"),
    roughness: 0.82,
    metalness: 0.0,
  });

  const kinetosomeMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#8e7c67"),
    roughness: 0.72,
    metalness: 0.0,
  });

  const medianBodyMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#d9dfd6"),
    roughness: 0.52,
    metalness: 0.0,
    transmission: 0.06,
    transparent: true,
    opacity: 0.92,
    thickness: 0.18,
    ior: 1.12,
    clearcoat: 0.08,
    clearcoatRoughness: 0.75,
  });

  const flagellumMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#96b0b2"),
    roughness: 0.38,
    metalness: 0.0,
    transmission: 0.1,
    transparent: true,
    opacity: 0.9,
    thickness: 0.12,
    ior: 1.16,
    clearcoat: 0.18,
    clearcoatRoughness: 0.48,
  });

  return {
    nucleusMaterial,
    karyosomeMaterial,
    kinetosomeMaterial,
    medianBodyMaterial,
    flagellumMaterial,
  };
}
