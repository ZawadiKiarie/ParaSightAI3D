// src/components/lab/sceneObjects/LearningPanelObjects.jsx

import * as THREE from "three";

/**
 * Renders the learning panel station inside the 3D lab.
 *
 * The panel becomes clickable only after:
 * - AI analysis is complete
 * - mapped 3D model is shown
 * - learning has not yet been completed
 */
export function LearningPanelObjects({
  nodes,
  learningScreenRef,
  learningScreenDisplayRef,
  learningScreenGlowRef,
  pushPlaneRef,

  learningScreenTexture,
  platformGlowMat,

  isLearningPanelAvailable,

  onLearningPanelClick,
  onPointerCursor,
  onPointerOutCursor,
}) {
  return (
    <>
      <group
        name="LearningScreenGroup"
        position={[10.172, 3.462, 0.114]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <mesh
          ref={learningScreenRef}
          name="LearningScreen"
          geometry={nodes.LearningScreen.geometry}
          material={nodes.LearningScreen.material}
          onClick={onLearningPanelClick}
          onPointerOver={isLearningPanelAvailable ? onPointerCursor : undefined}
          onPointerOut={
            isLearningPanelAvailable ? onPointerOutCursor : undefined
          }
        />

        <mesh
          ref={learningScreenDisplayRef}
          name="LearningScreenDisplay"
          position={[0.002, 0.01, 0.001]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[3.05, 3.55, 3.05]}
          onClick={onLearningPanelClick}
          onPointerOver={isLearningPanelAvailable ? onPointerCursor : undefined}
          onPointerOut={
            isLearningPanelAvailable ? onPointerOutCursor : undefined
          }
          renderOrder={34}
        >
          <planeGeometry args={[3.2, 1.9]} />
          <meshBasicMaterial
            map={learningScreenTexture}
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh
          ref={learningScreenGlowRef}
          name="LearningScreenGlow"
          position={[0, 0.012, 0.002]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[3.05, 3.55, 3.05]}
          visible={false}
          renderOrder={36}
        >
          <planeGeometry args={[9.3, 6.5]} />
          <primitive object={platformGlowMat} attach="material" />
        </mesh>
      </group>

      <mesh
        ref={pushPlaneRef}
        name="PushPlane_four"
        geometry={nodes.PushPlane_four.geometry}
        material={nodes.PushPlane_four.material}
        position={[10.663, 1.906, 3.168]}
        onClick={onLearningPanelClick}
        onPointerOver={isLearningPanelAvailable ? onPointerCursor : undefined}
        onPointerOut={isLearningPanelAvailable ? onPointerOutCursor : undefined}
      />
    </>
  );
}
