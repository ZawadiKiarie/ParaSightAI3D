import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const ParasiteCytoplasmMaterialImpl = shaderMaterial(
  {
    iTime: 0,
    uOpacity: 0.9,
    uNoiseScale: 3.2,
    uFlowSpeed: 0.18,
    uBrightness: 0.22,
    uColor: new THREE.Color("#7fae72"),
    uFresnelStrength: 0.08,
  },
  /* glsl */ `
    #include <common>
    #include <morphtarget_pars_vertex>

    varying vec3 vLocalPosition;
    varying vec3 vWorldPosition;
    varying vec3 vNormalW;

    void main() {
      // 1. Start with the base position
      vec3 transformed = vec3(position);

      // 2. APPLY MORPH TARGETS MANUALLY
      // This is the "secret sauce" for custom shaders with GLTF animations
      #ifdef USE_MORPHTARGETS
        #include <morphtarget_vertex>
      #endif

      vLocalPosition = transformed;
      
      // 3. Standard transformations
      vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
      vWorldPosition = worldPosition.xyz;
      vNormalW = normalize(mat3(modelMatrix) * normal);

      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    }
  `,
  /* glsl */ `
    uniform float iTime;
    uniform float uOpacity;
    uniform float uNoiseScale;
    uniform float uFlowSpeed;
    uniform float uBrightness;
    uniform vec3 uColor;
    uniform float uFresnelStrength;

    varying vec3 vLocalPosition;
    varying vec3 vWorldPosition;
    varying vec3 vNormalW;

    float hash(vec3 p) {
      p = fract(p * 0.3183099 + 0.1);
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }

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

    float fbm(vec3 p) {
      float value = 0.0;
      float amp = 0.5;

      for (int i = 0; i < 5; i++) {
        value += amp * noise(p);
        p = p * 2.0 + vec3(13.1, 7.7, 5.3);
        amp *= 0.5;
      }

      return value;
    }

    void main() {
      vec3 p = vLocalPosition * uNoiseScale;

      // isotropic 3D flow in local space -> no directional stretching
      float t = iTime * uFlowSpeed;
      vec3 flowA = vec3(t, t * 0.8, -t * 0.6);
      vec3 flowB = vec3(-t * 0.7, t * 0.5, t);

      float n1 = fbm(p + flowA);
      float n2 = fbm(p * 1.7 + flowB);
      float density = mix(n1, n2, 0.45);

      // soft cloudy bands, same hue always
      density = smoothstep(0.28, 0.82, density);

      vec3 color = uColor * (0.82 + density * uBrightness);

      vec3 normalW = normalize(vNormalW);
      vec3 viewDir = normalize(cameraPosition - vWorldPosition);
      float fresnel = pow(1.0 - max(dot(normalW, viewDir), 0.0), 2.0);

      color += fresnel * uFresnelStrength;

      gl_FragColor = vec4(color, uOpacity);
    }
  `,
);

extend({ ParasiteCytoplasmMaterialImpl });

export function DirtyCytoplasmMaterial({
  opacity = 0.9,
  noiseScale = 3.2,
  flowSpeed = 0.18,
  brightness = 0.22,
  color = "#7fae72",
  fresnelStrength = 0.08,
}) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.iTime = state.clock.elapsedTime;
    }
  });

  return (
    <parasiteCytoplasmMaterialImpl
      ref={ref}
      key={ParasiteCytoplasmMaterialImpl.key}
      transparent
      depthWrite={false}
      depthTest={true}
      side={THREE.FrontSide}
      uOpacity={opacity}
      uNoiseScale={noiseScale}
      uFlowSpeed={flowSpeed}
      uBrightness={brightness}
      uColor={new THREE.Color(color)}
      uFresnelStrength={fresnelStrength}
    />
  );
}
