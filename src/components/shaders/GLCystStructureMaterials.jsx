import React from "react";
import * as THREE from "three";

export function GLCystWallMaterial(props) {
  return (
    <meshPhysicalMaterial
      color="#d9dec8"
      transparent
      opacity={0.34}
      transmission={0.08}
      thickness={0.18}
      roughness={0.78}
      metalness={0}
      ior={1}
      clearcoat={1}
      // side={THREE.DoubleSide}
      depthWrite={false}
      {...props}
    />
  );
}

export function GLCystNucleusMaterial(props) {
  return (
    <meshPhysicalMaterial
      color="#e2e4d2"
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

export function GLCystKaryosomeMaterial(props) {
  return (
    <meshStandardMaterial
      color="#6d735d"
      roughness={0.95}
      metalness={0}
      transparent
      opacity={0.98}
      {...props}
    />
  );
}

export function GLCystFibrilMaterial(props) {
  return (
    <meshPhysicalMaterial
      color="#cfd5be"
      transparent
      opacity={0.72}
      transmission={0.02}
      thickness={0.04}
      roughness={0.92}
      metalness={0}
      clearcoat={0}
      side={THREE.DoubleSide}
      depthWrite={true}
      {...props}
    />
  );
}

export function GLCystMedianBodyMaterial(props) {
  return (
    <meshPhysicalMaterial
      color="#b6bea0"
      transparent
      opacity={0.88}
      transmission={0.0}
      roughness={0.88}
      metalness={0}
      clearcoat={0}
      side={THREE.DoubleSide}
      depthWrite={true}
      {...props}
    />
  );
}
