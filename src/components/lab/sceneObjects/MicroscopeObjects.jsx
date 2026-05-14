// src/components/lab/sceneObjects/MicroscopeObjects.jsx

import * as THREE from "three";

/**
 * Renders objects belonging to the microscope station.
 *
 * Includes:
 * - microscope
 * - microscope glow
 * - microscope computer screen
 * - static microscope slide glass
 */
export function MicroscopeObjects({
  nodes,
  microscopeRef,
  microscopeGlowRef,
  computerScreenDisplayRef,
  microscopeComputerTexture,
  microscopeGlowMat,

  samplePrepCompleted,
  microscopeCompleted,

  onMicroscopeClick,
  onPointerCursor,
  onPointerOutCursor,
}) {
  return (
    <>
      <group
        name="ComputerScreenGroup"
        position={[28.996, 3.433, 16.041]}
        rotation={[-Math.PI, 0.14, -Math.PI]}
      >
        <mesh
          name="ComputerScreen"
          geometry={nodes.ComputerScreen.geometry}
          material={nodes.ComputerScreen.material}
        />

        <mesh
          ref={computerScreenDisplayRef}
          name="ComputerScreenDisplay"
          position={[0.05, 0, 0.035]}
          rotation={[0, Math.PI / 2, 0]}
          renderOrder={34}
        >
          <planeGeometry args={[2.2, 1.3]} />
          <meshBasicMaterial
            map={microscopeComputerTexture}
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      <mesh
        name="microscopeslide_glass"
        geometry={nodes.microscopeslide.geometry}
        material={nodes.microscopeslide.material}
        position={[28.099, 2.152, 14.324]}
        rotation={[0, -1.52, 0]}
      />

      <mesh
        ref={microscopeRef}
        name="Microscope_four"
        geometry={nodes.Microscope_four.geometry}
        material={nodes.Microscope_four.material}
        position={[28.494, 2.912, 13]}
        rotation={[0, -1.571, 0]}
        onClick={onMicroscopeClick}
        onPointerOver={
          samplePrepCompleted && !microscopeCompleted
            ? onPointerCursor
            : undefined
        }
        onPointerOut={
          samplePrepCompleted && !microscopeCompleted
            ? onPointerOutCursor
            : undefined
        }
      />

      <mesh
        ref={microscopeGlowRef}
        name="MicroscopeGlow"
        geometry={nodes.Microscope_four.geometry}
        material={microscopeGlowMat}
        position={[28.494, 2.912, 13]}
        rotation={[0, -1.571, 0]}
        visible={samplePrepCompleted && !microscopeCompleted}
        renderOrder={25}
      />
    </>
  );
}
