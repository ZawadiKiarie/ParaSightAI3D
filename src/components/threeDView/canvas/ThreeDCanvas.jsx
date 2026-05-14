// src/components/threeDView/canvas/ThreeDCanvas.jsx

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import {
  CANVAS_GRID_BACKGROUND,
  CANVAS_HINT_TEXT,
  THREE_D_CAMERA,
} from "../config/threeDViewConstants";

import { ParasiteModelPreview } from "./ParasiteModelPreview";

/**
 * ThreeDCanvas renders the actual interactive 3D preview area.
 *
 * It includes:
 * - R3F Canvas
 * - lights
 * - environment
 * - OrbitControls
 * - selected parasite model
 * - optional highlight ring
 * - optional cross-section visual plane
 */
export function ThreeDCanvas({
  parasiteId,
  stage,
  modelZoom,
  transparency,
  crossSection,
  highlightMode,
  activeFocus,
}) {
  return (
    <div className="relative aspect-square rounded-xl bg-gradient-to-br from-slate-800/50 to-indigo-900/50 border border-white/10 overflow-hidden">
      {/* Visual grid background behind the WebGL canvas */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${CANVAS_GRID_BACKGROUND.lineColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${CANVAS_GRID_BACKGROUND.lineColor} 1px, transparent 1px)
          `,
          backgroundSize: CANVAS_GRID_BACKGROUND.size,
        }}
      />

      <Canvas
        camera={{
          position: THREE_D_CAMERA.position,
          fov: THREE_D_CAMERA.fov,
        }}
        gl={{ alpha: true }}
        onCreated={({ gl }) => {
          // Needed for cross-section clipping planes.
          gl.localClippingEnabled = true;
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[4, 5, 6]} intensity={1.8} />
          <pointLight position={[-4, 2, -4]} intensity={1.2} color="#60a5fa" />

          <Environment preset="city" />

          <group position={[0, 0, 0]}>
            <ParasiteModelPreview
              parasiteId={parasiteId}
              stage={stage}
              modelZoom={modelZoom}
              transparency={transparency}
              crossSection={crossSection}
              activeFocus={activeFocus}
            />
          </group>

          {highlightMode && (
            <mesh position={[0, -1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.3, 1.36, 96]} />
              <meshBasicMaterial
                color="#60a5fa"
                transparent
                opacity={0.55}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
          )}

          {crossSection && (
            <mesh position={[0, 0.35, 0]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[3.5, 3.5]} />
              <meshBasicMaterial
                color="#22d3ee"
                transparent
                opacity={0.14}
                side={THREE.DoubleSide}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
          )}

          <OrbitControls
            enableDamping
            dampingFactor={0.08}
            enablePan={false}
            minDistance={THREE_D_CAMERA.minDistance}
            maxDistance={THREE_D_CAMERA.maxDistance}
          />
        </Suspense>
      </Canvas>

      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-xs text-white">
        {CANVAS_HINT_TEXT}
      </div>
    </div>
  );
}
