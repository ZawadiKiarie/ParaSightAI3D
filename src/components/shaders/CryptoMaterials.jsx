import * as THREE from "three";

export function createCryptoMaterials() {
  const residualBodyMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#ddd8c8"),
    roughness: 0.82,
    metalness: 0,
    transmission: 0.03,
    transparent: true,
    opacity: 0.92,
    thickness: 0.08,
    ior: 1.08,
  });

  const sporozoiteMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#cfd6d8"),
    roughness: 0.58,
    metalness: 0,
    transmission: 0.08,
    transparent: true,
    opacity: 0.5,
    thickness: 0.12,
    ior: 1.12,
    clearcoat: 0.06,
    clearcoatRoughness: 0.7,
  });

  const conoidMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#d7ccb4"),
    roughness: 0.72,
    metalness: 0,
  });

  const rhoptryMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#c7b08e"),
    roughness: 0.7,
    metalness: 0,
  });

  const micronemeMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#d8c89a"),
    roughness: 0.78,
    metalness: 0,
  });

  const nucleusMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#7d7486"),
    roughness: 0.76,
    metalness: 0,
    transmission: 0.03,
    transparent: true,
    opacity: 0.95,
    thickness: 0.08,
    ior: 1.06,
  });

  const mitosomeMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#8e8577"),
    roughness: 0.75,
    metalness: 0,
  });

  return {
    residualBodyMaterial,
    sporozoiteMaterial,
    conoidMaterial,
    rhoptryMaterial,
    micronemeMaterial,
    nucleusMaterial,
    mitosomeMaterial,
  };
}
