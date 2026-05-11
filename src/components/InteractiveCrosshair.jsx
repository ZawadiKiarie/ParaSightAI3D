import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export const InteractiveCrosshair = () => {
  const horizontalLine = useRef();
  const verticalLine = useRef();
  const dot = useRef(); // Ref for the intersection point
  const { viewport } = useThree();

  useFrame((state) => {
    const { pointer } = state;

    // 1. Calculate Target Positions
    const targetX = (pointer.x * viewport.width) / 2;
    const targetY = (pointer.y * viewport.height) / 2;

    // 2. Smooth Lerp for the lines
    const lerpSpeed = 0.1;

    verticalLine.current.position.x = THREE.MathUtils.lerp(
      verticalLine.current.position.x,
      targetX,
      lerpSpeed,
    );

    horizontalLine.current.position.y = THREE.MathUtils.lerp(
      horizontalLine.current.position.y,
      targetY,
      lerpSpeed,
    );

    // 3. Move the dot to the intersection (follows both X and Y)
    if (dot.current) {
      dot.current.position.x = verticalLine.current.position.x;
      dot.current.position.y = horizontalLine.current.position.y;
    }
  });

  return (
    <group>
      {/* Vertical Line */}
      <mesh ref={verticalLine}>
        <planeGeometry args={[0.005, viewport.height * 2]} />
        <meshBasicMaterial
          color="white"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Horizontal Line */}
      <mesh ref={horizontalLine}>
        <planeGeometry args={[viewport.width * 2, 0.005]} />
        <meshBasicMaterial
          color="white"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Intersection Point (Diamond or Circle) */}
      <mesh ref={dot} rotation={[0, 0, Math.PI / 4]}>
        {/* Diamond look: use CircleGeometry with 4 segments OR RingGeometry for a hollow circle */}
        <ringGeometry args={[0.04, 0.05, 32]} />
        <meshBasicMaterial
          color="white"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
