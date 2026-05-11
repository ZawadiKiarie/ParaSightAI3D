import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const TrophozoiteMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#cfdcc8"),
    uOpacity: 0.32,
    uNoiseScale: 3.0,
    uFresnelPower: 2.2,
    uFresnelIntensity: 0.18,
  },
  //vertex shader
  /* glsl */ `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewDir;

    void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);

        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;

        vec4 viewPosition = viewMatrix * worldPosition;
        vViewDir = normalize(-viewPosition.xyz);
    
        gl_Position = projectionMatrix * viewPosition;
  }
    `,

  //Fragment shader
  /* glsl */ `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uNoiseScale;
    uniform float uFresnelPower;
    uniform float uFresnelIntensity;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewDir;

    //simple pseudo-random
    float hash(vec3 p) {
        p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }

    //value noise
    float noise(vec3 x) {
      vec3 i = floor(x);
      vec3 f = fract(x);

      f = f * f * (3.0 - 2.0 * f);

      float n000 = hash(i + vec3(0.0, 0.0, 0.0));
      float n100 = hash(i + vec3(1.0, 0.0, 0.0));
      float n010 = hash(i + vec3(0.0, 1.0, 0.0));
      float n110 = hash(i + vec3(1.0, 1.0, 0.0));
      float n001 = hash(i + vec3(0.0, 0.0, 1.0));
      float n101 = hash(i + vec3(1.0, 0.0, 1.0));
      float n011 = hash(i + vec3(0.0, 1.0, 1.0));
      float n111 = hash(i + vec3(1.0, 1.0, 1.0));

      float nx00 = mix(n000, n100, f.x);
      float nx10 = mix(n010, n110, f.x);
      float nx01 = mix(n001, n101, f.x);
      float nx11 = mix(n011, n111, f.x);

      float nxy0 = mix(nx00, nx10, f.y);
      float nxy1 = mix(nx01, nx11, f.y);

      return mix(nxy0, nxy1, f.z);
    }

    void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewDir);

        //soft moving cloud noise
        vec3 noisePos = vWorldPosition * uNoiseScale;
        noisePos += vec3(0.0, uTime * 0.08, uTime * 0.04);

        float n1 = noise(noisePos);
        float n2 = noise(noisePos * 2.0) * 0.5;
        float cloud = smoothstep(0.25, 0.85, n1 + n2);

        // fresnel edge softness
        float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), uFresnelPower);
        fresnel *= uFresnelIntensity;

        // color modulation
        vec3 baseColor = uColor;
        vec3 cloudyColor = baseColor * mix(0.88, 1.08, cloud);
        vec3 finalColor = cloudyColor + fresnel;

        // alpha modulation
        float alpha = uOpacity + cloud * 0.12 + fresnel * 0.2;
        alpha = clamp(alpha, 0.18, 0.55);

        gl_FragColor = vec4(finalColor, alpha);
    }
    `,
);

extend({ TrophozoiteMaterial });

export const BodyMaterial = (props) => {
  const materialRef = useRef();

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uTime = state.clock.elapsedTime;
  });

  return (
    <trophozoiteMaterial
      ref={materialRef}
      transparent
      depthWrite={false}
      {...props}
    />
  );
};
