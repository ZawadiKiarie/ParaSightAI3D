import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function HartManniNucleus(props) {
  const { nodes } = useGLTF("/models/hartmanninucleus-v1.glb");

  return (
    <group {...props} dispose={null}>
      {/* 1. THE KARYOSOME (Central Dot) */}
      <mesh
        name="Karyosome" // Originally "Cube"
        geometry={nodes.Cube.geometry}
        position={[0, 1, 0]}
        renderOrder={1}
      >
        <meshStandardMaterial
          color="#1a0a20" // Very dark purple/black
          emissive="#2a1035" // Slight internal glow
          roughness={0.8}
        />
      </mesh>

      {/* 2. THE PERIPHERAL CHROMATIN (The Beads) */}
      <mesh
        name="ChromatinBeads"
        geometry={nodes.ChromatinBead366.geometry}
        position={[0.664, 1.415, 0.616]}
        rotation={[2.651, -0.626, 2.838]}
        renderOrder={2}
      >
        <meshStandardMaterial color="#222222" roughness={1} metalness={0} />
      </mesh>

      {/* 3. INNER MEMBRANE (The fluid container) */}
      <mesh
        name="InnerMembrane"
        geometry={nodes.InnerMembrane.geometry}
        position={[0, 1, 0]}
        renderOrder={3}
      >
        <meshPhysicalMaterial
          color="#e0f0ff"
          transparent
          opacity={0.3}
          transmission={0.6}
          thickness={0.2}
          roughness={0.3}
          ior={1.33} // Refraction of water/fluid
          depthWrite={false}
        />
      </mesh>

      {/* 4. OUTER MEMBRANE (The Nuclear Envelope) */}
      <mesh
        name="OuterMembrane"
        geometry={nodes.OuterMembrane.geometry}
        position={[0, 1, 0]}
        renderOrder={4}
      >
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
          transmission={0.8}
          thickness={0.1}
          roughness={0.1}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
