import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

const HartmanniCystCytoplasmMaterialImpl = shaderMaterial(
  {
    uTime: 0,
    uBaseColor: new THREE.Color("#d7d8b8"),
    uCloudColor: new THREE.Color("#e4e5ca"),
    uShadowColor: new THREE.Color("#aeb08d"),
    uOpacity: 0.62,
    uDensity: 1.18,
    uNoiseScale: 4.2,
    uSoftness: 0.82,
    uRimStrength: 0.14,
    uMotionStrength: 0.006,
    uGranuleStrength: 0.18,
  },

  /* glsl */ `
    varying vec3 vLocalPos;
    varying vec3 vWorldPos;
    varying vec3 vNormalW;
    varying vec3 vViewDir;

    void main() {
      vLocalPos = position;

      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPos = worldPos.xyz;

      vNormalW = normalize(mat3(modelMatrix) * normal);
      vViewDir = normalize(cameraPosition - worldPos.xyz);

      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,

  /* glsl */ `
    varying vec3 vLocalPos;
    varying vec3 vWorldPos;
    varying vec3 vNormalW;
    varying vec3 vViewDir;

    uniform float uTime;
    uniform vec3 uBaseColor;
    uniform vec3 uCloudColor;
    uniform vec3 uShadowColor;
    uniform float uOpacity;
    uniform float uDensity;
    uniform float uNoiseScale;
    uniform float uSoftness;
    uniform float uRimStrength;
    uniform float uMotionStrength;
    uniform float uGranuleStrength;

    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;

      i = mod289(i);
      vec4 p = permute(
                permute(
                  permute(i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
      m = m * m;

      return 42.0 * dot(
        m * m,
        vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3))
      );
    }

    float fbm(vec3 p) {
      float value = 0.0;
      float amp = 0.5;
      float freq = 1.0;

      for (int i = 0; i < 5; i++) {
        value += amp * snoise(p * freq);
        freq *= 2.0;
        amp *= 0.5;
      }

      return value;
    }

    void main() {
      vec3 p = vLocalPos * uNoiseScale;
      float t = uTime * uMotionStrength;

      // Main soft cloud field
      float cloudA = fbm(p + vec3(0.0, t, 0.0));
      float cloudB = fbm(p * 1.6 - vec3(t * 0.6, 0.0, t * 0.3));
      float cloud = cloudA * 0.68 + cloudB * 0.32;
      cloud = cloud * 0.5 + 0.5;
      cloud = smoothstep(0.28, 0.78, cloud);

      // Fine granularity to mimic compact cyst cytoplasm
      float granules = snoise(p * 3.2 + vec3(t * 0.5, -t * 0.2, t * 0.25));
      granules = granules * 0.5 + 0.5;
      granules = smoothstep(0.42, 0.75, granules);

      // Slight central density bias
      float radial = 1.0 - smoothstep(0.12, 1.1, length(vLocalPos));
      float density = cloud + radial * 0.18 + granules * uGranuleStrength;
      density = clamp(density * uDensity, 0.0, 1.0);

      float fresnel = pow(1.0 - max(dot(normalize(vNormalW), normalize(vViewDir)), 0.0), 2.2);
      float rim = fresnel * uRimStrength;

      vec3 color = mix(uShadowColor, uBaseColor, density);
      color = mix(color, uCloudColor, cloud * uSoftness);

      // Fine internal mottling, very restrained
      color += (granules - 0.5) * 0.06;
      color += rim;

      float alpha = uOpacity * mix(0.78, 1.0, density);

      gl_FragColor = vec4(color, alpha);
    }
  `,
);

extend({ HartmanniCystCytoplasmMaterialImpl });

export function HartmanniCystCytoplasmMaterial(props) {
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.uTime += delta;
    }
  });

  return (
    <hartmanniCystCytoplasmMaterialImpl
      ref={ref}
      transparent
      depthWrite={false}
      side={THREE.DoubleSide}
      {...props}
    />
  );
}
