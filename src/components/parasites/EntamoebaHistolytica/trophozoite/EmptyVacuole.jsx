import React from "react";
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function FoodVacuole(props) {
  const { nodes, _materials } = useGLTF("/models/EmptyVacuole-v1.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        name="outervacuolemembrane"
        geometry={nodes.outervacuolemembrane.geometry}
        material={nodes.outervacuolemembrane.material}
      >
        <meshPhysicalMaterial
          transparent
          opacity={0.05}
          roughness={0.1}
          metalness={0}
          ior={1.33} // Water/Plasma refraction
          thickness={0.02}
          color="#e0f7ff"
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        name="innervacuolemembrane"
        geometry={nodes.innervacuolemembrane.geometry}
        material={nodes.innervacuolemembrane.material}
      >
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.1}
          chromaticAberration={0.02}
          distortion={0.1}
          temporalDistortion={0.1}
          roughness={0.2}
          transmission={1}
          color="#fdfae5" // Slightly yellowish tint for enzymes
          attenuationDistance={0.2}
          attenuationColor="#ffffff"
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        name="digest"
        geometry={nodes.digest.geometry}
        material={nodes.digest.material}
      >
        <meshStandardMaterial
          color="#4a3b2a" // Dark, "dirty" brown/gray
          roughness={1.0}
          metalness={0.0}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/EmptyVacuole-v1.glb");
