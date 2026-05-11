import React, { useRef } from "react";
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GLCystProtoplastMaterialImpl = shaderMaterial(
  {
    uTime: 0,
    uBaseColor: new THREE.Color("#cfd7b6"),
    uCloudColor: new THREE.Color("#dde5c8"),
    uShadowColor: new THREE.Color("#9eaa88"),
    uCoreTint: new THREE.Color("#b8c59c"),
    uOpacity: 0.58,
    uDensity: 1.18,
    uNoiseScale: 4.8,
    uSoftness: 0.86,
    uRimStrength: 0.12,
    uMotionStrength: 0.003,
    uGranuleStrength: 0.14,
    uCoreBias: 0.22,
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
    uniform vec3 uCoreTint;
    uniform float uOpacity;
    uniform float uDensity;
    uniform float uNoiseScale;
    uniform float uSoftness;
    uniform float uRimStrength;
    uniform float uMotionStrength;
    uniform float uGranuleStrength;
    uniform float uCoreBias;

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

      // Smooth organized cloud field
      float cloudA = fbm(p + vec3(0.0, t, 0.0));
      float cloudB = fbm(p * 1.7 - vec3(t * 0.4, 0.0, t * 0.25));
      float cloud = cloudA * 0.7 + cloudB * 0.3;
      cloud = cloud * 0.5 + 0.5;
      cloud = smoothstep(0.3, 0.78, cloud);

      // Fine restrained granules
      float granules = snoise(p * 3.6 + vec3(t * 0.25, -t * 0.15, t * 0.12));
      granules = granules * 0.5 + 0.5;
      granules = smoothstep(0.46, 0.76, granules);

      // Slight central body density
      float radial = 1.0 - smoothstep(0.1, 1.15, length(vLocalPos));
      float density = cloud + radial * uCoreBias + granules * uGranuleStrength;
      density = clamp(density * uDensity, 0.0, 1.0);

      float fresnel = pow(1.0 - max(dot(normalize(vNormalW), normalize(vViewDir)), 0.0), 2.4);
      float rim = fresnel * uRimStrength;

      vec3 color = mix(uShadowColor, uBaseColor, density);
      color = mix(color, uCloudColor, cloud * uSoftness);
      color = mix(color, uCoreTint, radial * 0.28);

      // very slight micro-variation only
      color += (granules - 0.5) * 0.04;
      color += rim;

      float alpha = uOpacity * mix(0.8, 1.0, density);

      gl_FragColor = vec4(color, alpha);
    }
  `,
);

extend({ GLCystProtoplastMaterialImpl });

export function GLCystProtoplastMaterial(props) {
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.uTime += delta;
    }
  });

  return (
    <gLCystProtoplastMaterialImpl
      ref={ref}
      transparent
      depthWrite={false}
      side={THREE.DoubleSide}
      {...props}
    />
  );
}
