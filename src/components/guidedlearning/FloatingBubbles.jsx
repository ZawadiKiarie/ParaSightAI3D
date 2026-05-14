import React, { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

export const FloatingBubbles = ({ count = 50 }) => {
  const points = useRef();

  // 1. Load your bubble/circle texture
  // Replace './path/to/your/circle.png' with your actual file path
  const bubbleTexture = useLoader(
    THREE.TextureLoader,
    "/textures/circle_05.png",
  );

  const [particles, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const randomSizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      randomSizes[i] = Math.random() * 0.4 + 0.1; // Increased size range for visibility
    }
    return [positions, randomSizes];
  }, [count]);

  useFrame((state) => {
    const { clock, pointer } = state;
    const t = clock.getElapsedTime();

    // Gentle rotation of the entire particle field
    points.current.rotation.x = t * 0.02;
    points.current.rotation.y = t * 0.01;

    // Smooth Parallax follow
    const targetX = pointer.x * 0.8;
    const targetY = pointer.y * 0.8;

    points.current.position.x = THREE.MathUtils.lerp(
      points.current.position.x,
      targetX,
      0.03, // Slower lerp = more "liquid" feel
    );
    points.current.position.y = THREE.MathUtils.lerp(
      points.current.position.y,
      targetY,
      0.03,
    );
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
        {/* We keep this here in case you want to use custom shaders later */}
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        map={bubbleTexture} // Use your image here
        size={0.5} // Control the base size
        color="#a0c4ff"
        transparent={true} // Necessary for PNG transparency
        alphaTest={0.01} // Prevents the "black box" overlap issue
        opacity={0.2}
        blending={THREE.AdditiveBlending} // Makes overlapping bubbles glow
        sizeAttenuation={true} // Makes them smaller when farther away
        depthWrite={false} // Crucial for transparency sorting
      />
    </points>
  );
};
