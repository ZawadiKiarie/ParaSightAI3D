// src/components/lab/sceneObjects/AIStationObjects.jsx

/**
 * Renders the AI analysis station screen.
 *
 * The AI screen texture changes depending on aiStep:
 * - idle screen before microscope image is sent
 * - received screen after microscope image is sent
 */
export function AIStationObjects({
  nodes,
  aiScreenRef,
  aiScreenGlowRef,
  aiScreenGlowMat,

  aiStep,
  aiCompleted,

  onAIScreenClick,
  onPointerCursor,
  onPointerOutCursor,
}) {
  const canOpenAI = aiStep !== "idle" && !aiCompleted;

  return (
    <group position={[17.388, 4.74, 24.954]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh
        ref={aiScreenRef}
        name="AIScreen"
        geometry={nodes.AIScreen.geometry}
        material={nodes.AIScreen.material}
        onClick={onAIScreenClick}
        onPointerOver={canOpenAI ? onPointerCursor : undefined}
        onPointerOut={canOpenAI ? onPointerOutCursor : undefined}
      />

      <mesh
        ref={aiScreenGlowRef}
        name="AIScreenGlow"
        geometry={nodes.AIScreen.geometry}
        material={aiScreenGlowMat}
        position={[0, 0, 0.01]}
        visible={false}
        renderOrder={30}
      />
    </group>
  );
}
