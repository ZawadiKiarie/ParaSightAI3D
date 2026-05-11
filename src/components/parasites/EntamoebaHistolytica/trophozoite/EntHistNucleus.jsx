import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { BodyMaterial } from "../../../shaders/BodyMaterial";

export function EntHistNucleus(props) {
  const { nodes, _materials } = useGLTF("/models/enthistnucleus-v1.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        name="NucleusMembrane"
        geometry={nodes.NucleusMembrane.geometry}
        material={nodes.NucleusMembrane.material}
        position={[0, 1, 0]}
        scale={1.108}
      >
        <BodyMaterial />
      </mesh>
      <mesh
        name="Karyosome"
        geometry={nodes.Karyosome.geometry}
        // material={nodes.Karyosome.material}
        position={[0, 1, 0]}
        scale={0.351}
      >
        <meshPhysicalMaterial
          color="#2a0505" // Deep, dark red/black
          roughness={1}
          metalness={0.1}
          transparent
        />
      </mesh>
      <mesh
        name="Chromatin"
        geometry={nodes.Chromatin.geometry}
        // material={nodes.Chromatin.material}
        position={[0, 1, 0]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.798, 0.645, 0.798]}
      >
        <meshPhysicalMaterial
          color="#3d1a1a" // Dark brownish-red
          roughness={1}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh
        name="Strands"
        geometry={nodes.Strands.geometry}
        material={nodes.Strands.material}
        position={[0, 1, 0]}
        scale={[0.003, 0.395, 0.003]}
      >
        <meshBasicMaterial
          color="#1a0a0a"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/enthistnucleus-v1.glb");
