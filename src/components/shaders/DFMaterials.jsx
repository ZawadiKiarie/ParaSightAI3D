import * as THREE from "three";

export function createDFMaterials() {
  const nucleusMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#8a7f90"),
    roughness: 0.78,
    metalness: 0,
    transmission: 0.03,
    transparent: true,
    opacity: 0.92,
    thickness: 0.08,
    ior: 1.08,
    depthWrite: true,
  });

  const karyosomeMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#57485a"),
    roughness: 0.84,
    metalness: 0,
  });

  const spindleMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#b8b0bc"),
    roughness: 0.9,
    metalness: 0,
  });

  const vacuoleMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#d9ddd6"),
    roughness: 0.72,
    metalness: 0,
    transmission: 0.14,
    transparent: true,
    opacity: 0.42,
    thickness: 0.12,
    ior: 1.12,
    depthWrite: true,
  });

  const foodBodyMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#b9ad98"),
    roughness: 0.88,
    metalness: 0,
  });

  const golgiMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#c9c1bb"),
    roughness: 0.82,
    metalness: 0,
  });

  const granuleMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#a99f8f"),
    roughness: 0.92,
    metalness: 0,
  });

  const innerMembraneMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#9aa085"),
    roughness: 0.8,
    metalness: 0,
    transmission: 0.08,
    transparent: true,
    opacity: 0.78,
    thickness: 0.08,
    ior: 1.08,
    depthWrite: false,
  });

  return {
    nucleusMaterial,
    karyosomeMaterial,
    spindleMaterial,
    vacuoleMaterial,
    foodBodyMaterial,
    golgiMaterial,
    granuleMaterial,
    innerMembraneMaterial,
  };
}
