// src/components/lab/sceneObjects/ChamberObjects.jsx

import { Center } from "@react-three/drei";
import * as THREE from "three";

/**
 * Renders the 3D chamber station.
 *
 * Includes:
 * - left/right chamber screens
 * - 3D hologram platform
 * - hologram rings and particles
 * - dynamically mapped parasite model
 */
export function ChamberObjects({
  nodes,

  leftScreenRef,
  rightScreenRef,
  leftScreenDisplayRef,
  rightScreenDisplayRef,
  leftScreenGlowRef,
  rightScreenGlowRef,

  chamberScreenTextures,

  chamberPlatformGlowRef,
  hologramRingRef,
  hologramRingRef2,
  hologramParticlesRef,
  hologramParticleGeometry,
  hologramParticleMat,

  platformGlowMat,
  hologramRingMat,

  mappedModelAnchorRef,
  mappedModelPivotRef,
  mappedModelInnerRef,
  mappedParasiteComponent,

  showMappedModel,

  onLeftScreenClick,
  onRightScreenClick,
  onPointerCursor,
  onPointerOutCursor,
}) {
  return (
    <>
      <group
        name="LeftScreenGroup"
        position={[7.898, 3.51, 16.624]}
        rotation={[Math.PI / 2, 0, -2.322]}
      >
        <mesh
          ref={leftScreenRef}
          name="LeftScreen"
          geometry={nodes.LeftScreen.geometry}
          material={nodes.LeftScreen.material}
        />

        <mesh
          ref={leftScreenDisplayRef}
          name="LeftScreenDisplay"
          position={[0.01, 0.01, 0.001]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.21, 1.45, 1.21]}
          onClick={onLeftScreenClick}
          onPointerOver={showMappedModel ? onPointerCursor : undefined}
          onPointerOut={showMappedModel ? onPointerOutCursor : undefined}
          renderOrder={34}
        >
          <planeGeometry args={[2.45, 3.65]} />
          <meshBasicMaterial
            map={
              showMappedModel
                ? chamberScreenTextures.leftActive
                : chamberScreenTextures.leftIdle
            }
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Optional glow plane if you want to re-enable screen glow later */}
        {/* 
        <mesh
          ref={leftScreenGlowRef}
          name="LeftScreenGlow"
          position={[0, 0, 0.06]}
          visible={false}
          renderOrder={36}
        >
          <planeGeometry args={[2.55, 3.75]} />
          <primitive object={platformGlowMat} attach="material" />
        </mesh>
        */}
      </group>

      <group
        name="RightScreenGroup"
        position={[7.832, 3.51, 9.921]}
        rotation={[Math.PI / 2, 0, -0.898]}
      >
        <mesh
          ref={rightScreenRef}
          name="RightScreen"
          geometry={nodes.RightScreen.geometry}
          material={nodes.RightScreen.material}
        />

        <mesh
          ref={rightScreenDisplayRef}
          name="RightScreenDisplay"
          position={[0, 0.01, 0.001]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.21, 1.45, 1.21]}
          onClick={onRightScreenClick}
          onPointerOver={showMappedModel ? onPointerCursor : undefined}
          onPointerOut={showMappedModel ? onPointerOutCursor : undefined}
          renderOrder={34}
        >
          <planeGeometry args={[2.45, 3.65]} />
          <meshBasicMaterial
            map={
              showMappedModel
                ? chamberScreenTextures.rightActive
                : chamberScreenTextures.rightIdle
            }
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Optional glow plane if you want to re-enable screen glow later */}
        {/* 
        <mesh
          ref={rightScreenGlowRef}
          name="RightScreenGlow"
          position={[0, 0.01, 0.01]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.21, 1.45, 1.21]}
          visible={false}
          renderOrder={36}
        >
          <planeGeometry args={[2.55, 3.75]} />
          <primitive object={platformGlowMat} attach="material" />
        </mesh>
        */}
      </group>

      <mesh
        name="3DPlatform_one"
        geometry={nodes["3DPlatform_one"].geometry}
        material={nodes["3DPlatform_one"].material}
        position={[8.227, 0.126, 13.522]}
      />

      <mesh
        ref={chamberPlatformGlowRef}
        name="ChamberPlatformGlow"
        position={[8.227, 0.22, 13.522]}
        rotation={[-Math.PI / 2, 0, 0]}
        visible={false}
        renderOrder={35}
      >
        <circleGeometry args={[1.75, 96]} />
        <primitive object={platformGlowMat} attach="material" />
      </mesh>

      <group position={[8.227, 1.05, 13.522]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh ref={hologramRingRef} visible={false}>
          <ringGeometry args={[1.15, 1.22, 96]} />
          <primitive object={hologramRingMat} attach="material" />
        </mesh>

        <mesh ref={hologramRingRef2} visible={false} scale={[1.35, 1.35, 1.35]}>
          <ringGeometry args={[1.15, 1.19, 96]} />
          <primitive object={hologramRingMat.clone()} attach="material" />
        </mesh>
      </group>

      <points
        ref={hologramParticlesRef}
        geometry={hologramParticleGeometry}
        material={hologramParticleMat}
        position={[8.227, 1.4, 13.522]}
        visible={false}
      />

      {showMappedModel && mappedParasiteComponent && (
        <group
          ref={mappedModelAnchorRef}
          position={[9.5, 2.8, 13.522]}
          rotation={[0, 0, 0]}
          scale={1.5}
        >
          <group ref={mappedModelPivotRef}>
            <Center>
              <group ref={mappedModelInnerRef}>{mappedParasiteComponent}</group>
            </Center>
          </group>
        </group>
      )}
    </>
  );
}
