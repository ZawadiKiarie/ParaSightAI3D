import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

const PeripheralCytoplasmMaterialBase = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#b7c9b2"),
    uShadowColor: new THREE.Color("#6f8a73"),
    uMembraneTint: new THREE.Color("#d8e4d1"),
    uOpacity: 0.46,
    uNoiseScale: 3.8,
    uFlowSpeed: 0.16,
    uBrightness: 0.1,
    uRimThickness: 0.26,
    uBeadStrength: 0.18,
    uFresnelStrength: 0.12,
    uWobbleStrength: 0.03,
    uWobbleSpeed: 0.55,
  },
  /* glsl */ `
    #include <common>
    #include <morphtarget_pars_vertex>

    varying vec3 vLocalPos;
    varying vec3 vWorldPos;
    varying vec3 vNormalW;
    varying vec3 vViewDir;
    varying float vRadial;

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

      float wobbleA = snoise(basePos * 1.4 + vec3(t * 0.45, 0.0, t * 0.2));
      float wobbleB = snoise(basePos * 2.2 + vec3(0.0, t * -0.3, t * 0.35));
      float wobble = wobbleA * 0.7 + wobbleB * 0.3;

      transformed += nrm * wobble * uWobbleStrength;

      vec4 worldPos = modelMatrix * vec4(transformed, 1.0);

      vLocalPos = transformed;
      vWorldPos = worldPos.xyz;
      vNormalW = normalize(mat3(modelMatrix) * nrm);
      vViewDir = normalize(cameraPosition - worldPos.xyz);
      vRadial = length(transformed);

      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  /* glsl */ `
    #include <common>

    varying vec3 vLocalPos;
    varying vec3 vWorldPos;
    varying vec3 vNormalW;
    varying vec3 vViewDir;
    varying float vRadial;

    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uShadowColor;
    uniform vec3 uMembraneTint;
    uniform float uOpacity;
    uniform float uNoiseScale;
    uniform float uFlowSpeed;
    uniform float uBrightness;
    uniform float uRimThickness;
    uniform float uBeadStrength;
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
      for (int i = 0; i < 5; i++) {
        v += a * snoise(p);
        p *= 2.0;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      float t = uTime * uFlowSpeed;
      vec3 p = vLocalPos * uNoiseScale;

      float flow1 = fbm(p + vec3(t * 0.14, t * 0.22, 0.0));
      float flow2 = fbm(p * 1.8 + vec3(0.0, -t * 0.18, t * 0.11));
      float streaming = 0.5 + flow1 * 0.28 + flow2 * 0.14;

      // thin peripheral cytoplasm look
      // uses radial weighting so the visible density stays strongest near the outer boundary
      float rim = smoothstep(0.52, 1.0, vRadial);
      rim = pow(rim, 2.2);

      // beaded rim / mottling
      float beads = snoise(p * 5.2 + vec3(t * 0.25, 0.0, -t * 0.16));
      beads = smoothstep(0.38, 0.78, beads) * uBeadStrength;

      float density = streaming * rim * uRimThickness + beads * rim;
      density = clamp(density, 0.0, 1.0);

      float fresnel = pow(1.0 - max(dot(normalize(vNormalW), normalize(vViewDir)), 0.0), 2.5);
      fresnel *= uFresnelStrength;

      vec3 cytoplasmColor = mix(uShadowColor, uColor, density + uBrightness);
      vec3 finalColor = mix(cytoplasmColor, uMembraneTint, 0.22) + fresnel * 0.22;

      float alpha = uOpacity * (0.42 + density * 0.9 + fresnel * 0.18);
      alpha = clamp(alpha, 0.0, 0.9);

      gl_FragColor = vec4(finalColor, alpha);

      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,
);

extend({ PeripheralCytoplasmMaterialBase });

const PeripheralCytoplasmMaterial = forwardRef(
  (
    {
      opacity = 0.46,
      color = "#b7c9b2",
      shadowColor = "#6f8a73",
      membraneTint = "#314e20",
      noiseScale = 3.8,
      flowSpeed = 0.16,
      brightness = 0.1,
      rimThickness = 0.26,
      beadStrength = 0.18,
      fresnelStrength = 0.12,
      wobbleStrength = 0.03,
      wobbleSpeed = 0.55,
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
      <peripheralCytoplasmMaterialBase
        ref={materialRef}
        transparent
        depthWrite={false}
        depthTest={true}
        side={THREE.FrontSide}
        uOpacity={opacity}
        uColor={new THREE.Color(color)}
        uShadowColor={new THREE.Color(shadowColor)}
        uMembraneTint={new THREE.Color(membraneTint)}
        uNoiseScale={noiseScale}
        uFlowSpeed={flowSpeed}
        uBrightness={brightness}
        uRimThickness={rimThickness}
        uBeadStrength={beadStrength}
        uFresnelStrength={fresnelStrength}
        uWobbleStrength={wobbleStrength}
        uWobbleSpeed={wobbleSpeed}
        {...props}
      />
    );
  },
);

export default PeripheralCytoplasmMaterial;
