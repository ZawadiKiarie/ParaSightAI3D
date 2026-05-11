import React, { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAtomValue } from "jotai";
import {
  hoveredMarkerAtom,
  viewAtom,
  focusedMarkerIdAtom,
} from "../../../../store/store";
import CBOocystBodyMaterial from "../../../shaders/CBOocystBodyMaterial";
import { createCBMaterials } from "../../../shaders/CBMaterials";

export function CBOocyst(props) {
  const { nodes } = useGLTF("/models/CystoisosporabelliOocyst-v1.glb");

  const hoveredMarkerId = useAtomValue(hoveredMarkerAtom);
  const view = useAtomValue(viewAtom);
  const focusedMarkerId = useAtomValue(focusedMarkerIdAtom);

  const {
    sporocystMaterial,
    sporozoiteMaterial,
    nucleusMaterial,
    residualBodyMaterial,
  } = useMemo(() => createCBMaterials(), []);

  const isolatedGroupRef = useRef();
  const wallGroupRef = useRef();
  const sporocystGroupRef = useRef();
  const sporozoiteGroupRef = useRef();
  const nucleiGroupRef = useRef();
  const residualGroupRef = useRef();
  const wallMaterialRef = useRef();

  const isIsolated = view === "ISOLATED";

  const isShapeHovered = hoveredMarkerId === "oocystShape";
  const isWallHovered = hoveredMarkerId === "oocystWall";
  const isSporocystsHovered = hoveredMarkerId === "sporocysts";
  const isSporozoitesHovered = hoveredMarkerId === "sporozoites";
  const isNucleiHovered = hoveredMarkerId === "nuclei";
  const isResidualHovered = hoveredMarkerId === "residualBody";

  const showWall =
    !isIsolated ||
    focusedMarkerId === "oocystShape" ||
    focusedMarkerId === "oocystWall";
  const showSporocysts = !isIsolated || focusedMarkerId === "sporocysts";
  const showSporozoites = !isIsolated || focusedMarkerId === "sporozoites";
  const showNuclei = !isIsolated || focusedMarkerId === "nuclei";
  const showResidual = !isIsolated || focusedMarkerId === "residualBody";

  useFrame((state, delta) => {
    const ease = 1 - Math.exp(-8 * delta);

    const wallTargetScale = isShapeHovered || isWallHovered ? 1.05 : 1;
    const sporocystTargetScale = isSporocystsHovered ? 1.1 : 1;
    const sporozoiteTargetScale = isSporozoitesHovered ? 1.1 : 1;
    const nucleiTargetScale = isNucleiHovered ? 1.12 : 1;
    const residualTargetScale = isResidualHovered ? 1.12 : 1;

    if (wallGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        wallGroupRef.current.scale.x,
        wallTargetScale,
        ease,
      );
      wallGroupRef.current.scale.setScalar(next);
    }

    if (sporocystGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        sporocystGroupRef.current.scale.x,
        sporocystTargetScale,
        ease,
      );
      sporocystGroupRef.current.scale.setScalar(next);
    }

    if (sporozoiteGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        sporozoiteGroupRef.current.scale.x,
        sporozoiteTargetScale,
        ease,
      );
      sporozoiteGroupRef.current.scale.setScalar(next);
    }

    if (nucleiGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        nucleiGroupRef.current.scale.x,
        nucleiTargetScale,
        ease,
      );
      nucleiGroupRef.current.scale.setScalar(next);
    }

    if (residualGroupRef.current) {
      const next = THREE.MathUtils.lerp(
        residualGroupRef.current.scale.x,
        residualTargetScale,
        ease,
      );
      residualGroupRef.current.scale.setScalar(next);
    }

    if (
      wallMaterialRef.current &&
      wallMaterialRef.current.opacity !== undefined
    ) {
      const targetOpacity =
        isSporocystsHovered ||
        isSporozoitesHovered ||
        isNucleiHovered ||
        isResidualHovered
          ? 0.18
          : isShapeHovered || isWallHovered
            ? 0.92
            : isIsolated &&
                focusedMarkerId !== "oocystShape" &&
                focusedMarkerId !== "oocystWall"
              ? 0.08
              : 0.84;

      wallMaterialRef.current.opacity = THREE.MathUtils.lerp(
        wallMaterialRef.current.opacity,
        targetOpacity,
        ease,
      );
    }

    if (sporocystMaterial && sporocystMaterial.opacity !== undefined) {
      const targetOpacity =
        isIsolated && focusedMarkerId !== "sporocysts" ? 0.08 : 0.95;
      sporocystMaterial.opacity = THREE.MathUtils.lerp(
        sporocystMaterial.opacity,
        targetOpacity,
        ease,
      );
    }

    if (sporozoiteMaterial && sporozoiteMaterial.opacity !== undefined) {
      const targetOpacity =
        isIsolated && focusedMarkerId !== "sporozoites" ? 0.08 : 0.97;
      sporozoiteMaterial.opacity = THREE.MathUtils.lerp(
        sporozoiteMaterial.opacity,
        targetOpacity,
        ease,
      );
    }

    if (nucleusMaterial && nucleusMaterial.opacity !== undefined) {
      const targetOpacity =
        isIsolated && focusedMarkerId !== "nuclei" ? 0.08 : 0.96;
      nucleusMaterial.opacity = THREE.MathUtils.lerp(
        nucleusMaterial.opacity,
        targetOpacity,
        ease,
      );
    }

    if (residualBodyMaterial && residualBodyMaterial.opacity !== undefined) {
      const targetOpacity =
        isIsolated && focusedMarkerId !== "residualBody" ? 0.08 : 0.96;
      residualBodyMaterial.opacity = THREE.MathUtils.lerp(
        residualBodyMaterial.opacity,
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
        {showWall && (
          <group ref={wallGroupRef}>
            <mesh
              name="Oocyst"
              geometry={nodes.Oocyst.geometry}
              position={[0, 1, 0]}
            >
              <CBOocystBodyMaterial
                ref={wallMaterialRef}
                opacity={0.84}
                baseColor="#d3e2b3"
                shadowColor="#5a970e"
                wallTint="#252d0a"
                noiseScale={13.8}
                flowSpeed={10.04}
                brightness={0.0}
                wallStrength={0.72}
                granuleStrength={0.03}
                fresnelStrength={0.0}
                wobbleStrength={0.032}
                wobbleSpeed={0.84}
              />
            </mesh>
          </group>
        )}

        {showSporocysts && (
          <group ref={sporocystGroupRef}>
            <mesh
              name="Sporocyst1"
              geometry={nodes.Sporocyst1.geometry}
              material={sporocystMaterial}
              position={
                isIsolated && focusedMarkerId === "sporocysts"
                  ? [0, 0.2, 0.24]
                  : [0, 1, 0.448]
              }
            />
            <mesh
              name="Sporocyst2"
              geometry={nodes.Sporocyst2.geometry}
              material={sporocystMaterial}
              position={
                isIsolated && focusedMarkerId === "sporocysts"
                  ? [0, -0.22, -0.26]
                  : [-0.003, 0.996, -0.57]
              }
              rotation={[-0.355, -0.079, -0.061]}
            />
          </group>
        )}

        {showSporozoites && (
          <group ref={sporozoiteGroupRef}>
            <mesh
              name="Sporozoite1"
              geometry={nodes.Sporozoite1.geometry}
              material={sporozoiteMaterial}
              position={
                isIsolated && focusedMarkerId === "sporozoites"
                  ? [-0.06, 0.28, 0.24]
                  : [-0.014, 1.093, 0.678]
              }
              rotation={[-0.113, -0.068, -2.63]}
            />
            <mesh
              name="Sporozoite1001"
              geometry={nodes.Sporozoite1001.geometry}
              material={sporozoiteMaterial}
              position={
                isIsolated && focusedMarkerId === "sporozoites"
                  ? [0.02, 0.14, 0.08]
                  : [0.003, 1.106, 0.404]
              }
              rotation={[2.715, -0.708, -0.199]}
            />
            <mesh
              name="Sporozoite1002"
              geometry={nodes.Sporozoite1002.geometry}
              material={sporozoiteMaterial}
              position={
                isIsolated && focusedMarkerId === "sporozoites"
                  ? [-0.08, -0.12, 0.06]
                  : [-0.046, 0.729, 0.398]
              }
              rotation={[-2.763, 0.945, -2.177]}
            />
            <mesh
              name="Sporozoite1003"
              geometry={nodes.Sporozoite1003.geometry}
              material={sporozoiteMaterial}
              position={
                isIsolated && focusedMarkerId === "sporozoites"
                  ? [-0.16, 0.38, 0.02]
                  : [-0.149, 1.35, 0.398]
              }
              rotation={[-2.182, 0.321, -3.074]}
            />
            <mesh
              name="Sporozoite1004"
              geometry={nodes.Sporozoite1004.geometry}
              material={sporozoiteMaterial}
              position={
                isIsolated && focusedMarkerId === "sporozoites"
                  ? [0.02, 0.08, -0.18]
                  : [-0.029, 1.163, -0.389]
              }
              rotation={[-0.473, -0.14, -2.7]}
            />
            <mesh
              name="Sporozoite1005"
              geometry={nodes.Sporozoite1005.geometry}
              material={sporozoiteMaterial}
              position={
                isIsolated && focusedMarkerId === "sporozoites"
                  ? [0.16, -0.02, -0.34]
                  : [0.19, 1.079, -0.643]
              }
              rotation={[2.507, -0.673, -0.224]}
            />
            <mesh
              name="Sporozoite1006"
              geometry={nodes.Sporozoite1006.geometry}
              material={sporozoiteMaterial}
              position={
                isIsolated && focusedMarkerId === "sporozoites"
                  ? [0.22, -0.18, -0.26]
                  : [0.296, 0.815, -0.542]
              }
              rotation={[3.122, 1.041, -2.124]}
            />
            <mesh
              name="Sporozoite1007"
              geometry={nodes.Sporozoite1007.geometry}
              material={sporozoiteMaterial}
              position={
                isIsolated && focusedMarkerId === "sporozoites"
                  ? [-0.12, 0.24, -0.42]
                  : [-0.126, 1.311, -0.751]
              }
              rotation={[-2.523, 0.416, -3.107]}
            />
          </group>
        )}

        {showNuclei && (
          <group ref={nucleiGroupRef}>
            <mesh
              name="nucleus1"
              geometry={nodes.nucleus1.geometry}
              material={nucleusMaterial}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.04, 0.26, 0.3]
                  : [-0.011, 1.066, 0.756]
              }
              rotation={[0.362, 0.168, -0.022]}
            />
            <mesh
              name="nucleus1001"
              geometry={nodes.nucleus1001.geometry}
              material={nucleusMaterial}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.04, 0.18, 0.06]
                  : [-0.028, 1.054, 0.36]
              }
              rotation={[2.128, -0.488, 2.094]}
            />
            <mesh
              name="nucleus1002"
              geometry={nodes.nucleus1002.geometry}
              material={nucleusMaterial}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.02, -0.08, 0.08]
                  : [0.021, 0.762, 0.386]
              }
              rotation={[-1.726, 1.207, -0.483]}
            />
            <mesh
              name="nucleus1003"
              geometry={nodes.nucleus1003.geometry}
              material={nucleusMaterial}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.12, 0.36, 0.08]
                  : [-0.136, 1.423, 0.386]
              }
              rotation={[-1.628, 0.286, -0.611]}
            />
            <mesh
              name="nucleus1004"
              geometry={nodes.nucleus1004.geometry}
              material={nucleusMaterial}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.04, 0.12, -0.18]
                  : [-0.034, 1.165, -0.306]
              }
              rotation={[0.012, 0.072, -0.05]}
            />
            <mesh
              name="nucleus1005"
              geometry={nodes.nucleus1005.geometry}
              material={nucleusMaterial}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.12, 0.02, -0.38]
                  : [0.162, 1.018, -0.677]
              }
              rotation={[1.938, -0.448, 2.098]}
            />
            <mesh
              name="nucleus1006"
              geometry={nodes.nucleus1006.geometry}
              material={nucleusMaterial}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [0.26, -0.12, -0.24]
                  : [0.365, 0.84, -0.451]
              }
              rotation={[-1.856, 1.271, -0.718]}
            />
            <mesh
              name="nucleus1007"
              geometry={nodes.nucleus1007.geometry}
              material={nucleusMaterial}
              position={
                isIsolated && focusedMarkerId === "nuclei"
                  ? [-0.1, 0.32, -0.46]
                  : [-0.107, 1.375, -0.785]
              }
              rotation={[-1.956, 0.35, -0.692]}
            />
          </group>
        )}

        {showResidual && (
          <group ref={residualGroupRef}>
            <mesh
              name="ResidualboDY"
              geometry={nodes.ResidualboDY.geometry}
              material={residualBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "residualBody"
                  ? [0.14, 0.02, 0.08]
                  : [0.191, 0.852, 0.298]
              }
              rotation={[-0.968, -0.453, -Math.PI / 2]}
            />
            <mesh
              name="ResidualboDY001"
              geometry={nodes.ResidualboDY001.geometry}
              material={residualBodyMaterial}
              position={
                isIsolated && focusedMarkerId === "residualBody"
                  ? [-0.16, -0.08, -0.18]
                  : [-0.211, 0.852, -0.725]
              }
              rotation={[-0.968, -0.453, -Math.PI / 2]}
            />
          </group>
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/models/CystoisosporabelliOocyst-v1.glb");
