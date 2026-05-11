import React from "react";
import * as THREE from "three";

export function EColiOuterCystWallMaterial(props) {
  return (
    <meshPhysicalMaterial
      color="#c7c19f"
      transparent
      opacity={0.34}
      transmission={0.05}
      thickness={0.22}
      roughness={0.86}
      metalness={0}
      ior={1.12}
      clearcoat={0}
      side={THREE.DoubleSide}
      depthWrite={false}
      {...props}
    />
  );
}

export function EColiNuclearEnvelopeMaterial(props) {
  return (
    <meshPhysicalMaterial
      color="#d5cfb7"
      transparent
      opacity={0.74}
      transmission={0.03}
      thickness={0.08}
      roughness={0.92}
      metalness={0}
      ior={1.08}
      clearcoat={0}
      side={THREE.DoubleSide}
      depthWrite={true}
      {...props}
    />
  );
}

export function EColiChromatinLayerMaterial(props) {
  return (
    <meshStandardMaterial
      color="#766b58"
      roughness={0.98}
      metalness={0}
      transparent
      opacity={0.94}
      side={THREE.DoubleSide}
      {...props}
    />
  );
}

export function EColiKaryosomeMaterial(props) {
  return (
    <meshStandardMaterial
      color="#564c3f"
      roughness={0.97}
      metalness={0}
      transparent
      opacity={0.99}
      {...props}
    />
  );
}

export function EColiChromatoidBodyMaterial(props) {
  return (
    <meshPhysicalMaterial
      color="#8a7d67"
      transparent
      opacity={0.96}
      transmission={0.0}
      roughness={0.9}
      metalness={0}
      clearcoat={0}
      side={THREE.DoubleSide}
      {...props}
    />
  );
}

export function EColiGlycogenMaterial(props) {
  return (
    <meshPhysicalMaterial
      color="#ddd5ae"
      transparent
      opacity={0.58}
      transmission={0.04}
      thickness={0.16}
      roughness={0.95}
      metalness={0}
      clearcoat={0}
      side={THREE.DoubleSide}
      depthWrite={false}
      {...props}
    />
  );
}
