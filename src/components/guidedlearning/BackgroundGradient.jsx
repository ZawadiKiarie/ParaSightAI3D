import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

// 1. Define the Shader Material
const BackgroundMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uColorA: new THREE.Color("#b9cbf1"), // Deep Navy/Bio-fluid
    uColorB: new THREE.Color("#d3d0f0"), // Mid Blue
    uColorC: new THREE.Color("#ffffff"), // Highlight/Membrane color
  },
  // Vertex Shader
  /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec2 vUv;

  // Classic Perlin-like noise for organic fluid movement
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    
    // Animate noise based on time and mouse
    float noise = snoise(uv * 2.0 + uTime * 0.1 + uMouse * 0.9);
    
    // Mix colors based on noise and vertical position
    vec3 color = mix(uColorA, uColorB, uv.y + noise * 0.3);
    color = mix(color, uColorC, noise * 0.2);

    gl_FragColor = vec4(color, 1.0);
  }
  `,
);

// 2. Register the material so it can be used as <backgroundMaterial />
extend({ BackgroundMaterial });

export const BackgroundGradient = () => {
  const materialRef = useRef();
  const { viewport } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      const { clock, pointer } = state;

      //update time
      materialRef.current.uTime = clock.getElapsedTime();

      //Smoothly interpolate mouse position(Lerping)
      materialRef.current.uMouse.x = THREE.MathUtils.lerp(
        materialRef.current.uMouse.x,
        pointer.x,
        0.05,
      );
      materialRef.current.uMouse.y = THREE.MathUtils.lerp(
        materialRef.current.uMouse.y,
        pointer.y,
        0.05,
      );
    }
  });
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <backgroundMaterial ref={materialRef} />
    </mesh>
  );
};
