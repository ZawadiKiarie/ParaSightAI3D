// src/components/lab/sceneObjects/InfoBubbles.jsx

/**
 * Renders the glowing information bubbles and labels for each lab station.
 *
 * Each bubble opens a station overview modal when clicked.
 */
export function InfoBubbles({
  nodes,
  bubbleRefs,
  glowTextRefs,
  bubbleMat,
  onBubbleClick,
  onBubblePointerOver,
  onBubblePointerOut,
}) {
  return (
    <>
      <mesh
        ref={(el) => (bubbleRefs.current[0] = el)}
        name="glowbubble_samplprep"
        geometry={nodes.glowbubble.geometry}
        material={bubbleMat}
        position={[20.471, 2.223, 1.494]}
        onClick={(event) => onBubbleClick(event, "samplePrep")}
        onPointerOver={(event) => onBubblePointerOver(event, 0)}
        onPointerOut={(event) => onBubblePointerOut(event, 0)}
      />

      <mesh
        ref={(el) => (bubbleRefs.current[1] = el)}
        name="glowbubble_microscope"
        geometry={nodes.glowbubble001.geometry}
        material={bubbleMat}
        position={[23.528, 2.223, 9.683]}
        onClick={(event) => onBubbleClick(event, "microscope")}
        onPointerOver={(event) => onBubblePointerOver(event, 1)}
        onPointerOut={(event) => onBubblePointerOut(event, 1)}
      />

      <mesh
        ref={(el) => (bubbleRefs.current[2] = el)}
        name="glowbubble_ai"
        geometry={nodes.glowbubble002.geometry}
        material={bubbleMat}
        position={[21.781, 2.223, 19.401]}
        onClick={(event) => onBubbleClick(event, "ai")}
        onPointerOver={(event) => onBubblePointerOver(event, 2)}
        onPointerOut={(event) => onBubblePointerOut(event, 2)}
      />

      <mesh
        ref={(el) => (bubbleRefs.current[3] = el)}
        name="glowbubble_3d"
        geometry={nodes.glowbubble003.geometry}
        material={bubbleMat}
        position={[10.404, 2.223, 19.07]}
        onClick={(event) => onBubbleClick(event, "threeD")}
        onPointerOver={(event) => onBubblePointerOver(event, 3)}
        onPointerOut={(event) => onBubblePointerOut(event, 3)}
      />

      <mesh
        ref={(el) => (bubbleRefs.current[4] = el)}
        name="glowbubble_learnpanel"
        geometry={nodes.glowbubble004.geometry}
        material={bubbleMat}
        position={[7.167, 2.223, 6.578]}
        onClick={(event) => onBubbleClick(event, "learningPanel")}
        onPointerOver={(event) => onBubblePointerOver(event, 4)}
        onPointerOut={(event) => onBubblePointerOut(event, 4)}
      />

      <mesh
        name="glowstick"
        geometry={nodes.glowstick.geometry}
        material={nodes.glowstick.material}
        position={[20.523, 0.065, 1.494]}
      />

      <mesh
        name="glowstick001"
        geometry={nodes.glowstick001.geometry}
        material={nodes.glowstick001.material}
        position={[23.58, 0.065, 9.683]}
      />

      <mesh
        name="glowstick002"
        geometry={nodes.glowstick002.geometry}
        material={nodes.glowstick002.material}
        position={[21.833, 0.065, 19.401]}
      />

      <mesh
        name="glowstick003"
        geometry={nodes.glowstick003.geometry}
        material={nodes.glowstick003.material}
        position={[10.456, 0.065, 19.07]}
      />

      <mesh
        name="glowstick004"
        geometry={nodes.glowstick004.geometry}
        material={nodes.glowstick004.material}
        position={[7.219, 0.065, 6.578]}
      />

      <mesh
        ref={(el) => (glowTextRefs.current[0] = el)}
        name="glowtext"
        geometry={nodes.glowtext.geometry}
        material={nodes.glowtext.material}
        position={[20.83, 2.23, 1.494]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      <mesh
        ref={(el) => (glowTextRefs.current[1] = el)}
        name="glowtext001"
        geometry={nodes.glowtext001.geometry}
        material={nodes.glowtext001.material}
        position={[23.887, 2.23, 9.683]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      <mesh
        ref={(el) => (glowTextRefs.current[2] = el)}
        name="glowtext002"
        geometry={nodes.glowtext002.geometry}
        material={nodes.glowtext002.material}
        position={[22.14, 2.23, 19.401]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      <mesh
        ref={(el) => (glowTextRefs.current[3] = el)}
        name="glowtext003"
        geometry={nodes.glowtext003.geometry}
        material={nodes.glowtext003.material}
        position={[10.763, 2.23, 19.07]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      <mesh
        ref={(el) => (glowTextRefs.current[4] = el)}
        name="glowtext004"
        geometry={nodes.glowtext004.geometry}
        material={nodes.glowtext004.material}
        position={[7.526, 2.23, 6.578]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </>
  );
}
