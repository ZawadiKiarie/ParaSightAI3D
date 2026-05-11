import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

const OocystBodyMaterialBase = shaderMaterial(
  {
    uTime: 0,
    uBaseColor: new THREE.Color("#d9ddd3"),
    uShadowColor: new THREE.Color("#98a18e"),
    uWallTint: new THREE.Color("#f1f3ea"),
    uOpacity: 0.42,
    uNoiseScale: 4.6,
    uFlowSpeed: 0.08,
    uBrightness: 0.08,
    uWallStrength: 0.7,
    uGranuleStrength: 0.08,
    uFresnelStrength: 0.18,
    uWobbleStrength: 0.006,
    uWobbleSpeed: 0.28,
  },
  /* glsl */ `
    #include <common>
    #include <morphtarget_pars_vertex>

    varying vec3 vLocalPos;
    varying vec3 vWorldPos;
    varying vec3 vNormalW;
    varying vec3 vViewDir;
    varying float vRadius;

    uniform float uTime;
    uniform float uWobbleStrength;
    uniform float uWobbleSpeed;

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

      float n_ = 1.0 / 7.0;
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
      return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
    }

    void main() {
      #include <begin_vertex>
      #include <morphtarget_vertex>

      vec3 basePos = transformed;
      vec3 nrm = normalize(normal);
      float t = uTime * uWobbleSpeed;

      // extremely subtle micro-undulation
      float wobble = snoise(basePos * 2.2 + vec3(t * 0.2, 0.0, t * 0.12));
      transformed += nrm * wobble * uWobbleStrength;

      vec4 worldPos = modelMatrix * vec4(transformed, 1.0);

      vLocalPos = transformed;
      vWorldPos = worldPos.xyz;
      vNormalW = normalize(mat3(modelMatrix) * nrm);
      vViewDir = normalize(cameraPosition - worldPos.xyz);
      vRadius = length(transformed);

      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  /* glsl */ `
    #include <common>

    varying vec3 vLocalPos;
    varying vec3 vWorldPos;
    varying vec3 vNormalW;
    varying vec3 vViewDir;
    varying float vRadius;

    uniform float uTime;
    uniform vec3 uBaseColor;
    uniform vec3 uShadowColor;
    uniform vec3 uWallTint;
    uniform float uOpacity;
    uniform float uNoiseScale;
    uniform float uFlowSpeed;
    uniform float uBrightness;
    uniform float uWallStrength;
    uniform float uGranuleStrength;
    uniform float uFresnelStrength;

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

      float n_ = 1.0 / 7.0;
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
      return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
    }

    float fbm(vec3 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 4; i++) {
        v += a * snoise(p);
        p *= 2.0;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      float t = uTime * uFlowSpeed;
      vec3 p = vLocalPos * uNoiseScale;

      float internal = fbm(p + vec3(t * 0.08, -t * 0.04, t * 0.05));
      float granule = snoise(p * 4.8 + vec3(0.0, t * 0.06, 0.0));

      // emphasize the wall so it reads like a refractile oocyst shell
      float wall = smoothstep(0.58, 1.0, vRadius);
      wall = pow(wall, 2.8) * uWallStrength;

      float bodyScatter = 0.52 + internal * 0.18;
      float granules = smoothstep(0.45, 0.85, granule) * uGranuleStrength;

      float fresnel = pow(1.0 - max(dot(normalize(vNormalW), normalize(vViewDir)), 0.0), 3.0);
      fresnel *= uFresnelStrength;

      vec3 innerColor = mix(uShadowColor, uBaseColor, bodyScatter + uBrightness);
      vec3 wallColor = mix(innerColor, uWallTint, wall + fresnel * 0.6);
      vec3 finalColor = wallColor + granules * 0.04;

      float alpha = uOpacity * (0.55 + wall * 0.45 + fresnel * 0.2);
      alpha = clamp(alpha, 0.0, 0.82);

      gl_FragColor = vec4(finalColor, alpha);

      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,
);

extend({ OocystBodyMaterialBase });

const OocystBodyMaterial = forwardRef(
  (
    {
      opacity = 0.42,
      baseColor = "#d9ddd3",
      shadowColor = "#98a18e",
      wallTint = "#f1f3ea",
      noiseScale = 4.6,
      flowSpeed = 0.08,
      brightness = 0.08,
      wallStrength = 0.7,
      granuleStrength = 0.08,
      fresnelStrength = 0.18,
      wobbleStrength = 0.006,
      wobbleSpeed = 0.28,
      ...props
    },
    ref,
  ) => {
    const materialRef = useRef();

    useImperativeHandle(ref, () => materialRef.current);

    useFrame((_, delta) => {
      if (materialRef.current) {
        materialRef.current.uTime += delta;
      }
    });

    return (
      <oocystBodyMaterialBase
        ref={materialRef}
        transparent
        depthWrite={false}
        depthTest={true}
        side={THREE.FrontSide}
        uOpacity={opacity}
        uBaseColor={new THREE.Color(baseColor)}
        uShadowColor={new THREE.Color(shadowColor)}
        uWallTint={new THREE.Color(wallTint)}
        uNoiseScale={noiseScale}
        uFlowSpeed={flowSpeed}
        uBrightness={brightness}
        uWallStrength={wallStrength}
        uGranuleStrength={granuleStrength}
        uFresnelStrength={fresnelStrength}
        uWobbleStrength={wobbleStrength}
        uWobbleSpeed={wobbleSpeed}
        {...props}
      />
    );
  },
);

export default OocystBodyMaterial;
