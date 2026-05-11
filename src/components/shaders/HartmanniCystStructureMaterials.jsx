import React from "react";
import * as THREE from "three";

export function HartmanniOuterCystWallMaterial(props) {
  return (
    <meshPhysicalMaterial
      color="#d7d8b8"
      transparent
      opacity={0.32}
      transmission={0.06}
      thickness={0.2}
      roughness={0.82}
      metalness={0}
      ior={1.12}
      clearcoat={0}
      side={THREE.DoubleSide}
      depthWrite={false}
      {...props}
    />
  );
}

export function HartmanniNuclearEnvelopeMaterial(props) {
  return (
    <meshPhysicalMaterial
      color="#ddd9c1"
      transparent
      opacity={0.72}
      transmission={0.04}
      thickness={0.08}
      roughness={0.9}
      metalness={0}
      ior={1.08}
      clearcoat={0}
      side={THREE.DoubleSide}
      depthWrite={true}
      {...props}
    />
  );
}

export function HartmanniChromatinLayerMaterial(props) {
  return (
    <meshStandardMaterial
      color="#8c8168"
      roughness={0.96}
      metalness={0}
      transparent
      opacity={0.9}
      side={THREE.DoubleSide}
      {...props}
    />
  );
}

export function HartmanniKaryosomeMaterial(props) {
  return (
    <meshStandardMaterial
      color="#5f5546"
      roughness={0.94}
      metalness={0}
      transparent
      opacity={0.98}
      {...props}
    />
  );
}

export function HartmanniChromatoidBodyMaterial(props) {
  return (
    <meshPhysicalMaterial
      color="#9a8b73"
      transparent
      opacity={0.95}
      transmission={0.0}
      roughness={0.88}
      metalness={0}
      clearcoat={0}
      side={THREE.DoubleSide}
      {...props}
    />
  );
}
