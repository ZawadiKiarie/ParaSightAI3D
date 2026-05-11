import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function EColiVacuolesWRBC(props) {
  const { nodes } = useGLTF("/models/EColiVacuolesWRBC-v1.glb");

  return (
    <group {...props} dispose={null}>
      {/* THE VACUOLE SHELL */}
      <mesh
        name="vacuole001"
        geometry={nodes.vacuole001.geometry}
        position={[3.196, 1, 0]}
      >
        <meshPhysicalMaterial
          color="#f2d5d5" // Pale pink tint (hemoglobin staining)
          transparent
          opacity={0.35}
          transmission={0.9} // High transparency to see the RBCs clearly
          thickness={0.8} // Thicker wall look
          roughness={0.1}
          ior={1.34} // Slightly higher than water due to protein content
          depthWrite={false}
        />
      </mesh>

      {/* RED BLOOD CELLS (Spheres) */}
      {[nodes.Sphere, nodes.Sphere003].map((node) => (
        <mesh
          key={node.name}
          name={node.name}
          geometry={node.geometry}
          position={node.position}
          rotation={node.rotation}
          scale={node.scale}
        >
          <meshPhysicalMaterial
            color="#9e1b1b" // Deep arterial red
            emissive="#4a0000" // Subtle dark glow for depth
            roughness={0.3} // RBCs are quite smooth/slippery
            metalness={0.05} // Very slight sheen
            thickness={2.0} // Subsurface scattering effect
            attenuationColor="#ff0000"
            attenuationDistance={0.1}
          />
        </mesh>
      ))}

      {/* STRAY BACTERIA/DEBRIS (The mixed content we discussed) */}
      <mesh
        name="bacteria3001"
        geometry={nodes.bacteria3001.geometry}
        position={[3.727, 1.374, -0.128]}
        rotation={[0.4, -1.064, -1.64]}
        scale={[0.013, 0.064, 0.013]}
      >
        <meshPhysicalMaterial
          color="#6b7a4d" // Digested green to contrast with the red RBCs
          roughness={0.9}
          opacity={0.8}
          transparent
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/EColiVacuolesWRBC-v1.glb");
