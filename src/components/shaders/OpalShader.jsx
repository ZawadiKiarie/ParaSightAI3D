// OpalShader.jsx
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const ParasiteCytoplasmMaterialImpl = shaderMaterial(
  {
    iTime: 0,
    uOpacity: 0.78,
    uWobbleIntensity: 0.06,
  },
  /* glsl */ `
    #include <common>
    #include <morphtarget_pars_vertex>

    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    varying vec3 vLocalPosition;

    uniform float iTime;
    uniform float uWobbleIntensity;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
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
          + i.y + vec4(0.0, i1.y, i2.y, 1.0)
        )
        + i.x + vec4(0.0, i1.x, i2.x, 1.0)
      );

      vec4 j = p - 49.0 * floor(p * 0.02040816326);
      vec4 x = floor(j * 0.14285714285) * 0.14285714285 * 2.0 - 1.0;
      vec4 y = floor(j - 7.0 * floor(j * 0.14285714285)) * 0.14285714285 * 2.0 - 1.0;
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

      vec4 norm = taylorInvSqrt(
        vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3))
      );
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(
        0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)),
        0.0
      );
      m = m * m;

      return 42.0 * dot(
        m * m,
        vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3))
      );
    }

    float fbm3(vec3 p) {
      float value = 0.0;
      float amplitude = 0.5;

      for (int i = 0; i < 5; i++) {
        value += amplitude * snoise(p);
        p *= 2.0;
        amplitude *= 0.5;
      }

      return value;
    }

    void main() {
      vec3 transformed = position;

      #include <morphtarget_vertex>

      float wobbleNoise = snoise(transformed * 1.25 + vec3(0.0, iTime * 0.35, 0.0));
      transformed += normal * wobbleNoise * uWobbleIntensity;

      vLocalPosition = transformed;
      vNormal = normalize(normalMatrix * normal);

      vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
      vWorldPosition = worldPosition.xyz;

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  /* glsl */ `
    uniform float iTime;
    uniform float uOpacity;

    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    varying vec3 vLocalPosition;

    const vec3 colBase  = vec3(0.10, 0.13, 0.11);
    const vec3 colGrain = vec3(0.72, 0.80, 0.66);
    const vec3 colHigh  = vec3(0.93, 0.97, 0.82);

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
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
          + i.y + vec4(0.0, i1.y, i2.y, 1.0)
        )
        + i.x + vec4(0.0, i1.x, i2.x, 1.0)
      );

      vec4 j = p - 49.0 * floor(p * 0.02040816326);
      vec4 x = floor(j * 0.14285714285) * 0.14285714285 * 2.0 - 1.0;
      vec4 y = floor(j - 7.0 * floor(j * 0.14285714285)) * 0.14285714285 * 2.0 - 1.0;
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

      vec4 norm = taylorInvSqrt(
        vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3))
      );
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(
        0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)),
        0.0
      );
      m = m * m;

      return 42.0 * dot(
        m * m,
        vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3))
      );
    }

    float fbm3(vec3 p) {
      float value = 0.0;
      float amplitude = 0.5;

      for (int i = 0; i < 5; i++) {
        value += amplitude * snoise(p);
        p *= 2.0;
        amplitude *= 0.5;
      }

      return value;
    }

    void main() {
      vec3 p = vLocalPosition * 2.0;

      float n1 = fbm3(p + vec3(0.0, iTime * 0.08, 0.0));
      float n2 = fbm3(p * 1.85 - vec3(iTime * 0.05, 0.0, 0.0));
      float density = smoothstep(-0.18, 0.42, n1 * 0.72 + n2 * 0.28);

      vec3 col = mix(colBase, colGrain, density);
      col = mix(col, colHigh, smoothstep(0.72, 1.0, density));

      vec3 viewDir = normalize(cameraPosition - vWorldPosition);
      float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 2.4);

      col += 0.10 * fresnel;
      col *= 1.0 + 0.08 * fresnel;

      float alpha = mix(0.52, 0.88, density) * uOpacity;

      gl_FragColor = vec4(col, alpha);
    }
  `,
);

extend({ ParasiteCytoplasmMaterialImpl });

export function ParasiteMaterial({ opacity = 0.48, wobble = 0.06 }) {
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
      side={THREE.DoubleSide}
      uOpacity={opacity}
      uWobbleIntensity={wobble}
    />
  );
}
