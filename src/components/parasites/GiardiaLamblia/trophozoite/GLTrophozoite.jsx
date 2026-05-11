import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAtomValue } from "jotai";
import {
  hoveredMarkerAtom,
  viewAtom,
  focusedMarkerIdAtom,
} from "../../../../store/Store";
import CytoplasmMaterialImpl from "../../../shaders/CytoplasmMaterial";
import { createGiardiaMaterials } from "../../../shaders/GLMaterials";

export function GLTrophozoite(props) {
  const group = useRef();
  const isolatedGroupRef = useRef();

  const bodyRef = useRef();
  const bodyMaterialRef = useRef();

  const nucleiGroupRef = useRef();
  const karyosomeGroupRef = useRef();
  const flagellaGroupRef = useRef();
  const medianBodyGroupRef = useRef();
  const ventralRegionGroupRef = useRef();

  const hoveredMarkerId = useAtomValue(hoveredMarkerAtom);
  const view = useAtomValue(viewAtom);
  const focusedMarkerId = useAtomValue(focusedMarkerIdAtom);

  const { nodes, animations } = useGLTF("/models/GLTrophozoite-v1.glb");
  const { actions } = useAnimations(animations, group);

  const {
    nucleusMaterial,
    karyosomeMaterial,
    kinetosomeMaterial,
    medianBodyMaterial,
    flagellumMaterial,
  } = useMemo(() => createGiardiaMaterials(), []);

  const isIsolated = view === "ISOLATED";

  const isNucleiHovered = hoveredMarkerId === "nuclei";
  const isBodyHovered = hoveredMarkerId === "body";
  const isFlagellaHovered = hoveredMarkerId === "flagella";
  const isDiskHovered = hoveredMarkerId === "disk";
  const isSymmetryHovered = hoveredMarkerId === "symmetry";

  const showBody =
    !isIsolated ||
    focusedMarkerId === "body" ||
    focusedMarkerId === "disk" ||
    focusedMarkerId === "symmetry";

  const showNuclei = !isIsolated || focusedMarkerId === "nuclei";
  const showKaryosomes = !isIsolated || focusedMarkerId === "nuclei";
  const showFlagella = !isIsolated || focusedMarkerId === "flagella";
  const showMedianBodies =
    !isIsolated ||
    focusedMarkerId === "body" ||
    focusedMarkerId === "disk" ||
    focusedMarkerId === "symmetry";
  const showVentralRegion =
    !isIsolated || focusedMarkerId === "disk" || focusedMarkerId === "symmetry";

  useEffect(() => {
    const actionNames = [
      "BézierCurveAction",
      "BézierCurve.001Action",
      "BézierCurve.002Action",
      "BézierCurve.003Action",
      "BézierCurve.004Action",
      "BézierCurve.005Action",
      "BézierCurve.006Action",
      "BézierCurve.007Action",
      "BézierCurve.008Action",
    ];

    actionNames.forEach((name) => {
      const action = actions?.[name];
      if (action) {
        action.reset().fadeIn(0.5).play();
      } else {
        console.warn(`Animation not found: ${name}`);
      }
    });

    return () => {
      actionNames.forEach((name) => actions?.[name]?.fadeOut(0.5));
    };
  }, [actions]);

  useFrame((state, delta) => {
    const ease = 1 - Math.exp(-8 * delta);

    if (bodyRef.current) {
      const targetScale =
        isBodyHovered || isDiskHovered || isSymmetryHovered ? 1.04 : 1;
      const current = bodyRef.current.scale.x;
      const next = THREE.MathUtils.lerp(current, targetScale, ease);
      bodyRef.current.scale.setScalar(next);
    }

    if (nucleiGroupRef.current) {
      const targetScale = isNucleiHovered ? 1.18 : 1;
      const current = nucleiGroupRef.current.scale.x;
      const next = THREE.MathUtils.lerp(current, targetScale, ease);
      nucleiGroupRef.current.scale.setScalar(next);
    }

    if (karyosomeGroupRef.current) {
      const targetScale = isNucleiHovered ? 1.18 : 1;
      const current = karyosomeGroupRef.current.scale.x;
      const next = THREE.MathUtils.lerp(current, targetScale, ease);
      karyosomeGroupRef.current.scale.setScalar(next);
    }

    if (flagellaGroupRef.current) {
      const targetScale = isFlagellaHovered ? 1.08 : 1;
      const current = flagellaGroupRef.current.scale.x;
      const next = THREE.MathUtils.lerp(current, targetScale, ease);
      flagellaGroupRef.current.scale.setScalar(next);
    }

    if (medianBodyGroupRef.current) {
      const targetScale = isDiskHovered ? 1.08 : 1;
      const current = medianBodyGroupRef.current.scale.x;
      const next = THREE.MathUtils.lerp(current, targetScale, ease);
      medianBodyGroupRef.current.scale.setScalar(next);
    }

    if (ventralRegionGroupRef.current) {
      const targetScale = isDiskHovered || isSymmetryHovered ? 1.05 : 1;
      const current = ventralRegionGroupRef.current.scale.x;
      const next = THREE.MathUtils.lerp(current, targetScale, ease);
      ventralRegionGroupRef.current.scale.setScalar(next);
    }

    if (bodyMaterialRef.current) {
      const targetOpacity = isNucleiHovered
        ? 0.18
        : isFlagellaHovered
          ? 0.32
          : isDiskHovered || isSymmetryHovered
            ? 0.28
            : isBodyHovered
              ? 0.58
              : isIsolated &&
                  focusedMarkerId !== "body" &&
                  focusedMarkerId !== "disk" &&
                  focusedMarkerId !== "symmetry"
                ? 0.12
                : 0.44;

      const targetBrightness = isBodyHovered ? 0.22 : 0.16;
      const targetFresnel = isDiskHovered || isSymmetryHovered ? 1.28 : 1.12;

      if (bodyMaterialRef.current.uniforms?.opacity) {
        bodyMaterialRef.current.uniforms.opacity.value = THREE.MathUtils.lerp(
          bodyMaterialRef.current.uniforms.opacity.value,
          targetOpacity,
          ease,
        );
      }

      if (bodyMaterialRef.current.uniforms?.brightness) {
        bodyMaterialRef.current.uniforms.brightness.value =
          THREE.MathUtils.lerp(
            bodyMaterialRef.current.uniforms.brightness.value,
            targetBrightness,
            ease,
          );
      }

      if (bodyMaterialRef.current.uniforms?.fresnelStrength) {
        bodyMaterialRef.current.uniforms.fresnelStrength.value =
          THREE.MathUtils.lerp(
            bodyMaterialRef.current.uniforms.fresnelStrength.value,
            targetFresnel,
            ease,
          );
      }
    }

    if (isIsolated && isolatedGroupRef.current) {
      const targetRotY = state.pointer.x * 0.34;
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
    <group ref={group} {...props} dispose={null}>
      <group ref={isolatedGroupRef} name="Scene">
        {showBody && (
          <mesh
            ref={bodyRef}
            name="Body"
            geometry={nodes.Body.geometry}
            position={isIsolated ? [0, 0, 0] : [0, 2.23, -2.932]}
          >
            <CytoplasmMaterialImpl
              ref={bodyMaterialRef}
              opacity={0.44}
              color="#71a3b3"
              shadowColor="#374c52"
              noiseScale={7.2}
              flowSpeed={1.82}
              brightness={0.16}
              fresnelStrength={1.12}
              thickness={0.9}
              wobbleStrength={0.105}
              wobbleSpeed={0.8}
              morphTargets
            />
          </mesh>
        )}

        {showVentralRegion && (
          <group ref={ventralRegionGroupRef}>
            <mesh
              geometry={nodes.Body.geometry}
              position={isIsolated ? [0, 0, 0] : [0, 2.23, -2.932]}
            >
              <meshBasicMaterial
                color="#9fd7e4"
                transparent
                opacity={
                  isDiskHovered || focusedMarkerId === "disk"
                    ? 0.18
                    : isSymmetryHovered || focusedMarkerId === "symmetry"
                      ? 0.12
                      : 0.0
                }
                depthWrite={false}
              />
            </mesh>
          </group>
        )}

        {showNuclei && (
          <group ref={nucleiGroupRef}>
            <mesh
              name="Nucleus1"
              geometry={nodes.Nucleus1.geometry}
              material={nucleusMaterial}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.28, 0.08, -0.22]
                  : [-0.063, 2.407, -3.524]
              }
            />
            <mesh
              name="Nucleus2"
              geometry={nodes.Nucleus2.geometry}
              material={nucleusMaterial}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.28, 0.08, 0.22]
                  : [-0.063, 2.407, -2.272]
              }
            />
          </group>
        )}

        {showKaryosomes && (
          <group ref={karyosomeGroupRef}>
            <mesh
              name="Karyosome1"
              geometry={nodes.Karyosome1.geometry}
              material={karyosomeMaterial}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.28, 0.08, -0.22]
                  : [-0.063, 2.407, -3.524]
              }
            />
            <mesh
              name="Karyosome2"
              geometry={nodes.Karyosome2.geometry}
              material={karyosomeMaterial}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.28, 0.08, 0.27]
                  : [-0.063, 2.407, -2.133]
              }
            />
          </group>
        )}

        {showMedianBodies && (
          <group ref={medianBodyGroupRef}>
            <mesh
              name="medianbody1"
              geometry={nodes.medianbody1.geometry}
              material={medianBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "disk"
                  ? [0.0, -0.46, -0.02]
                  : [-0.028, 1.619, -2.965]
              }
              rotation={[0, 0, -Math.PI / 2]}
            />
            <mesh
              name="medianbody2"
              geometry={nodes.medianbody2.geometry}
              material={medianBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "disk"
                  ? [0.0, -0.64, -0.02]
                  : [-0.028, 1.39, -2.965]
              }
              rotation={[0, 0, -Math.PI / 2]}
            />
          </group>
        )}

        {showFlagella && (
          <group ref={flagellaGroupRef}>
            <mesh
              name="anterirorflagellum1"
              geometry={nodes.anterirorflagellum1.geometry}
              material={flagellumMaterial}
              morphTargetDictionary={
                nodes.anterirorflagellum1.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.anterirorflagellum1.morphTargetInfluences
              }
              position={
                isIsolated && focusedMarkerId === "flagella"
                  ? [0.12, 0.34, -0.22]
                  : [0.047, 2.833, -3.206]
              }
              rotation={[Math.PI, 0, Math.PI / 2]}
            />
            <mesh
              name="anterirorflagellum2"
              geometry={nodes.anterirorflagellum2.geometry}
              material={flagellumMaterial}
              morphTargetDictionary={
                nodes.anterirorflagellum2.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.anterirorflagellum2.morphTargetInfluences
              }
              position={
                isIsolated && focusedMarkerId === "flagella"
                  ? [0.12, 0.34, 0.22]
                  : [-0.17, 2.801, -2.595]
              }
              rotation={[0, 0, -Math.PI / 2]}
            />
            <mesh
              name="posteriorflagellum1"
              geometry={nodes.posteriorflagellum1.geometry}
              material={flagellumMaterial}
              morphTargetDictionary={
                nodes.posteriorflagellum1.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.posteriorflagellum1.morphTargetInfluences
              }
              position={
                isIsolated && focusedMarkerId === "flagella"
                  ? [0.04, 0.16, -0.38]
                  : [0.047, 2.809, -3.566]
              }
              rotation={[Math.PI, 0, Math.PI / 2]}
            />
            <mesh
              name="posteriorflagellum2"
              geometry={nodes.posteriorflagellum2.geometry}
              material={flagellumMaterial}
              morphTargetDictionary={
                nodes.posteriorflagellum2.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.posteriorflagellum2.morphTargetInfluences
              }
              position={
                isIsolated && focusedMarkerId === "flagella"
                  ? [0.04, 0.16, 0.38]
                  : [-0.178, 2.818, -2.259]
              }
              rotation={[0, 0, -Math.PI / 2]}
            />
            <mesh
              name="caudalflagellum1"
              geometry={nodes.caudalflagellum1.geometry}
              material={flagellumMaterial}
              morphTargetDictionary={
                nodes.caudalflagellum1.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.caudalflagellum1.morphTargetInfluences
              }
              position={
                isIsolated && focusedMarkerId === "flagella"
                  ? [0.0, -0.12, -0.26]
                  : [0.104, 2.641, -3.586]
              }
              rotation={[Math.PI, 0, Math.PI / 2]}
            />
            <mesh
              name="caudalflagellum2"
              geometry={nodes.caudalflagellum2.geometry}
              material={flagellumMaterial}
              morphTargetDictionary={
                nodes.caudalflagellum2.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.caudalflagellum2.morphTargetInfluences
              }
              position={
                isIsolated && focusedMarkerId === "flagella"
                  ? [0.0, -0.12, -0.16]
                  : [0.104, 2.641, -3.503]
              }
              rotation={[Math.PI, 0, Math.PI / 2]}
            />
            <mesh
              name="ventralflagellum1"
              geometry={nodes.ventralflagellum1.geometry}
              material={flagellumMaterial}
              morphTargetDictionary={
                nodes.ventralflagellum1.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.ventralflagellum1.morphTargetInfluences
              }
              position={
                isIsolated && focusedMarkerId === "flagella"
                  ? [-0.22, -0.04, 0.28]
                  : [-0.305, 2.461, -2.372]
              }
              rotation={[0, 0, -Math.PI / 2]}
            />
            <mesh
              name="ventralflagellum2"
              geometry={nodes.ventralflagellum2.geometry}
              material={flagellumMaterial}
              morphTargetDictionary={
                nodes.ventralflagellum2.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.ventralflagellum2.morphTargetInfluences
              }
              position={
                isIsolated && focusedMarkerId === "flagella"
                  ? [-0.22, -0.54, 0.0]
                  : [-0.412, 1.073, -2.921]
              }
              rotation={[0, 0, -Math.PI / 2]}
            />
          </group>
        )}

        {!isIsolated && (
          <>
            <mesh
              name="Kinetosome1"
              geometry={nodes.Kinetosome1.geometry}
              material={kinetosomeMaterial}
              position={[-0.063, 2.812, -3.196]}
            />
            <mesh
              name="Kinetosome2"
              geometry={nodes.Kinetosome2.geometry}
              material={kinetosomeMaterial}
              position={[-0.063, 2.816, -2.602]}
            />
            <mesh
              name="Kinetosome6"
              geometry={nodes.Kinetosome6.geometry}
              material={kinetosomeMaterial}
              position={[-0.028, 2.609, -2.905]}
            />
            <mesh
              name="Kinetosome5"
              geometry={nodes.Kinetosome5.geometry}
              material={kinetosomeMaterial}
              position={[-0.007, 2.604, -2.978]}
            />
            <mesh
              name="Kinetosome8"
              geometry={nodes.Kinetosome8.geometry}
              material={kinetosomeMaterial}
              position={[-0.176, 2.438, -2.886]}
              scale={1.245}
            />
            <mesh
              name="Kinetosome3"
              geometry={nodes.Kinetosome3.geometry}
              material={kinetosomeMaterial}
              position={[-0.063, 2.783, -2.96]}
            />
            <mesh
              name="Kinetosome4"
              geometry={nodes.Kinetosome4.geometry}
              material={kinetosomeMaterial}
              position={[-0.063, 2.776, -2.868]}
            />
            <mesh
              name="Kinetosome7"
              geometry={nodes.Kinetosome7.geometry}
              material={kinetosomeMaterial}
              position={[-0.192, 2.425, -2.982]}
            />
          </>
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/models/GLTrophozoite-v1.glb");
