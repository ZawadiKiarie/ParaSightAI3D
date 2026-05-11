import React from "react";
import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export function VacuolesWRBC(props) {
  const { nodes } = useGLTF("/models/VacuoleWRBC-v1.glb");

  return (
    <group {...props} dispose={null}>
      {/* THE INGESTED RBC */}
      <mesh
        name="RBC"
        geometry={nodes.RBC.geometry}
        position={[-0.159, 0.563, 0]}
        rotation={[0.223, -0.584, -1.18]}
      >
        <meshStandardMaterial
          color="#8b0000" // Deep "Ox-Blood" Red
          roughness={0.6}
          metalness={0.1}
          emissive="#220000" // Subtle internal glow to keep it visible inside the body
        />
      </mesh>

      {/* THE VACUOLE ENVELOPE */}
      <mesh
        name="vacuoleWRBC"
        geometry={nodes.vacuoleWRBC.geometry}
        position={[0, 0.438, 0]}
        scale={1.212}
      >
        <MeshTransmissionMaterial
          samples={6}
          resolution={512}
          thickness={0.15}
          roughness={0.1}
          transmission={1}
          ior={1.33}
          chromaticAberration={0.03}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.1}
          color="#ffffff" // Crystal clear to show off the RBC
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          // opacity={0.1}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/VacuoleWRBC-v1.glb");
