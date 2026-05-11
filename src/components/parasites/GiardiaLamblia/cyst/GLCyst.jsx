import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAtomValue } from "jotai";
import {
  hoveredMarkerAtom,
  viewAtom,
  focusedMarkerIdAtom,
} from "../../../../store/Store";
import { GLCystProtoplastMaterial } from "../../../shaders/GLCystProtoplastShader";
import {
  GLCystWallMaterial,
  GLCystNucleusMaterial,
  GLCystKaryosomeMaterial,
  GLCystFibrilMaterial,
  GLCystMedianBodyMaterial,
} from "../../../shaders/GLCystStructureMaterials";

export function GLCystModel(props) {
  const { nodes } = useGLTF("/models/GardiaLambliaCyst-v1.glb");

  const hoveredMarkerId = useAtomValue(hoveredMarkerAtom);
  const view = useAtomValue(viewAtom);
  const focusedMarkerId = useAtomValue(focusedMarkerIdAtom);

  const isolatedGroupRef = useRef();
  const nucleiGroupRef = useRef();
  const karyosomeGroupRef = useRef();
  const fibrilGroupRef = useRef();
  const wallGroupRef = useRef();
  const protoplastGroupRef = useRef();
  const medianBodyGroupRef = useRef();

  const protoplastMaterialRef = useRef();
  const wallMaterialRef = useRef();

  const isIsolated = view === "ISOLATED";

  const isNucleiHovered = hoveredMarkerId === "nuclei";
  const isAxonemesHovered = hoveredMarkerId === "axonemes";
  const isWallHovered = hoveredMarkerId === "cystWall";
  const isKaryosomeHovered = hoveredMarkerId === "karyosome";
  const isMedianBodyHovered = hoveredMarkerId === "medianBodies";

  const isNuclearHovered = isNucleiHovered || isKaryosomeHovered;

  const showNuclei =
    !isIsolated ||
    focusedMarkerId === "nuclei" ||
    focusedMarkerId === "karyosome";

  const showKaryosomes =
    !isIsolated ||
    focusedMarkerId === "nuclei" ||
    focusedMarkerId === "karyosome";

  const showFibrils = !isIsolated || focusedMarkerId === "axonemes";
  const showWall = !isIsolated || focusedMarkerId === "cystWall";
  const showMedianBodies = !isIsolated || focusedMarkerId === "medianBodies";

  const showProtoplast =
    !isIsolated ||
    focusedMarkerId === "cystWall" ||
    focusedMarkerId === "nuclei" ||
    focusedMarkerId === "karyosome" ||
    focusedMarkerId === "axonemes" ||
    focusedMarkerId === "medianBodies";

  useFrame((state, delta) => {
    const ease = 1 - Math.exp(-8 * delta);

    const nucleiTargetScale = isNuclearHovered ? 1.16 : 1;
    const fibrilTargetScale = isAxonemesHovered ? 1.16 : 1;
    const wallTargetScale = isWallHovered ? 1.05 : 1;
    const medianBodyTargetScale = isMedianBodyHovered ? 1.16 : 1;

    if (nucleiGroupRef.current) {
      const current = nucleiGroupRef.current.scale.x;
      const next = THREE.MathUtils.lerp(current, nucleiTargetScale, ease);
      nucleiGroupRef.current.scale.setScalar(next);
    }

    if (karyosomeGroupRef.current) {
      const current = karyosomeGroupRef.current.scale.x;
      const next = THREE.MathUtils.lerp(current, nucleiTargetScale, ease);
      karyosomeGroupRef.current.scale.setScalar(next);
    }

    if (fibrilGroupRef.current) {
      const current = fibrilGroupRef.current.scale.x;
      const next = THREE.MathUtils.lerp(current, fibrilTargetScale, ease);
      fibrilGroupRef.current.scale.setScalar(next);
    }

    if (wallGroupRef.current) {
      const current = wallGroupRef.current.scale.x;
      const next = THREE.MathUtils.lerp(current, wallTargetScale, ease);
      wallGroupRef.current.scale.setScalar(next);
    }

    if (medianBodyGroupRef.current) {
      const current = medianBodyGroupRef.current.scale.x;
      const next = THREE.MathUtils.lerp(current, medianBodyTargetScale, ease);
      medianBodyGroupRef.current.scale.setScalar(next);
    }

    if (
      wallMaterialRef.current &&
      wallMaterialRef.current.opacity !== undefined
    ) {
      const targetOpacity =
        isNuclearHovered || isAxonemesHovered || isMedianBodyHovered
          ? 0.16
          : isWallHovered
            ? 0.92
            : isIsolated && focusedMarkerId !== "cystWall"
              ? 0.08
              : 0.8;

      wallMaterialRef.current.opacity = THREE.MathUtils.lerp(
        wallMaterialRef.current.opacity,
        targetOpacity,
        ease,
      );
    }

    if (
      protoplastMaterialRef.current &&
      protoplastMaterialRef.current.uOpacity !== undefined
    ) {
      const targetOpacity =
        isNuclearHovered || isAxonemesHovered || isMedianBodyHovered
          ? 0.2
          : isWallHovered
            ? 0.72
            : isIsolated && focusedMarkerId !== "cystWall"
              ? 0.14
              : 0.58;

      protoplastMaterialRef.current.uOpacity = THREE.MathUtils.lerp(
        protoplastMaterialRef.current.uOpacity,
        targetOpacity,
        ease,
      );
    }

    if (isIsolated && isolatedGroupRef.current) {
      const targetRotY = state.pointer.x * 0.32;
      const targetRotX = -state.pointer.y * 0.22;

      isolatedGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        isolatedGroupRef.current.rotation.y,
        targetRotY,
        0.06,
      );

      isolatedGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        isolatedGroupRef.current.rotation.x,
        targetRotX,
        0.06,
      );
    }
  });

  return (
    <group {...props} dispose={null}>
      <group ref={isolatedGroupRef}>
        {showFibrils && (
          <group ref={fibrilGroupRef}>
            <mesh
              name="fibril5"
              geometry={nodes.fibril5.geometry}
              position={
                isIsolated && focusedMarkerId === "axonemes"
                  ? [0.08, 0.18, 0.08]
                  : [0.076, 1.691, 2.652]
              }
              rotation={[0, 0, -Math.PI / 2]}
            >
              <GLCystFibrilMaterial />
            </mesh>

            <mesh
              name="fibril8"
              geometry={nodes.fibril8.geometry}
              position={
                isIsolated && focusedMarkerId === "axonemes"
                  ? [0.08, 0.18, 0.2]
                  : [0.077, 1.691, 2.76]
              }
              rotation={[0, 0, -Math.PI / 2]}
            >
              <GLCystFibrilMaterial />
            </mesh>

            <mesh
              name="fibril2"
              geometry={nodes.fibril2.geometry}
              position={
                isIsolated && focusedMarkerId === "axonemes"
                  ? [0.08, 0.18, -0.02]
                  : [0.077, 1.697, 2.543]
              }
              rotation={[0, 0, -Math.PI / 2]}
            >
              <GLCystFibrilMaterial />
            </mesh>

            <mesh
              name="fibril17"
              geometry={nodes.fibril17.geometry}
              position={
                isIsolated && focusedMarkerId === "axonemes"
                  ? [-0.02, 0.18, 0.22]
                  : [-0.014, 1.699, 2.768]
              }
              rotation={[0, 0, -Math.PI / 2]}
            >
              <GLCystFibrilMaterial />
            </mesh>

            <mesh
              name="fibril1"
              geometry={nodes.fibril1.geometry}
              position={
                isIsolated && focusedMarkerId === "axonemes"
                  ? [0.0, 0.18, -0.12]
                  : [0, 1.694, 2.491]
              }
              rotation={[0, 0, -Math.PI / 2]}
            >
              <GLCystFibrilMaterial />
            </mesh>

            <mesh
              name="fibril3"
              geometry={nodes.fibril3.geometry}
              position={
                isIsolated && focusedMarkerId === "axonemes"
                  ? [-0.02, 0.18, 0.0]
                  : [-0.015, 1.7, 2.572]
              }
              rotation={[0, 0, -Math.PI / 2]}
            >
              <GLCystFibrilMaterial />
            </mesh>

            <mesh
              name="fibril4"
              geometry={nodes.fibril4.geometry}
              position={
                isIsolated && focusedMarkerId === "axonemes"
                  ? [-0.03, 0.18, 0.06]
                  : [-0.025, 1.695, 2.634]
              }
              rotation={[0, 0, -Math.PI / 2]}
            >
              <GLCystFibrilMaterial />
            </mesh>

            <mesh
              name="fibril6"
              geometry={nodes.fibril6.geometry}
              position={
                isIsolated && focusedMarkerId === "axonemes"
                  ? [-0.04, 0.18, 0.12]
                  : [-0.039, 1.7, 2.696]
              }
              rotation={[0, 0, -Math.PI / 2]}
            >
              <GLCystFibrilMaterial />
            </mesh>
          </group>
        )}

        {showMedianBodies && (
          <group ref={medianBodyGroupRef}>
            <mesh
              name="medianbody2001"
              geometry={nodes.medianbody2001.geometry}
              position={
                isIsolated && focusedMarkerId === "medianBodies"
                  ? [0, -0.1, -0.18]
                  : [0, 1.381, 2.359]
              }
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            >
              <GLCystMedianBodyMaterial />
            </mesh>

            <mesh
              name="medianbody2002"
              geometry={nodes.medianbody2002.geometry}
              position={
                isIsolated && focusedMarkerId === "medianBodies"
                  ? [0, -0.1, 0.18]
                  : [0, 1.381, 2.88]
              }
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            >
              <GLCystMedianBodyMaterial />
            </mesh>
          </group>
        )}

        {showKaryosomes && (
          <group ref={karyosomeGroupRef}>
            <mesh
              name="cystkaryosome1"
              geometry={nodes.cystkaryosome1.geometry}
              position={
                isIsolated && focusedMarkerId === "karyosome"
                  ? [0, 0.32, -0.16]
                  : [0, 2.898, 2.321]
              }
            >
              <GLCystKaryosomeMaterial />
            </mesh>

            <mesh
              name="cystkaryosome2"
              geometry={nodes.cystkaryosome2.geometry}
              position={
                isIsolated && focusedMarkerId === "karyosome"
                  ? [0, 0.08, -0.16]
                  : [0, 2.452, 2.321]
              }
            >
              <GLCystKaryosomeMaterial />
            </mesh>

            <mesh
              name="cystkaryosome3"
              geometry={nodes.cystkaryosome3.geometry}
              position={
                isIsolated && focusedMarkerId === "karyosome"
                  ? [0, 0.32, 0.18]
                  : [0, 2.898, 3.021]
              }
            >
              <GLCystKaryosomeMaterial />
            </mesh>

            <mesh
              name="cystkaryosome4"
              geometry={nodes.cystkaryosome4.geometry}
              position={
                isIsolated && focusedMarkerId === "karyosome"
                  ? [0, 0.08, 0.18]
                  : [0, 2.452, 3.021]
              }
            >
              <GLCystKaryosomeMaterial />
            </mesh>
          </group>
        )}

        {showNuclei && (
          <group ref={nucleiGroupRef}>
            <mesh
              name="cystnucleus1"
              geometry={nodes.cystnucleus1.geometry}
              position={
                isIsolated &&
                (focusedMarkerId === "nuclei" ||
                  focusedMarkerId === "karyosome")
                  ? [0, 0.32, -0.16]
                  : [0, 2.898, 2.321]
              }
            >
              <GLCystNucleusMaterial opacity={0.84} />
            </mesh>

            <mesh
              name="cystnucleus2"
              geometry={nodes.cystnucleus2.geometry}
              position={
                isIsolated &&
                (focusedMarkerId === "nuclei" ||
                  focusedMarkerId === "karyosome")
                  ? [0, 0.08, -0.16]
                  : [0, 2.452, 2.321]
              }
            >
              <GLCystNucleusMaterial opacity={0.84} />
            </mesh>

            <mesh
              name="cystnucleus3"
              geometry={nodes.cystnucleus3.geometry}
              position={
                isIsolated &&
                (focusedMarkerId === "nuclei" ||
                  focusedMarkerId === "karyosome")
                  ? [0, 0.32, 0.18]
                  : [0, 2.898, 3.021]
              }
            >
              <GLCystNucleusMaterial opacity={0.84} />
            </mesh>

            <mesh
              name="cystnucleus4"
              geometry={nodes.cystnucleus4.geometry}
              position={
                isIsolated &&
                (focusedMarkerId === "nuclei" ||
                  focusedMarkerId === "karyosome")
                  ? [0, 0.08, 0.18]
                  : [0, 2.452, 3.021]
              }
            >
              <GLCystNucleusMaterial opacity={0.84} />
            </mesh>
          </group>
        )}

        {showWall && (
          <group ref={wallGroupRef}>
            <mesh
              name="cystwall"
              geometry={nodes.cystwall.geometry}
              position={[0, 2.149, 2.638]}
            >
              <GLCystWallMaterial
                ref={wallMaterialRef}
                transmission={0.03}
                roughness={0.9}
              />
            </mesh>
          </group>
        )}

        {showProtoplast && (
          <group ref={protoplastGroupRef}>
            <mesh
              name="protoplast"
              geometry={nodes.protoplast.geometry}
              position={[0, 2.149, 2.638]}
            >
              <GLCystProtoplastMaterial
                ref={protoplastMaterialRef}
                uOpacity={0.58}
                uDensity={1.18}
                uBaseColor={"#cfd7b6"}
                uCloudColor={"#dde5c8"}
                uShadowColor={"#9eaa88"}
                uCoreTint={"#b8c59c"}
                uNoiseScale={4.8}
                uSoftness={0.86}
                uRimStrength={0.12}
                uMotionStrength={0.003}
                uGranuleStrength={0.14}
                uCoreBias={0.22}
              />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/models/GardiaLambliaCyst-v1.glb");
