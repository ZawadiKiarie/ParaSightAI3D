import React from "react";
import * as THREE from "three";

export function BCCystBodyMaterial(props) {
  return (
    <meshPhysicalMaterial
      color="#c1ae78"
      transparent
      opacity={0.34}
      transmission={0.08}
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

export function BCCystNucleusMaterial(props) {
  return (
    <meshPhysicalMaterial
      color="#eee2c9"
      transparent
      opacity={0.76}
      transmission={0.03}
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

export function BCStorageGranulesMaterial(props) {
  return (
    <meshPhysicalMaterial
      color="#b99257"
      transparent
      opacity={0.92}
      transmission={0.0}
      roughness={0.86}
      metalness={0}
      clearcoat={0}
      side={THREE.DoubleSide}
      depthWrite={true}
      {...props}
    />
  );
}

export function BCMLOMaterial(props) {
  return (
    <meshPhysicalMaterial
      color="#c1a26c"
      transparent
      opacity={0.88}
      transmission={0.0}
      roughness={0.9}
      metalness={0}
      clearcoat={0}
      side={THREE.DoubleSide}
      depthWrite={true}
      {...props}
    />
  );
}
