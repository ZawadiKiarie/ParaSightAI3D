import React from "react";
import { useGLTF } from "@react-three/drei";

export function EColiVacuolesWBacteria(props) {
  const { nodes } = useGLTF("/models/EColiVacuolesWBacteria-v1.glb");

  return (
    <group {...props} dispose={null}>
      {/* VACUOLE SHELL: A glassy, liquid-filled container */}
      <mesh
        name="vacuole"
        geometry={nodes.vacuole.geometry}
        position={[0, 1, 0]}
      >
        <meshPhysicalMaterial
          color="#d9e3c1" // Muted greenish-yellow tint
          transparent
          opacity={0.4} // Semi-transparent
          transmission={0.9} // Makes it look like glass/liquid
          thickness={0.5} // Adds depth to the refraction
          roughness={0.15} // Slight blur to the surface
          ior={1.33} // Index of Refraction for water
          depthWrite={false} // Prevents transparency sorting glitches
        />
      </mesh>

      {/* BACTERIA: Muted, organic, and slightly "digested" look */}
      {[nodes.bacteria1, nodes.bacteria2, nodes.bacteria3, nodes.bacteria4].map(
        (node, index) => (
          <mesh
            key={node.name}
            name={node.name}
            geometry={node.geometry}
            position={node.position}
            rotation={node.rotation}
            scale={node.scale}
          >
            <meshPhysicalMaterial
              color={index % 2 === 0 ? "#8b9c6a" : "#7a855c"} // Variation in green hues
              roughness={0.8} // Matte, organic surface
              metalness={0}
              thickness={1.0} // Simulates light passing through a cell
              attenuationColor="#4a5239"
              attenuationDistance={0.5}
            />
          </mesh>
        ),
      )}
    </group>
  );
}

useGLTF.preload("/models/EColiVacuolesWBacteria-v1.glb");
