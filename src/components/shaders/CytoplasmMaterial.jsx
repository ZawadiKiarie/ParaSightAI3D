import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

const CytoplasmMaterialBase = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#8fc7d8"),
    uShadowColor: new THREE.Color("#5c98ab"),
    uOpacity: 0.42,
    uNoiseScale: 4.2,
    uFlowSpeed: 0.22,
    uBrightness: 0.16,
    uFresnelStrength: 0.1,
    uThickness: 0.85,
    uWobbleStrength: 0.035,
    uWobbleSpeed: 0.9,
  },
  /* glsl */ `
    #include <common>
    #include <morphtarget_pars_vertex>

    varying vec3 vLocalPos;
    varying vec3 vWorldPos;
    varying vec3 vNormalW;
    varying vec3 vViewDir;

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
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));

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
      vec3 baseNormal = normalize(normal);

      float t = uTime * uWobbleSpeed;

      // Low-frequency organic wobble
      float wobble1 = snoise(basePos * 2.0 + vec3(0.0, t * 0.7, t * 0.35));
      float wobble2 = snoise(basePos * 3.2 + vec3(t * -0.45, 0.0, t * 0.25));
      float wobble3 = sin(basePos.y * 4.0 + t * 1.4) * 0.15;

      float wobble = wobble1 * 0.65 + wobble2 * 0.25 + wobble3;
      transformed += baseNormal * wobble * uWobbleStrength;

      vec4 worldPos = modelMatrix * vec4(transformed, 1.0);

      vLocalPos = transformed;
      vWorldPos = worldPos.xyz;
      vNormalW = normalize(mat3(modelMatrix) * baseNormal);
      vViewDir = normalize(cameraPosition - worldPos.xyz);

      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  /* glsl */ `
    #include <common>

    varying vec3 vLocalPos;
    varying vec3 vWorldPos;
    varying vec3 vNormalW;
    varying vec3 vViewDir;

    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uShadowColor;
    uniform float uOpacity;
    uniform float uNoiseScale;
    uniform float uFlowSpeed;
    uniform float uBrightness;
    uniform float uFresnelStrength;
    uniform float uThickness;

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
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));

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
      float value = 0.0;
      float amp = 0.5;

      for (int i = 0; i < 5; i++) {
        value += amp * snoise(p);
        p *= 2.0;
        amp *= 0.5;
      }

      return value;
    }

    void main() {
      vec3 p = vLocalPos * uNoiseScale;

      float t = uTime * uFlowSpeed;
      vec3 flowA = vec3(0.0, t * 0.55, t * 0.18);
      vec3 flowB = vec3(t * -0.22, 0.0, t * 0.35);

      float n1 = fbm(p + flowA);
      float n2 = fbm(p * 1.7 - flowB);
      float n3 = snoise(p * 3.0 + vec3(t * 0.25, t * -0.18, t * 0.14));

      float density = 0.55 + n1 * 0.28 + n2 * 0.14 + n3 * 0.08;
      density = smoothstep(0.28, 0.82, density);

      float localRadius = length(vLocalPos);
      float centerWeight = 1.0 - smoothstep(0.15, 1.25, localRadius);
      density += centerWeight * 0.18 * uThickness;

      float granule = snoise(p * 5.0 - vec3(0.0, t * 0.3, 0.0));
      granule = smoothstep(0.35, 0.8, granule) * 0.08;

      density += granule;
      density = clamp(density, 0.0, 1.0);

      float fresnel = pow(1.0 - max(dot(normalize(vNormalW), normalize(vViewDir)), 0.0), 2.2);
      fresnel *= uFresnelStrength;

      vec3 baseColor = mix(uShadowColor, uColor, density + uBrightness);
      vec3 finalColor = baseColor + fresnel * 0.35;

      float alpha = uOpacity * (0.72 + density * 0.38);
      alpha = clamp(alpha, 0.0, 0.92);

      gl_FragColor = vec4(finalColor, alpha);

      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,
);

extend({ CytoplasmMaterialBase });

const CytoplasmMaterialImpl = forwardRef(
  (
    {
      opacity = 0.42,
      color = "#8fc7d8",
      shadowColor = "#5c98ab",
      noiseScale = 4.2,
      flowSpeed = 0.22,
      brightness = 0.16,
      fresnelStrength = 0.1,
      thickness = 0.85,
      wobbleStrength = 0.035,
      wobbleSpeed = 0.9,
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
      <cytoplasmMaterialBase
        ref={materialRef}
        transparent
        depthWrite={false}
        depthTest={true}
        side={THREE.FrontSide}
        uOpacity={opacity}
        uColor={new THREE.Color(color)}
        uShadowColor={new THREE.Color(shadowColor)}
        uNoiseScale={noiseScale}
        uFlowSpeed={flowSpeed}
        uBrightness={brightness}
        uFresnelStrength={fresnelStrength}
        uThickness={thickness}
        uWobbleStrength={wobbleStrength}
        uWobbleSpeed={wobbleSpeed}
        {...props}
      />
    );
  },
);

export default CytoplasmMaterialImpl;
