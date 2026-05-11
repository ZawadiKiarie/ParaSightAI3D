import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";

const FireballCytoplasmMaterialImpl = shaderMaterial(
  {
    iTime: 0,
    uOpacity: 0.8,
    uHeat: 1.0,
  },
  /* glsl */ `
    varying vec3 vWorldPosition;
    varying vec3 vRayOrigin;
    varying vec3 vNormal;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      vRayOrigin = cameraPosition;
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  /* glsl */ `
    uniform float iTime;
    uniform float uOpacity;
    uniform float uHeat;

    varying vec3 vWorldPosition;
    varying vec3 vRayOrigin;
    varying vec3 vNormal;

    vec3 bioColor(float temp) {
      vec3 cold = vec3(0.02, 0.05, 0.04);
      vec3 mid = vec3(0.4, 0.6, 0.45);
      vec3 hot = vec3(0.9, 0.95, 0.7);
      return mix(cold, mid, temp) + pow(max(temp, 0.0), 3.0) * hot;
    }

    float hash(float n) {
      return fract(sin(n) * 43758.5453);
    }

    float noise(vec3 x) {
      vec3 p = floor(x);
      vec3 f = fract(x);
      f = f * f * (3.0 - 2.0 * f);
      float n = p.x + p.y * 57.0 + p.z * 113.0;

      return mix(
        mix(
          mix(hash(n + 0.0), hash(n + 1.0), f.x),
          mix(hash(n + 57.0), hash(n + 58.0), f.x),
          f.y
        ),
        mix(
          mix(hash(n + 113.0), hash(n + 114.0), f.x),
          mix(hash(n + 170.0), hash(n + 171.0), f.x),
          f.y
        ),
        f.z
      );
    }

    float fbm(vec3 p) {
      float f = 0.0;
      float amp = 0.5;

      for (int i = 0; i < 4; i++) {
        f += amp * noise(p - vec3(0.0, iTime * 0.2, 0.0));
        p = p * 2.0;
        amp *= 0.5;
      }

      return f;
    }

    void main() {
      vec3 rd = normalize(vWorldPosition - vRayOrigin);

      float density = 0.0;
      vec3 finalCol = vec3(0.0);

      for (int i = 0; i < 20; i++) {
        float t = float(i) * 0.05;
        vec3 p = vWorldPosition + rd * t;

        float n = fbm(p * 3.0);
        float localDensity = n * 0.2;

        density += localDensity;
        finalCol += bioColor(n * uHeat) * localDensity;

        if (density > 0.9) break;
      }

      float fresnel = pow(1.0 - max(dot(vNormal, -rd), 0.0), 3.0);
      finalCol += vec3(0.8, 1.0, 0.8) * fresnel * 0.3;

      gl_FragColor = vec4(finalCol, density * uOpacity);
    }
  `,
);

extend({ FireballCytoplasmMaterialImpl });

export const VolumetricParasiteMaterial = forwardRef(
  function VolumetricParasiteMaterial(
    { opacity = 0.7, heat = 1.2 },
    forwardedRef,
  ) {
    const localRef = useRef();

    useImperativeHandle(forwardedRef, () => localRef.current, []);

    useFrame((state) => {
      if (localRef.current) {
        localRef.current.iTime = state.clock.elapsedTime;
      }
    });

    return (
      <fireballCytoplasmMaterialImpl
        ref={localRef}
        transparent
        depthWrite={false}
        uOpacity={opacity}
        uHeat={heat}
      />
    );
  },
);
