import { useGLTF } from "@react-three/drei";
import { DirtyCytoplasmMaterial } from "../../../shaders/DirtyCytoplasmShader";

export function EColiNucleus(props) {
  const { nodes } = useGLTF("/models/EColiNucleus-v1.glb");

  return (
    <group {...props} dispose={null}>
      {/* OUTER ENVELOPE: Clear, thin, and slightly iridescent */}
      <mesh
        name="outermembrane"
        geometry={nodes.outermembrane.geometry}
        position={[0, 1, 0]}
        scale={1.031}
      >
        <meshPhysicalMaterial
          transparent
          opacity={0.3}
          transmission={0.9}
          thickness={0.5}
          roughness={0.1}
          ior={1.35}
          color="#e0e5ff"
        />
      </mesh>

      {/* PERIPHERAL CHROMATIN: Coarse, dark, and granular clumps */}
      <mesh
        name="peripheralchromatin"
        geometry={nodes.peripheralchromatin.geometry}
        position={[-0.109, 1.195, 0.993]}
        rotation={[2.93, 0.238, Math.PI / 2]}
        scale={0.056}
      >
        <meshStandardMaterial color="#222222" roughness={1} metalness={0} />
      </mesh>

      {/* INNER NUCLEAR SPACE: The "fluid" inside the nucleus */}
      <mesh
        name="innermembrane"
        geometry={nodes.innermembrane.geometry}
        position={[0, 1, 0]}
        scale={0.883}
      >
        <meshPhysicalMaterial
          transparent
          opacity={0.4}
          color="#d1d5ff"
          roughness={0.4}
          transmission={0.2}
        />
      </mesh>

      {/* KARYOSOME: The dense, eccentric core */}
      <mesh
        name="karyosome"
        geometry={nodes.karyosome.geometry}
        position={[0.224, 1.402, 0]}
        scale={0.208}
      >
        <meshStandardMaterial
          color="#1a0a20" // Very dark purple/black
          emissive="#2a1035" // Slight internal glow
          roughness={0.8}
        />
      </mesh>
    </group>
  );
}
