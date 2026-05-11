import React from "react";
import * as THREE from "three";

/*
  Materials for Entamoeba histolytica cyst structures
  - nuclear envelope
  - chromatin layer
  - karyosome
  - chromatoid bodies

  These are intentionally restrained and biological-looking.
  No flashy glass/plastic look.
*/

export function NuclearEnvelopeMaterial(props) {
  return (
    <meshPhysicalMaterial
      color="#d8cfae"
      roughness={0.72}
      metalness={0.0}
      transmission={0.08}
      transparent
      opacity={0.78}
      thickness={0.2}
      ior={1.2}
      clearcoat={0.0}
      side={THREE.DoubleSide}
      depthWrite={true}
      {...props}
    />
  );
}

export function ChromatinLayerMaterial(props) {
  return (
    <meshStandardMaterial
      color="#7a5f46"
      roughness={0.95}
      metalness={0.0}
      transparent
      opacity={0.88}
      side={THREE.DoubleSide}
      {...props}
    />
  );
}

export function KaryosomeMaterial(props) {
  return (
    <meshStandardMaterial
      color="#5a4031"
      roughness={0.9}
      metalness={0.0}
      transparent
      opacity={0.98}
      {...props}
    />
  );
}

export function ChromatoidBodyMaterial(props) {
  return (
    <meshPhysicalMaterial
      color="#8a6a4f"
      roughness={0.82}
      metalness={0.0}
      transmission={0.0}
      transparent
      opacity={0.96}
      clearcoat={0.0}
      side={THREE.DoubleSide}
      {...props}
    />
  );
}

export function OuterCystWallMaterial(props) {
  return (
    <meshPhysicalMaterial
      color="#d9cfb2"
      roughness={1}
      metalness={0.0}
      transmission={1}
      transparent
      opacity={0.32}
      thickness={0.35}
      ior={1.18}
      side={THREE.DoubleSide}
      {...props}
    />
  );
}
