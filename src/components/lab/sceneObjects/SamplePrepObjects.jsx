// src/components/lab/sceneObjects/SamplePrepObjects.jsx

/**
 * Renders all interactive objects used in the sample preparation workflow.
 *
 * Includes:
 * - bottom slide
 * - top cover slip
 * - sample drop
 * - sample bottle
 * - stain bottle
 * - slide glow effect
 */
export function SamplePrepObjects({
  nodes,
  dropRef,
  sampleBottleRef,
  stainBottleRef,
  topSlideRef,
  bottomSlideRef,
  bottomSlideGlowRef,
  bottomSlideGlowMat,

  samplePrepStep,
  samplePrepCompleted,
  isDropVisible,
  isTopSlideVisible,
  isSlideReady,

  onBottomSlideClick,
  onSampleBottleClick,
  onStainBottleClick,
  onPointerCursor,
  onPointerOutCursor,
}) {
  return (
    <>
      <mesh
        ref={dropRef}
        name="Drop"
        geometry={nodes.Drop.geometry}
        material={nodes.Drop.material}
        position={[26.998, 2.212, 3.251]}
        visible={isDropVisible}
      />

      <mesh
        ref={sampleBottleRef}
        name="SampleBottle_four"
        geometry={nodes.SampleBottle_four.geometry}
        material={nodes.SampleBottle_four.material}
        position={[25.105, 2.575, 0.464]}
        rotation={[1.571, 0, 0.22]}
        onClick={onSampleBottleClick}
        onPointerOver={
          samplePrepStep === "focused" ? onPointerCursor : undefined
        }
        onPointerOut={
          samplePrepStep === "focused" ? onPointerOutCursor : undefined
        }
      />

      <mesh
        ref={stainBottleRef}
        name="StainBottle_four"
        geometry={nodes.StainBottle_four.geometry}
        material={nodes.StainBottle_four.material}
        position={[27.93, 2.156, 3.381]}
        rotation={[Math.PI, -0.843, Math.PI]}
        onClick={onStainBottleClick}
        onPointerOver={
          samplePrepStep === "sampleAdded" ? onPointerCursor : undefined
        }
        onPointerOut={
          samplePrepStep === "sampleAdded" ? onPointerOutCursor : undefined
        }
      />

      <mesh
        ref={topSlideRef}
        name="TopSlide_four"
        geometry={nodes.TopSlide_four.geometry}
        material={nodes.TopSlide_four.material}
        position={[27.014, 2.213, 3.271]}
        rotation={[0, -0.836, 0]}
        visible={isTopSlideVisible}
      />

      <mesh
        ref={bottomSlideRef}
        name="BottomSlide_four"
        geometry={nodes.BottomSlide_four.geometry}
        material={nodes.BottomSlide_four.material}
        position={[27.014, 2.191, 3.271]}
        rotation={[0, -0.836, 0]}
        onClick={onBottomSlideClick}
        onPointerOver={samplePrepStep === "idle" ? onPointerCursor : undefined}
        onPointerOut={
          samplePrepStep === "idle" ? onPointerOutCursor : undefined
        }
      />

      <mesh
        ref={bottomSlideGlowRef}
        name="BottomSlideGlow"
        geometry={nodes.BottomSlide_four.geometry}
        material={bottomSlideGlowMat}
        position={[27.014, 2.198, 3.271]}
        rotation={[0, -0.836, 0]}
        visible={
          !samplePrepCompleted && (samplePrepStep === "idle" || isSlideReady)
        }
        renderOrder={20}
      />
    </>
  );
}
